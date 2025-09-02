const prisma = require('../utils/db');

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const whereClause = { userId };
    if (status && ['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      whereClause.status = status;
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    res.status(200).json({ tasks, count: tasks.length });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    if (status && !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be PENDING, IN_PROGRESS, or COMPLETED',
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined)
      updateData.description = description?.trim() || null;
    if (status !== undefined) updateData.status = status;

    if (updateData.title !== undefined && updateData.title === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: {
        userId,
        id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
