//handle SQL queries

const pool = require('../congif/db');

class documentModel{

    static async insertDocument(title,content) {
        const result = await pool.query('INSERT INTO dovuments (title, content) VALUES ($1, $2) RETURNING *', 
            [title,content]
        );

        return result.rows[0];
    }

    static async getAllDocuments(){
        const result = await pool.query('SELECT * FROM docuemnts');
        return result.rows;
    }
}

module.exports =DocumentModel;