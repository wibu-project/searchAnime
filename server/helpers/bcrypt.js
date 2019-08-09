const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

module.exports = { 
    encrypt(password) {
        return bcrypt.hashSync(password, salt);
    },
    decrypt(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}