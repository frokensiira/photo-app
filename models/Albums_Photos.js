/**
 * Album Model
 */


module.exports = (bookshelf) => {
    return bookshelf.model('Albums_Photos', {
        tableName: 'albums_photos',
    });
}