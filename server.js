const express = require('express')

const app = express()

const PORT = process.env.port || 3000

app.get('/', (req, res) => {
  res.send("API running")
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
} )
