// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

// timestamp endpoint...
app.get('/api/timestamp', (req, res) => {
	date = new Date()
	res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

app.get('/api/timestamp/:date_string', (req, res) => {
	let date_string = req.params.date_string
	let valid_utc = /^\d{4}-{1}\d{2}-{1}\d{2}$/.test(date_string)
	let valid_unix = /^\d+$/.test(date_string)
	if (valid_unix || valid_utc) {
		if (valid_unix) {
			date_string = parseInt(date_string)
		}
		date = new Date(date_string)
		res.json({ unix: date.getTime(), utc: date.toUTCString() })
	} else {
		res.json({ error: 'Invalid Date' })
	}
})

// listen for requests :)
app.listen(PORT, () => {
	console.log(`Your app is listening on port ${PORT}`)
})
