const app = require('./app')

const port = process.env.PORT || 9500

app.listen(port, () => {
    console.log(`>>> [lowDB] v1 | Server on http://localhost:${port} <<<`)
})