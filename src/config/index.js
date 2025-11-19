const path = require('path');
module.exports = {
PORT: process.env.PORT || 4000,
JWT_SECRET: process.env.JWT_SECRET || 'changeme',
JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
UPLOAD_DIR: process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads'),
MAX_FILE_SIZE_BYTES: parseInt(process.env.MAX_FILE_SIZE_BYTES ||
'5242880', 10),
ALLOWED_MIME_TYPES: (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,application/pdf').split(',')
};