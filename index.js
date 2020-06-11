const express = require('express');
const app = express()

app.listen(3000, console.log(`Running at http://localhost:3000`))

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

app.post('/api', (req, res) => {
   const { latitude, longitude, timestamp } = req.body;
   res.json({
      status: 'success',
      latitude,
      longitude,
      timestamp
   })
})
