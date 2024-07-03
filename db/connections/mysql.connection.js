import mysql from 'mysql2'
import { config } from '../db/mysql.config.js'

export const connection = mysql.createPool(config)



connection.query('DROP TABLE USUARIOS')

connection.query(`CREATE TABLE IF NOT EXISTS USUARIOS (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
    );`)
