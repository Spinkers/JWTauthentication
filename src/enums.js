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
  
    HTTP_STATUS: {
      BAD_REQUEST: 400,
      INTERNAL_SERVER_ERROR: 500,
      NOT_FOUND: 404,
    },
  
    SEARCH_MODE: {
      EQUAL: 1,
      STARTS_WITH: 2,
      ENDS_WITH: 3,
      CONTAINS: 4,
    },
  });
  