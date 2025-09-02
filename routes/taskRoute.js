const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);

module.exports = router;
