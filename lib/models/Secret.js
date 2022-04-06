const pool = require('../utils/pool');

module.exports = class Secret {
  id;
  title;
  description;
  created_at;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
    this.userId = row.user_id;
  }

  static async create({ title, description, id }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
            secrets (title, description, name)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
          
          `,
      [title, description, id]
    );
    return new Secret(rows[0]);
  }
};
