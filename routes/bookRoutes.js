const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Failed to fetch books', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Failed to fetch book', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// CREATE a new book
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.error('Failed to create book', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// UPDATE a book by ID
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Failed to update book', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Failed to delete book', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;
