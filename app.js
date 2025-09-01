const express = require('express');
const prisma = require('./utils/db');

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tasks', taskRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
