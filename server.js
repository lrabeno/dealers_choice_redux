const path = require('path');
const { client, getPlayer, createPlayer, deletePlayer, syncAndSeed } = require('./db')
const express = require('express');
const app = express();
const { nav, head } = require('./templates')

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended:false}));
app.use(require('method-override')('_method'));


app.get('/', async(req, res, next) => {
  try {
    const data = await Promise.all([
        getPlayer()
    ])
    const [players] = data;
    res.send(`
      <html>
        ${head({title: 'Home'})}
        <body>
          ${nav({players})}
          <h1>Welcome to the site for the best Nba Players!</h1>
          <a href="/players"><h3>Lets get started!</h3></a>
        </body>
      </html>
    `)
  }
  catch (error){
      next (error)
  }
})

app.use('/players', require('./routes/players'));
app.use('/details', require('./routes/details'));


const init = async () => {
  try {
    await client.connect();
    await syncAndSeed();
    const louis = await createPlayer({number: 23, name: 'Michael Jordan', team: 'Bulls', nickname: 'His airness'})
    //console.log(louis)
    //console.log(await getPlayer());
    //console.log(await createPlayer('lou'))
    await deletePlayer(louis.id);
    //console.log(await getPlayer());
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ~~~~> ${port}`))
  } 
  catch (error) {
      console.log(error)
  }
}
init ();

