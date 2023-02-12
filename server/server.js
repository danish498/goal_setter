import express from 'express';
import * as path from 'path';
// const path = require('path');
import colors from 'colors';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;
connectDB();

import { errorHandler } from './middleware/errorMiddlleWare.js';

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

import getRoutesValue from './routes/getRoutes.js';
import getUsersValue from './routes/userRoutes.js';

app.use('/api/goals', getRoutesValue);
app.use('/api/user', getUsersValue);

// Serve client
console.log(process.env.NODE_ENV === 'production');
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));

/*

const CONNECTION_URL =
  'mongodb+srv://daanish498:LB4aDvenoDJqTneO@cluster0.skqjgjh.mongodb.net/data?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((err) => console.log(err));

  */
