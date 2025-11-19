const path = require('path');
const fs = require('fs');
const { UPLOAD_DIR, ALLOWED_MIME_TYPES } = require('../config');
async function uploadFile(req, res, next) {
    try {
        if (!req.files || !req.files.file) return res.status(400).json({
            success: false, message: 'No file uploaded'
        });
        const file = req.files.file; // express-fileupload coloca aquí el archivo
        // validaciones: tipo
        if (ALLOWED_MIME_TYPES.length && !
            ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return res.status(400).json({ success: false, message: 'File type not allowed' });
        }
        // generar nombre seguro
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')}`;
        const dest = path.join(UPLOAD_DIR, filename);
        await file.mv(dest);
        res.status(201).json({
            success: true, data: {
                filename, size: file.size,
                mimetype: file.mimetype
            }, message: 'File uploaded'
        });
    } catch (err) {
        if (err && err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({
            success: false, message: 'File too large'
        });
        next(err);
    }
}
function serveFile(req, res, next) {
    try {
        const { filename } = req.params;
        const filePath = path.join(UPLOAD_DIR, filename);
        if (!fs.existsSync(filePath)) return res.status(404).json({
            success:
                false, message: 'File not found'
        });
        res.sendFile(filePath);
    } catch (err) { next(err); }
}
function deleteFile(req, res, next) {
    try {
        const { filename } = req.params;
        const filePath = path.join(UPLOAD_DIR, filename);
        if (!fs.existsSync(filePath)) return res.status(404).json({
            success:
                false, message: 'File not found'
        });
        fs.unlinkSync(filePath);
        res.json({ success: true, message: 'File deleted' });
    } catch (err) { next(err); }
}
module.exports = { uploadFile, serveFile, deleteFile };