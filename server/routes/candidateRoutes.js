// candidateRoutes.js

const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// POST route to submit a new candidate
router.post('/candidates', candidateController.submitCandidate);

module.exports = router;
