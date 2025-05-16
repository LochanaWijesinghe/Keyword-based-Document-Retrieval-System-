const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/documentController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination for file uploads

router.post('/add', DocumentController.addDocument);
router.post('/upload', upload.single('file'), DocumentController.uploadFile);
router.get('/search', DocumentController.search);
router.get('/all', DocumentController.getAll);

module.exports = router;
