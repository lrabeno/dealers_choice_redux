
const { getPlayer } = require('../db')
const { nav, head } = require('../templates')
const app = require('express').Router();

module.exports = app;

app.get('/', async(req, res, next) => {
    try {
      const data = await Promise.all([
          getPlayer()
      ])
      const [players] = data;
      res.send(`
        <html>
        ${head({title: 'Players'})}
          <body>
            ${nav({players})}
              <h1>Best Players in The Nba!</h1>
                ${players.map(player => `<h3>${player.name}</h3>`).join('')}
                <div id="click-link">
                  <h3><a href="/details">Click here for more info and to add your favorite player!</a></h3>
                  <h3><a href="/">Back to Home</a></h3>
                </div>
          </body>
        </html>
      `)
    }
    catch (error){
        next (error)
    }
  })
  
