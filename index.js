
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))


app.get('/', (req, res) => {
  fs.readdir('./files', (err, files) => {
        res.render("index", {files: files })
  })
})
app.get('/files/:name', (req, res) => {
  fs.readFile('./files/' + req.params.name, 'utf8', (err, data) => {
    res.render("file", {data: data, name: req.params.name})
  })
})

app.get('/delete/:name', (req, res) => {
  fs.unlink('./files/' + req.params.name, (err) => {
    res.redirect('/') 
  })
})

app.post('/create', (req, res) => {
    fs.writeFileSync('./files/' + req.body.title.split(' ').join('-') + '.txt', req.body.description)
    res.redirect('/')
})



app.listen(3000)