const sqlite = require('sqlite3').verbose()
const inquirer = require('inquirer')

let db = new sqlite.Database(
    '/home/noxlock/Downloads/CA/T3A3/sql/dater.db',
    sqlite.OPEN_READWRITE,
    (error) => {
        if(error) {
            console.error(error)
        }

        
    }
)

function db_insert(){
    inquirer.prompt([
        {
        type: 'number',
        name: 'insertTable',
        message: `What table would you like to insert into?
        1: Server
        2: User
        3: Role
        4: Message
       `
        },
    ])
}

function main() {
    inquirer.prompt([
        {
        type: 'number',
        name: 'menuChoice',
        message: `What would you like to do?
        1: Quit
        2: Insert records
        3: Perform a search
       `
        },
    ])
    .then(answer => {
        if (answer.menuChoice == 2) {
            console.log('insert')
            db_insert()
        }
        else if (answer.menuChoice == 3) {
            console.log('search')
        }
        else {
            console.log('quitting')
            db.close()
        }
    })
}


db.serialize(() => {
    main()
})


