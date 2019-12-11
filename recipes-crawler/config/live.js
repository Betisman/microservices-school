module.exports = {
  logger: {
    transport: 'sumo'
  },
  crawler: {
    frequency: 60000,
    recipesApi: {
      host: 'http://recipes-api:3000'
    },
    idGenerator: {
      host: 'http://recipes-id-generator:3002'
    }
  },
  rabbitmq: {
    defaults: {},
    vhosts: {
      kcexhppf: {
        connection: {
          hostname: 'swan.rmq.cloudamqp.com',
          user: 'kcexhppf',
          password: process.env.RABBIT_PWD || 'N/A'
        }
      }
    }
  }
}
