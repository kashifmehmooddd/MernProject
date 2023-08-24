const express = require('express');
const connectDb = require('./config/db');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');


const app = express()

const PORT = process.env.port || 3001

connectDb();
app.use(express.json({ extended: false }))

app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
