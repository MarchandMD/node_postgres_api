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

// constant/function to use for GET request to /users/:id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

// constant/function to use when getting a POST request to /users
const createUser = (req, res) => {
  const { name, email } = req.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${res.rows[0].id}`)
  })
}

// constant/function to use when getting a POST request for /users/:id
const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// constant/function to use when getting a DELETE request for /users/:id
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

// this is how these functions are "packaged" and exposed in scope to something else, specifically the index.js
module.exports = {
  getUsers,
  getUserById,
  createUser
}

