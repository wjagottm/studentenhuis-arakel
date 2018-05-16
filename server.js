//
// Studenthuis eindopdracht programmeren 4
//

const express = require('express')
const morgan = require('morgan')
const Deelnemer = require('./models/Deelnemer')
const bodyParser = require('body-parser')
const authentication_routes = require('./routes/authentication_routes')
const deelnemer_routes = require('./routes/deelnemer_routes')
const maaltijd_routes = require('./routes/maaltijd_routes')
const studentenhuis_routes = require('./routes/studentenhuis_routes')
const config = require('./config/config.json')
const ApiError = require('./models/ApiError')


var db = require('./config/db');

const app = express()
const port = process.env.PORT || config.webPort || 80

console.log("using port: " + port)

app.set('PORT', config.webPort);
app.set('SECRET_KEY', config.secretkey);

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('*', function(req, res, next){
	next()
})

app.use('/api', authentication_routes)

app.use('/api', deelnemer_routes)

app.use('/api', maaltijd_routes)

app.use('/api', studentenhuis_routes)

app.use('*', function (req, res, next) {
	console.log('De endpoint die je zocht bestaat niet')
	next("Deze endpoint bestaat niet")
})

app.use((err, req, res, next) => {
	console.log('Catch-all error handler was called.')
	console.log(err.toString())

	const error = new ApiError(err.toString(), 404)

	res.status(404).json(error).end()
})

app.listen(port, () => {
	console.log('De server draait op port ' + port)
})

module.exports = app