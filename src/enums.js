module.exports = Object.seal({
    CONFIG_KEYS: {
      DB: {
        ALL: 'db',
        DIALECT: 'db.dialect',
        HOST: 'db.host',
        NAME: 'db.name',
        PASSWORD: 'db.password',
        POOL: {
          MAX: 'db.pool.max',
        },
        PORT: 'db.port',
        USER: 'db.user',
      },
      ENV: 'env',
      PORT: 'port',
    },
  
    ENVS: {
      DEVELOPMENT: 'development',
      PRODUCTION: 'production',
      TEST: 'test',
    },
  });
  