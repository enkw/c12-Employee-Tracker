const pool = new Pool(
    {
      user: 'postgres',
      password: 'wackwack',
      database: 'movies_db'
    },
    console.log(`Connected to the employee_db database.`)
  )