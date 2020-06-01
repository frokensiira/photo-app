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

            // check if email already exists in db
            const user = await new this({ email }).fetch({ require: false });

            if(!user){
                return false;
            }

            // get hashed password from db
            const hash = user.get('password');

            //compare new hash with hash from db
            const result = await bcrypt.compare(password, hash);    

            // return user if hashed match, otherwise false/null
            return (result)
                ? user
                : false;
        }
    });
}

