module.exports = {
  logger: {
    transport: 'sumo'
  },
  crawler: {
    frequency: 60000,
    autostart: true,
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
      ysojkvfe: {
        connection: {
          hostname: 'swan.rmq.cloudamqp.com',
          user: 'ysojkvfe',
          password: process.env.RABBIT_PWD || 'N/A'
        }
      }
    }
  }
}
