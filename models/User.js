/**
 * User Model
 */
const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    return bookshelf.model('User', {
        tableName: 'users',
        albums() {
            return this.hasMany('Album');
        },
        photos() {
            return this.hasMany('Photo');
        },
    }, {
        hashSaltRounds: 10,

        fetchUserId(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },

        async login (email, password){

            // Check if email exists in db
            const user = await new this({ email }).fetch({ require: false });

            if(!user){
                return false;
            }

            // Get hashed password from db
            const hash = user.get('password');

            // Compare new hash with hash from db
            const result = await bcrypt.compare(password, hash);    

            // If hashed match return user, otherwise return false
            return (result)
                ? user
                : false;
        }
    });
}

