const Mysql = require('mysql2')

//config mysql
const db = Mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'nabila1208',
    database : 'kuliah'
})

//connect to mysql
db.connect((err) => {
    if(err) {
        console.log (err)
    }
    console.log('Mysql connected')
})

module.exports = db;