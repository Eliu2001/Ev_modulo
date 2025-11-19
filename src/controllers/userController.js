const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config');
const { createUser, findByEmail, findById } = require('../models/users');
function signToken(payload) {
return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
async function register(req, res, next) {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ success:
false, message: 'Missing fields' });
const existing = findByEmail(email);
if (existing) return res.status(400).json({ success: false, message:
'Email already registered' });
const user = createUser({ name, email, password });
const token = signToken({ sub: user.id, email: user.email });
res.status(201).json({ success: true, data: { user: { id: user.id, name:
user.name, email: user.email }, token } });
} catch (err) { next(err); }
}
async function login(req, res, next) {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ success: false,
message: 'Missing credentials' });
const user = findByEmail(email);
if (!user || user.password !== password) return res.status(401).json({
success: false, message: 'Invalid credentials' });
const token = signToken({ sub: user.id, email: user.email });
res.json({ success: true, data: { token } });
} catch (err) { next(err); }
}
async function me(req, res, next) {
try {
const userId = req.userId;
const user = findById(userId);
if (!user) return res.status(404).json({ success: false, message: 'Usernot found' });
res.json({ success: true, data: { id: user.id, name: user.name, email:
user.email } });

} catch (err) { next(err); }
}
module.exports = { register, login, me };