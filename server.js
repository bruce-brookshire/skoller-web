const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '/')))
app.set('view engine', 'html')

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'), {}, (error) => {
    console.log(error)
  })
})

app.listen(process.env.PORT || 8080)
