const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);

module.exports = router;
