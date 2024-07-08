import Mysql from '../connections/Mysql.js';

export default class UsersDaoMysql extends Mysql {
    constructor() {
        super();
        this.table = 'usuarios';
        this.#createTable();
    }

    #createTable() {
        const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            surname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL
        )`;
        this.connection.query(query);
    }

    async getAllUsers() {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const [result] = await this.connection.promise().query(query);
            return result;
        } catch (err) {
            console.log('Problemas al obtener los usuarios');
            return [];
        }
    }

    async getUserById(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }

    async getUsersByName(name) {
        const query = `SELECT * FROM ${this.table} WHERE name = ?`;
        const [result] = await this.connection.promise().query(query, [name]);
        return result;
    }

    async addUser(user) {
        const { name, surname, email } = user;
        const query = `INSERT INTO ${this.table} (name, surname, email) VALUES (?, ?, ?)`;
        const [result] = await this.connection.promise().query(query, [name, surname, email]);
        return result;
    }

    async modifyUser(userId, userData) {
        const { name, surname, email } = userData;
        const query = `UPDATE ${this.table} SET name = ?, surname = ?, email = ? WHERE id = ?`;
        const [result] = await this.connection.promise().query(query, [name, surname, email, userId]);
        return result;
    }

    async deleteUser(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ?`;
        const [result] = await this.connection.promise().query(query, [id]);
        return result;
    }
}
