import Mysql from '../connections/Mysql.js';

export default class UsersDaoMysql extends Mysql {
    constructor() {
        super();
        this.table = 'usuarios';
        this.productosTable = 'productos';
        this.userTypesTable = 'tipos_de_usuarios';
        this.descTypesTable = 'tipos_de_descuentos';
        this.ventasTable = 'ventas';
        this.#createTables();
    }

    #createTables() {
        const createDescTypesTable = `CREATE TABLE IF NOT EXISTS ${this.descTypesTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            descuento INT NOT NULL
        )`;
        this.connection.query(createDescTypesTable, (err) => {
            if (err) {
                console.error('Error al crear la tabla tipos_de_descuentos:', err);
            } else {
                console.log('Tabla tipos_de_descuentos creada o ya existía');
                this.#populateDescTypes();
            }
        });

        const createUserTypesQuery = `CREATE TABLE IF NOT EXISTS ${this.userTypesTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tipo VARCHAR(50) NOT NULL,
            tipoDescuento INT,
            FOREIGN KEY (tipoDescuento) REFERENCES ${this.descTypesTable}(id)
        )`;
        this.connection.query(createUserTypesQuery, (err) => {
            if (err) {
                console.error('Error al crear la tabla tipos_de_usuarios:', err);
            } else {
                console.log('Tabla tipos_de_usuarios creada o ya existía');
                this.#populateUserTypes();
            }
        });

        const createUsuariosQuery = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            surname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            tipoUsuario INT NOT NULL,
            FOREIGN KEY (tipoUsuario) REFERENCES ${this.userTypesTable}(id)
        )`;
        this.connection.query(createUsuariosQuery, (err) => {
            if (err) {
                console.error('Error al crear la tabla usuarios:', err);
            } else {
                console.log('Tabla usuarios creada o ya existía');
            }
        });

        const createProductosQuery = `CREATE TABLE IF NOT EXISTS ${this.productosTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            precio FLOAT NOT NULL
        )`;
        this.connection.query(createProductosQuery, (err) => {
            if (err) {
                console.error('Error al crear la tabla productos:', err);
            } else {
                console.log('Tabla productos creada o ya existía');
                this.#populateProductos();
            }
        });
        const createVentasQuery = `CREATE TABLE IF NOT EXISTS ${this.ventasTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idUsuario INT NOT NULL,
            idProducto INT NOT NULL,
            cantidad INT NOT NULL,
            valorVenta FLOAT NOT NULL,
            FOREIGN KEY (idUsuario) REFERENCES ${this.userTypesTable}(id),
            FOREIGN KEY (idProducto) REFERENCES ${this.productosTable}(id)
        )`;
        this.connection.query(createVentasQuery, (err) => {
            if (err) {
                console.error('Error al crear la tabla ventas:', err);
            } else {
                console.log('Tabla ventas creada o ya existía');
            }
        });
    }

    #populateDescTypes() {
        const desTypes = [10, 25, 50];
        desTypes.forEach((tipo) => {
            const query = `INSERT IGNORE INTO ${this.descTypesTable} (descuento) VALUES (?)`;
            this.connection.query(query, [tipo], (err) => {
                if (err) {
                    console.error(`Error al insertar el tipo de descuento ${tipo}:`, err);
                } else {
                    console.log(`Tipo de descuento ${tipo} insertado o ya existía`);
                }
            });
        });
    }
    
    #populateUserTypes() {
        const userTypes = [
            { tipo: 'cliente', tipoDescuento: 1 },
            { tipo: 'proveedor', tipoDescuento: 2 },
            { tipo: 'sucursal', tipoDescuento: 3 }
        ];
        userTypes.forEach((tipo) => {
            const query = `INSERT IGNORE INTO ${this.userTypesTable} (tipo, tipoDescuento) VALUES (?, ?)`;
            this.connection.query(query, [tipo.tipo, tipo.tipoDescuento], (err) => {
                if (err) {
                    console.error(`Error al insertar el tipo de usuario ${tipo.tipo}:`, err);
                } else {
                    console.log(`Tipo de usuario ${tipo.tipo} insertado o ya existía`);
                }
            });
        });
    }
    
    #populateProductos() {
        const productosData = [
            { nombre: 'cafe x 250', precio: 250.75 },
            { nombre: 'cafe x 500', precio: 450.89 },
            { nombre: 'cafe importado x 1kg', precio: 1050.30 }
        ];
    
        productosData.forEach((producto) => {
            const query = `INSERT IGNORE INTO ${this.productosTable} (nombre, precio) VALUES (?, ?)`;
            this.connection.query(query, [producto.nombre, producto.precio], (err) => {
                if (err) {
                    console.error(`Error al insertar el producto ${producto.nombre}:`, err);
                } else {
                    console.log(`Producto ${producto.nombre} insertado correctamente`);
                }
            });
        });
    }
    



    async getAllUsers() {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const [rows] = await this.connection.promise().query(query);
            return rows;
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
            return [];
        }
    }

    async getAllUsersByType(typeId) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE tipoUsuario = ?`;
            const [rows] = await this.connection.promise().query(query, [typeId]);
            return rows;
        } catch (err) {
            console.error('Error al obtener usuarios por tipo:', err);
            return [];
        }
    }

    async getUserById(userId) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE id = ?`;
            const [rows] = await this.connection.promise().query(query, [userId]);
            return rows[0];
        } catch (err) {
            console.error('Error al obtener usuario por ID:', err);
            return null;
        }
    }

    async getUsersByName(name) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE name = ?`;
            const [rows] = await this.connection.promise().query(query, [name]);
            return rows;
        } catch (err) {
            console.error('Error al obtener usuarios por nombre:', err);
            return [];
        }
    }

    async addUser(user) {
        const { name, surname, email, tipoUsuario } = user;
        try {
            const query = `INSERT INTO ${this.table} (name, surname, email, tipoUsuario) VALUES (?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [name, surname, email, tipoUsuario]);
            return result.insertId;
        } catch (err) {
            console.error('Error al agregar usuario:', err);
            return null;
        }
    }

    async modifyUser(userId, userData) {
        const { name, surname, email, tipoUsuario } = userData;
        try {
            const query = `UPDATE ${this.table} SET name = ?, surname = ?, email = ?, tipoUsuario = ? WHERE id = ?`;
            const [result] = await this.connection.promise().query(query, [name, surname, email, tipoUsuario, userId]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al modificar usuario:', err);
            return false;
        }
    }

    async deleteUser(userId) {
        try {
            const query = `DELETE FROM ${this.table} WHERE id = ?`;
            const [result] = await this.connection.promise().query(query, [userId]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
            return false;
        }
    }

    async modifyUserCategory(userId, newCategory) {
        try {
            const query = `UPDATE ${this.table} SET tipoUsuario = ? WHERE id = ?`;
            const [result] = await this.connection.promise().query(query, [newCategory, userId]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al modificar categoría de usuario:', err);
            return false;
        }
    }
    async getProductoPrecio(idProducto) {
        try {
            const query = `SELECT precio FROM ${this.productosTable} WHERE id = ?`;
            const [rows] = await this.connection.promise().query(query, [idProducto]);
            return rows[0] ? rows[0].precio : null;
        } catch (err) {
            console.error('Error al obtener el precio del producto:', err);
            return null;
        }
    }

    async getUsuarioDescuento(idUsuario) {
        try {
            const query = `
                SELECT td.descuento 
                FROM ${this.table} u
                JOIN ${this.userTypesTable} ut ON u.tipoUsuario = ut.id
                JOIN ${this.descTypesTable} td ON ut.tipoDescuento = td.id
                WHERE u.id = ?
            `;
            const [rows] = await this.connection.promise().query(query, [idUsuario]);
            return rows[0] ? rows[0].descuento : null;
        } catch (err) {
            console.error('Error al obtener el descuento del usuario:', err);
            return null;
        }
    }
    
    async addVenta(ventaData) {
        const { idUsuario, idProducto, cantidad, valorVenta } = ventaData;
        try {
            const query = `INSERT INTO ${this.ventasTable} (idUsuario, idProducto, cantidad, valorVenta) VALUES (?, ?, ?, ?)`;
            const [result] = await this.connection.promise().query(query, [idUsuario, idProducto, cantidad, valorVenta]);
            return result.insertId;
        } catch (err) {
            console.error('Error al agregar venta:', err);
            return null;
        }
    }
}
