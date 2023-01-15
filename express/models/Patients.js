// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
    // Method all
    static all() {
        // return promise
        return new Promise((resolve, reject) => {
            // Membuat query
            const sql = "SELECT * FROM patients";

            // Menjalankan query
            db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Method create
    static async create(data) {
        // Tambahkan data
        const id = await new Promise((resolve, reject) => {
            // Membuat query
            const sql = "INSERT INTO patients SET ?";

            // Menjalankan query
            db.query(sql, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });

        // Mendapatkan data berdasarkan id
        return await Patient.find(id);
    };

    // Method find
    static find(id) {
        // return promise
        return new Promise((resolve) => {
            // Membuat query
            const sql = "SELECT * FROM patients WHERE id = ?";

            // Menjalankan query
            db.query(sql, id, (err, result) => {
                // Destructing array
                const [patient] = result;
                resolve(patient);
            });
        });
    };

    // Method update
    static async update(id, data) {
        // Update data
        try {
            const result = await new Promise((resolve, reject) => {
                // Membuat query
                const sql = "UPDATE patients SET ? WHERE id = ?";

                // Menjalankan query
                db.query(sql, [data, id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            return await Patient.find(id);
        } catch (err) {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }
    };

    // Method delete
    static delete(id) {
        // return promise
        return new Promise((resolve, reject) => {
            // Membuat query
            const sql = "DELETE FROM patients WHERE id = ?";

            // Menjalankan query
            db.query(sql, id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Method search
    static search(name) {
        // return promise
        return new Promise((resolve, reject) => {
            // Membuat query
            const sql = "SELECT * FROM patients WHERE name LIKE ?";

            // Menjalankan query
            db.query(sql, `%${name}%`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    // Method findByStatus
    static findByStatus(status) {
        // return promise
        return new Promise((resolve, reject) => {
            // Membuat query
            const sql = "SELECT * FROM patients WHERE status = ?";

            // Menjalankan query
            db.query(sql, status, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// export class Patient
module.exports = Patient;