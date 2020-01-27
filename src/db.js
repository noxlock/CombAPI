const Database = require('better-sqlite3')
const path = require('path')
const crypto = require('crypto')
const db = new Database(
    path.join(__dirname, '../sql/dater.db')
)



function getAllUsers() {
    let query = db.prepare('SELECT * FROM user')
    return query.all()

}

function getSingleUser(id) {
    let query = db.prepare('SELECT * FROM user WHERE user_id = ?')
    return query.get(id)
}

function createUser(data) {

    let passhash = crypto.createHash('sha256').update('data.password').digest('hex')
    let query = db.prepare(`INSERT INTO user(user_id, username, password, role) VALUES (?, ?, ?, ?)`)
    query.run(data.user_id, data.username, passhash, data.role)
}

function modifyUser(body, id) {
    let passhash = crypto.createHash('sha256').update('body.new_password').digest('hex')
    let query = db.prepare(`UPDATE user SET password = ? WHERE user_id = ?`)
    query.run(passhash, id)
}

function deleteUser(id) {
    let query = db.prepare('DELETE FROM user WHERE user_id = ?')
    return query.run(id)
}

function countServers() {
    let query = db.prepare(`SELECT COUNT(DISTINCT server_id) FROM server`)
    return query.get()
}

function searchUserServers(id) {
    let query = db.prepare(`SELECT username, server_name FROM user JOIN server ON user_id = user WHERE user_id = ?`)
    return query.all(id)
}

function dumpData() {
    let query1 = db.prepare(`SELECT * FROM server`)
    let query2 = db.prepare(`SELECT * FROM user`)
    let query3 = db.prepare(`SELECT * FROM role`)
    let query4 = db.prepare(`SELECT * FROM message`)
    let query5 = db.prepare(`SELECT * FROM emoji`)
    query.all('')
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    modifyUser: modifyUser,
    deleteUser: deleteUser,
    countServers: countServers,
    searchUserServers: searchUserServers,
    dumpData: dumpData
}