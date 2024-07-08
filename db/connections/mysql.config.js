// const config = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'node'
// }


// Host: sql5.freesqldatabase.com
// Database name: sql5718576
// Database user: sql5718576
// Database password: Dka9PnJ9Pe
// Port number: 3306

const config = {
    host: process.env.HOST_DB, 
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DB
}

export default config