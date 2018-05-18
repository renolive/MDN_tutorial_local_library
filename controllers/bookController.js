var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        book_count: (callback) => Book.count({}, callback),
        book_instance_count: (callback) => BookInstance.count({}, callback),
        author_count: (callback) => Author.count({}, callback),
        genre_count: (callback) => Genre.count({}, callback)
    }, function (err, results) {
        res.render('index', {title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all books.
exports.book_list = function(req, res) {
    Book.find({}, 'title author')
        .populate('author')
        .exec((err, list_books) => {
            if (err) { return next(err); }
            res.render('book_list', { title: 'Book List', book_list: list_books });
        });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    async.parallel({
        // Fetch book by id
        book: (callback) => Book.findById(req.params.id).populate('author').populate('genre').exec(callback),
        // Fetch book instances
        book_instance: (callback) => BookInstance.find({ book: req.params.id }).exec(callback)
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: 'Title', book:  results.book, book_instances: results.book_instance } );
    });
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};