const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/documentController');

router.post('/add', DocumentController.addDocument);
router.get('/search', DocumentController.search);

module.exports = router;
