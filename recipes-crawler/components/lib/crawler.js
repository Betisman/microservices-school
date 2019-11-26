const R = require('ramda');
const debug = require('debug')('recipes-crawler');
const request = require('superagent');

module.exports = () => {

  const start = ({ config, logger, broker }, cb) => {

    const API_KEY = config.key || process.env.F2F_KEY;
    const MAX_RECIPES = config.numRecipes || process.env.MAX_RECIPES;

    // TODO extract these functions to a controller to encapsulate APIs accesses

    const getPage = (baseUrl, page) => {
      if (config.mock) {
        const fake = '{"text":{"results":[{"id":592479,"title":"Kale and Quinoa Salad with Black Beans","readyInMinutes":50,"servings":6,"image":"Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg","imageUrls":["Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg"]},{"id":547775,"title":"Creamy Avocado Pasta","readyInMinutes":15,"servings":2,"image":"Creamy-Avocado-Pasta-547775.jpg","imageUrls":["Creamy-Avocado-Pasta-547775.jpg"]},{"id":818941,"title":"Avocado Toast with Eggs, Spinach, and Tomatoes","readyInMinutes":10,"servings":1,"image":"avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg","imageUrls":["avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg"]}],"baseUri":"https://spoonacular.com/recipeImages/","offset":0,"number":3,"totalResults":312413,"processingTimeMs":672,"expires":1574889778290,"isStale":false}}';
        return new Promise((resolve, reject) => {
          resolve(fake);
        });
      } else {
        const url = `${baseUrl}?apiKey=${API_KEY}&number=${MAX_RECIPES}`;
        logger.info(`Getting recipes batch from url ${url}`);
        return request.get(url);
      }
    };

    const getRecipe = R.curry((baseUrl, recipeId) => {
      logger.info(`fetching recipe ${recipeId} from ${baseUrl}`)
      const url = `${baseUrl}?apiKey=${API_KEY}`.replace(':id', recipeId);
      debug(`Requesting recipe with url: ${url}`);
      logger.info(`Rquesting recipe with url: ${url}`);
      return request.get(url);
    });

    const findByRecipeId = (recipeId) => {
      const { host, path, query } = config.recipesApi;
      const url = `${host}${path}?${query.key}=${query.value}`.replace(':id', recipeId);
      debug(`Trying to find recipe with url: ${url}`);
      return request.get(url)
        .then(({ body }) => body)
        .catch((err) => {
          if (err.status !== 404) logger.error(`Error when finding recipe on url ${url}: ${err.message}`);
          throw err;
        });
    };

    const generateId = () => {
      const { host, path } = config.idGenerator;
      const url = `${host}${path}`;
      debug(`Generating a new id from url: ${url}`);
      return request.get(url)
        .then(({ body }) => body)
        .catch((err) => {
          logger.error(`Error when generating a new id from url ${url}: ${err.message}`);
          throw err;
        });
    };

    const extractIds = R.pipe(
      R.prop('recipes'),
      R.pluck('id')
    );

    const extractRecipes = R.pipe(
      R.pluck('text'),
      R.map(JSON.parse)
      // R.pluck('title')
    );

    const publish = (recipe) => broker.publish('conclusions', recipe, 'recipes_crawler.v1.notifications.recipe.crawled');

    const translate = ({ extendedIngredients, instructions, sourceUrl, spoonacularSourceUrl, recipe_id, image, dishTypes, cuisines, social_rank, title, id }) => ({
      extendedIngredients,
      instructions,
      sourceUrl,
      spoonacularSourceUrl,
      image,
      dishTypes,
      cuisines,
      social_rank,
      title,
      id,
      version: new Date().getTime(),
      source_id: recipe_id,
      source: 'F2F'
    });

    const adapt = (recipe) =>
      findByRecipeId(recipe.id)
        .then(translate)
        .catch((err) => {
          if (err.status !== 404) throw err;
          // non found - we generate a new id
          return generateId()
            .then(({ id }) => translate(R.merge(recipe, { newId: id })));
        });

    const crawl = () => {
      logger.info('Crawling in search of new recipes...');
      const random = Math.floor(Math.random() * 100);
      const url = `${config.baseUrl}${config.searchSuffix}`;
      return getPage(url, config.page || random)
        .catch((err) => {
          logger.error(`Error accessing url ${url}: ${err.message} ${err.stack}`);
          throw err;
        })
        .then(({ text }) => {
          logger.info(`recipes fetched: ${JSON.stringify(text)}`)
          const ids = extractIds(JSON.parse(text));
          logger.info(`Getting details for ${ids.length} recipes`);
          const recipeRequests = R.map(getRecipe(`${config.baseUrl}${config.recipeSuffix}`), ids);
          return Promise.all(recipeRequests);
        })
        .then((recipeResponse) => extractRecipes(recipeResponse))
        .then((recipes) => Promise.all(R.map(adapt, recipes)))
        .then((recipeList) => Promise.all(R.map(publish, recipeList))
          .then(() => logger.info('New recipes ingested correctly'))
          .catch((err) => logger.error(`Error when pulling new recipes: ${err.message} ${err.stack}`)))
    };
    setInterval(crawl, config.frequency);
    if (config.autostart) crawl();
    cb();
  };

  return { start };

};
