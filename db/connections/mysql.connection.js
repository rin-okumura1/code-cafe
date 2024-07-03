import mysql from 'mysql2'
import { config } from '../db/mysql.config.js'

export const connection = mysql.createPool(config)



