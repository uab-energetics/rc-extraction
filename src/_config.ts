export const getConfig = (env) => ({

    port: env.PORT || 80,

    rabbitmq: {
        host: env.RABBITMQ_HOST || 'localhost',
        vhost: '/',
        port: '',
        user: env.RABBITMQ_USER || 'guest',
        pass: env.RABBITMQ_PASS || 'guest'
    },

    mysql: {
        host: env.MYSQL_HOST || 'localhost',
        user: env.MYSQL_USER || 'root',
        pass: env.MYSQL_PASS || 'secret',
        database: env.MYSQL_DB || 'pubs'
    }

})