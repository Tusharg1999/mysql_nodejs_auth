const db=require('mysql')
module.exports.databaseConnection=db.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employee'
})