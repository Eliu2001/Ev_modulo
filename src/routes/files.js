const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadFile, serveFile, deleteFile } = require('../controllers/fileController');
router.post('/upload', auth, uploadFile);
router.get('/:filename', serveFile);
router.delete('/:filename', auth, deleteFile);
module.exports = router;