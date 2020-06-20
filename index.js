const express = require('express');
const Datastore = require('nedb'),
   db = new Datastore('database.db'),
   app = express();

db.loadDatabase()

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

app.post('/api', (req, res) => {
   db.insert(req.body)

   res.json({ "success": true })
})


app.listen(3000, console.log(`Running at http://localhost:3000`))