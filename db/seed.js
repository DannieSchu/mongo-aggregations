const Book = require('../lib/models/Book');
const Author = require('../lib/models/Author');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ authorsToCreate = 10, booksToCreate = 100, commentsToCreate = 10 } = {}) => {
  const genre = ['literature', 'science fiction', 'horror', 'satire'];
  const authors = await Author.create([...Array(authorsToCreate)].map(() => ({
    name: chance.name()
  })));

  const books = await Book.create([...Array(booksToCreate)].map(() => ({
    authorId: chance.pickone(authors)._id,
    title: chance.sentence(),
    genre: chance.pickone(genre),
    pages: chance.integer({ min: 40, max: 700 })
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    comment: chance.sentence(),
    rating: chance.integer({ min: 0, max: 5 }),
    book: chance.pickone(books)._id
  })));
};
