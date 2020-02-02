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
app.get('/api/timestamp/:date_string', (req, res) => {
	let date_string = req.params.date_string
	let date
	if (date_string) {
		try {
			date = new Date(date_string)
			res.json({ unix: date.getTime(), utc: date.toUTCString() })
		} catch (e) {
			res.json({ error: 'Invalid Date' })
		}
	} else {
		date = new Date()
		res.json({ unix: date.getTime(), utc: date.toUTCString() })
	}
})

// listen for requests :)
app.listen(PORT, () => {
	console.log(`Your app is listening on port ${PORT}`)
})
