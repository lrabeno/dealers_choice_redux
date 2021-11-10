const { getPlayer, createPlayer, deletePlayer } = require('../db')
const { nav, head } = require('../templates')
const app = require('express').Router();

module.exports = app;

  /* BELOW IS YOUR DETAILS PAGE */
  app.get('/', async(req, res, next) => {
    //const id = req.params.id; 
    // const bballPlayer = await playerLink.find(id); 
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
              <div id="add-player">
              <h3>Add A Player Below:</h3>
              <form method='POST'>
                      <input name='number' type="number" placeholder="Number:" required="required"/>
                      <input name='name' placeholder="Player Name:" required="required"/>
                      <input name='team' placeholder="Team Name:" required="required"/>
                      <input name='nickname' placeholder="Players Nickname:" required="required"/>
                        <button>Add Player</button>
                    </form>
              </div> 
              <div id="player-data">
                ${players.map(player => `<h2>${player.name}
                  </h2>
                    <ul>
                      <li>Number: ${player.number}</li>
                      <li>Team: ${player.team}</li>
                      <li>Nickname: ${player.nickname}</li>
                    </ul>
                        <form method='POST' action='/details/${player.id}?_method=DELETE'>
                          <button>Delete Player:</button>
                        </form>  
                `).join('')}
                </div>
                <a class="details-link"href="/players">Back to Player Names</a>
          </body>
        </html>
      `)
    }
    catch (error){
        next (error);
    }
  })

  app.post('/', async(req, res, next) => {
    try {
      await createPlayer(req.body);
      res.redirect('/details')
    }
    catch (error) {
      next(error);
    }
  })

  app.delete('/:id', async(req, res, next) => {
    try {
      await deletePlayer(req.params.id);
      res.redirect('/details')
    }
    catch (error) {
      next(error);
    }
  })

