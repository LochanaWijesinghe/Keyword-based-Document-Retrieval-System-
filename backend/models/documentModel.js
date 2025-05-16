//handle SQL queries

const pool = require('../config/db');

class DocumentModel{

    static async insertDocument(title,content) {
        const result = await pool.query('INSERT INTO documents (title, content) VALUES ($1, $2) RETURNING *', 
            [title,content]
        );

        return result.rows[0];
    }

    static async getAllDocuments(){
        const result = await pool.query('SELECT * FROM documents');
        return result.rows;
    }

    static async getDocumentCount() {
        const result = await pool.query('SELECT COUNT(*) FROM documents');
        return parseInt(result.rows[0].count, 10);
    }
}

module.exports = DocumentModel;