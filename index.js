const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const cors = require('cors'); // Import CORS

// Use CORS middleware for all routes
app.use(cors());

// File upload middleware
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Parse JSON in request body
app.use(cookieParser());

require('./config/db').dbConnect();
require('./config/cloudinary').cloudinaryConnect();

// Import Routes and mount
const user = require('./routes/user');
app.use('/api/v1', user);

// Activate the server
app.listen(PORT, () => {
  console.log(`App is activated at PORT ${PORT}`);
});
