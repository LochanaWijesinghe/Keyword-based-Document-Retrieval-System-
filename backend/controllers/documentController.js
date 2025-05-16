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

    static async uploadFile(req, res) {
        try {
            const doc = await DocumentService.addFromFile(req.file);
            res.json(doc);
        } catch (e) {
            res.status(500).json({ error: e.message });
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

    static async getAll(req, res) {
        try {
            const docs = await DocumentService.getAllDocuments();
            res.json(docs);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = DocumentController;