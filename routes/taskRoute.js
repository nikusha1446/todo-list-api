const express = require('express');
const { createTask } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', createTask);

module.exports = router;
