const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

let db
async function createConnection() {
    const adapter = new FileAsync('db.json')
    db = await low(adapter)

    db.defaults({
        adds: [],
        admins: [],
        comments: [],
        cities: [],
        countries: [],
        events: [],
        followers: [],
        groups: [],
        likes: [],
        messages: [],
        offices: [],
        pages: [],
        posts: [],
        states: [],
        superusers: [],
        users: []
    })
    .write()
}

const getConnection = () => db

module.exports = {
    createConnection,
    getConnection
}