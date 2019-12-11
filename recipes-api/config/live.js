module.exports = {
  logger: {
    transport: 'sumo'
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://mongo:27017/ysojkvfe'
  },
  store: {
    idGenerator: {
      host: 'http://recipes-id-generator:3002',
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
