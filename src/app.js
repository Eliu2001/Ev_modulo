const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');
const { UPLOAD_DIR, MAX_FILE_SIZE_BYTES } = require('./config');
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// file upload middleware
app.use(fileUpload({limits: { fileSize: MAX_FILE_SIZE_BYTES },
abortOnLimit: true,
createParentPath: true
}));
// ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive:
true });
// routes
app.use('/api/users', usersRouter);
app.use('/api/files', filesRouter);
// error handler (simple)
app.use((err, req, res, next) => {
console.error(err);
const status = err.status || 500;
res.status(status).json({ success: false, message: err.message ||
'Internal Server Error' });
});
module.exports = app;