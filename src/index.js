const app = require('./app')
const { createConnection } = require('./database')

const port = process.env.PORT || 9500
createConnection()

app.listen(port, () => {
	console.log(`>>> [lowDB] v1 | Server on http://localhost:${port} <<<`)
})