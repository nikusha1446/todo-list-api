const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);

module.exports = router;
