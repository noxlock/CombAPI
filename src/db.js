const Database = require('better-sqlite3')

const db = new Database(
    '/home/noxlock/Downloads/CA/T3A3/sql/dater.db'
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
    let query = db.prepare(`INSERT INTO user(user_id, username, password, role) VALUES (?, ?, ?, ?)`)
    query.run(data.user_id, data.username, data.password, data.role)
}

function modifyUser(body, params) {
    let query = db.prepare(`UPDATE user SET password = ? WHERE user_id = ?`)
    query.run(body.new_password, params)
}

function deleteUser(id) {
    let query = db.prepare('DELETE FROM user WHERE user_id = ?')
    return query.run(id)
}


module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    modifyUser: modifyUser,
    deleteUser: deleteUser
}