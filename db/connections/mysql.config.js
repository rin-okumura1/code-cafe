/* const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'node'
} */

/* const config = {
Host: 'sql5.freesqldatabase.com',
user: 'sql5718576',
password: 'Dka9PnJ9Pe',
name: 'sql5718576',
} */
 const config = {
     host: process.env.HOST_DB, 
     user: process.env.USER_DB,
     password: process.env.PASS_DB,
     database: process.env.DB
 }

export default config