const { v4: uuidv4 } = require('uuid');
const users = new Map();
function createUser({ name, email, password }) {
    const id = uuidv4();
    const user = { id, name, email, password };
    users.set(id, user);
    return { ...user };
}
function findByEmail(email) {
    for (const user of users.values()) if (user.email === email) return { ...user };
    return null;
}
function findById(id) {
    const user = users.get(id);
    return user ? { ...user } : null;
}
module.exports = { createUser, findByEmail, findById };