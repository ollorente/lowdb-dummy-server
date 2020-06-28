const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const { join } = require('path')

const app = express()

/* Middlewares */
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Routes */
app.use('/api/v1', require('./routes'))

/* Static files */
app.use(express.static(join(__dirname, 'public')))

/* Error */
app.get('*', (req, res) => {
    res.status(404).json({
        error: `Page don't found! :(`
    })
})

module.exports = app