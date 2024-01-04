import express from 'express';
import connectDb from './data/config.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv  from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDb();

//const express  = require('express');
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

const app = express();

// Allow requests from a specific origin
const corsOptions = {
    origin: 'https://allowed-origin.com',
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };

//var cors = require('cors');
// app.use(cors());
app.use(cors());


//body parser
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Cookie parser middleware

app.use(cookieParser());

// app.get("/", (req, res)=>
// {
//     res.send("APi is running");
// })


app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/config/paypal', (req, res) => res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

  
  app.use(notFound);
  app.use(errorHandler);

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));