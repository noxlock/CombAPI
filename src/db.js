const Database = require('better-sqlite3')
const path = require('path')
const crypto = require('crypto')
const db = new Database(
    path.join(__dirname, '../sql/dater.db')
)

// RETURNS ALL USERS IN DATABASE
function getAllUsers() {
    let query = db.prepare('SELECT * FROM user')
    return query.all()

}

// RETURNS USER WITH MATCHING ID IN DATABASE
function getSingleUser(id) {
    let query = db.prepare('SELECT * FROM user WHERE user_id = ?')
    return query.get(id)
}

// CREATES A USER IN THE DATABASE
function createUser(data) {
    // HASH PASSWORD INTO SHA-256 
    let passhash = crypto.createHash('sha256').update('data.password').digest('hex')
    let query = db.prepare(`INSERT INTO user(user_id, username, password, role) VALUES (?, ?, ?, ?)`)
    query.run(data.user_id, data.username, passhash, data.role)
}

// CHANGES THE PASSWORD OF A USER IN THE DATABASE
function modifyUser(body, id) {
    // HASH PASSWORD INTO SHA-256
    let passhash = crypto.createHash('sha256').update('body.new_password').digest('hex')
    let query = db.prepare(`UPDATE user SET password = ? WHERE user_id = ?`)
    query.run(passhash, id)
}

// DELETES A USER IN THE DATABASE
function deleteUser(id) {
    let query = db.prepare('DELETE FROM user WHERE user_id = ?')
    return query.run(id)
}

// COUNTS THE AMOUNT OF SERVERS
function countServers() {
    let query = db.prepare(`SELECT COUNT(DISTINCT server_id) FROM server`)
    return query.get()
}

// RETURNS THE SERVERS A GIVEN USER IS IN
function searchUserServers(id) {
    let query = db.prepare(`SELECT username, server_name FROM user JOIN server ON user_id = user WHERE user_id = ?`)
    return query.all(id)
}

// RETURNS ALL RECORDS FROM ALL TABLES
function dumpData() {
    let query1 = db.prepare(`SELECT * FROM server`)
    let query2 = db.prepare(`SELECT * FROM user`)
    let query3 = db.prepare(`SELECT * FROM role`)
    let query4 = db.prepare(`SELECT * FROM message`)
    let query5 = db.prepare(`SELECT * FROM emoji`)
    let queries = {
        server: query1.all(),
        user: query2.all(),
        role: query3.all(),
        message: query4.all(),
        emoji: query5.all()
    }
    return queries
}

// RETURNS ALL MEMBERS WITH MODERATOR OR ADMINISTRATIVE PRIVILEGES
function searchStaff() {
    let query = db.prepare(`SELECT u.user_id, u.username, r.role_id FROM user u INNER JOIN role r ON u.role = r.role_id WHERE (r.admin=1 OR r.moderator = 1)`)
    return query.all()
}

// CHECKS IF A USER ALREADY EXISTS BEFORE INSERTING
function doesUserAlreadyExist(data) {
    let query = db.prepare(`SELECT user_id FROM user WHERE user_id = ? OR username = ?`)
    return query.get(data.user_id, data.username)
}

// CHECKS IF A USER EXISTS BEFORE ATTEMPTING TO DISPLAY THEIR DATA
function doesUserExistSearch(data) {
    let query = db.prepare(`SELECT user_id FROM user WHERE user_id = ?`)
    query.get(data.id)
}


module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    modifyUser: modifyUser,
    deleteUser: deleteUser,
    countServers: countServers,
    searchUserServers: searchUserServers,
    dumpData: dumpData,
    searchStaff: searchStaff,
    doesUserAlreadyExist: doesUserAlreadyExist,
    doesUserExistSearch: doesUserExistSearch,
}