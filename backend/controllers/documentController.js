const DocumentService = require('../services/documentService');

class DocumentController{
    static async addDocument(req, res) {
        try {
            const {title, content} = req.body;
            const doc = await DocumentService.addDocument(title, content);
            res.json(doc);
        } catch (error) {
            console.error('Error in addDocument:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async search(req, res) {
        try {
            const {query} = req.query;
            const results = await DocumentService.searchDocument(query);
            res.json(results);
        } catch (error) {
            console.error('Error in search:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = DocumentController;