/**
 * Photo Model
 */

module.exports = (bookshelf) => {
    return bookshelf.model('Photo', {
        tableName: 'photos',
        user() {
            return this.belongsTo('User');
        },
        albums() {
            return this.belongsToMany('Album');
        },
    }, {
        fetchPhotoId(id, fetchOptions = {}) {
            return new this({ id }).fetch(fetchOptions);
        },
    });
}