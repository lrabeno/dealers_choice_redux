const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: "bballplayers",   
  user: 'postgres',    
  password: 'ask for permission',  
});

const getPlayer = async() => {
    return (await client.query('SELECT * FROM "Player";')).rows; // You want to return the name @ row from "Player" in SQL!
};

const createPlayer = async({ number, name, team, nickname }) => {
    return (await client.query('INSERT INTO "Player"(number, name, team, nickname) VALUES($1, $2, $3, $4) RETURNING *;', [number, name, team, nickname])).rows[0];
};

const deletePlayer = async(id) => {
    await client.query('DELETE FROM "Player" WHERE id=$1', [id]);
};

const syncAndSeed = async () => {
    const SQL = `
      DROP TABLE IF EXISTS "Player";
      CREATE TABLE "Player"(
        id SERIAL PRIMARY KEY, 
        number INTEGER,
        name VARCHAR(50),
        team VARCHAR(20),
        nickname VARCHAR(20)
      );
      INSERT INTO "Player"(number, name, team, nickname) VALUES('30', 'Julius Randle', 'Knicks', 'Orange Julius');
      INSERT INTO "Player"(number, name, team, nickname) VALUES('9', 'Rj Barrett', 'Knicks', 'The 9 God');
      INSERT INTO "Player"(number, name, team, nickname) VALUES('23', 'Lebron James', 'Lakers', 'King James');
      INSERT INTO "Player"(number, name, team, nickname) VALUES('34', 'Giannis Antetokounmpo', 'Bucks', 'The Greek Freak');
    `;
    await client.query(SQL);
  };

//   const find = (id) => {
//     const playerLink = SQL.find(player => player.id === +id);
//     return {...playerLink}; // Again, we copy the post data before returning so the original information is safe.
//   }

  module.exports = {
      client, 
      getPlayer,
      createPlayer,
      deletePlayer,
      syncAndSeed,
    //   find: find
  }