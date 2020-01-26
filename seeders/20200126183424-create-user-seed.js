/**
 * Bcrypt configs
 *
 * password: 12345678
 * nº rounds: 12
 */

const hash = '$2b$12$nT/8GO9Ei1dPo0ylr6FD6e/rj.aQTheVl3/1AH3AZwyjz4hmvmDZC';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user', [
      {
        id: 1,
        username: 'Lucas',
        password: hash,
        is_active: 1,
        created_at: '2020-01-18 15:02:28',
        updated_at: '2020-01-18 15:02:28',
        deleted_at: null,
      },
      {
        id: 2,
        username: 'Giovanni',
        password: hash,
        is_active: 1,
        created_at: '2020-01-18 15:02:28',
        updated_at: '2020-01-21 12:31:00',
        deleted_at: null,
      },
      {
        id: 3,
        username: 'Polarrana',
        password: hash,
        is_active: 1,
        created_at: '2020-01-18 15:02:28',
        updated_at: '2020-01-18 15:02:28',
        deleted_at: '2020-01-21 12:31:00',
      },
      {
        id: 4,
        username: 'Melissa',
        password: hash,
        is_active: 1,
        created_at: '2020-01-18 15:02:28',
        updated_at: '2020-01-21 12:31:00',
        deleted_at: '2020-01-21 17:01:00',
      },
      {
        id: 5,
        username: 'Larissa',
        password: hash,
        is_active: 0,
        created_at: '2020-01-18 15:02:28',
        updated_at: '2020-01-18 15:02:28',
        deleted_at: null,
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
