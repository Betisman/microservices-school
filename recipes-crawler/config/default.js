module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3001
  },
  logger: {
    transport: 'bunyan',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'env',
      'app'
    ],
    exclude: [
      'password',
      'secret',
      'token',
      'request.headers.cookie',
      'dependencies',
      'devDependencies'
    ]
  },
  crawler: { // once every 2 hours
    frequency: 7200000,
    baseUrl: 'https://api.spoonacular.com/recipes',
    searchSuffix: '/random',
    numRecipes: 2,
    mock: false,
    recipeSuffix: '/:id/information',
    recipesApi: {
      host: 'http://127.0.0.1:3000',
      path: '/api/v1/recipes/:id',
      query: {
        key: 'key',
        value: 'source_id'
      }
    },
    idGenerator: {
      host: 'http://127.0.0.1:3002',
      path: '/api/v1/id'
    }
  },
  rabbitmq: {
    defaults: {},
    vhosts: {
      ysojkvfe: {
        connection: {
          hostname: '127.0.0.1',
          user: 'rabbitmq',
          password: 'rabbitmq'
        },
        exchanges: [
          'internal',
          'delay',
          'retry',
          'dead_letters'
        ],
        queues: {},
        bindings: {},
        subscriptions: {},
        publications: {
          conclusions: {
            exchange: 'internal'
          }
        }
      }
    }
  }
};
