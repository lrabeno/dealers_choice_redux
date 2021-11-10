const nav = ({ players })=> `
<nav>
  <a href='/'>Home</a>
  <a href ='/players'>Players(${players.length})</a>
</nav>
`

const head = ({ title }) => `
<head>
  <link rel='stylesheet' href='/assets/styles.css'/>
  <title>${title}</title>
</head>
`

module.exports = {
    head, 
    nav
}