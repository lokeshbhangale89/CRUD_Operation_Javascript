
const express = require('express');
const bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes.js')
const connectDB = require('./db.js')
const cors = require('cors'); 

const app = express();
const PORT = 4000;
app.use(cors())

app.use(bodyParser.json());

connectDB()

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
