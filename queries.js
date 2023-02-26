const Pool = require('pg').Pool
const pool = new Pool({
  user: 'michaelmarchand',
  host: 'localhost',
  database: 'tania_api',
  password: '',
  port: 5432
})

// function to be used when an HTTP GET request arrives at the server
const getUsers = (request, response) => {
  // go to the database via the pool, and #query it by running the first argument
  // it appears the #query function accepts a second argument of a function
  // the second function includes (errors, results), which arrive from the #query function performing some task on the first argument
  // the first argument no doubt can be nil/null, since it's not always expected to result in an error
  // the second argument is the results of the query
  // those two arguments are passed to the body of the arrow function
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    // this is interesting....so the keyword response has a #status function which allows a status code to be specified, accepts a #json function which allows the second argument of this function to be serialized
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}