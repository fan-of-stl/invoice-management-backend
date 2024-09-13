const express = require('express')
const cors  = require('cors')

const dotenv = require('dotenv')
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoiceRoutes');
const  invoiceRoutesPostgres = require('./routes/invoiceRoutesPostgres')

dotenv.config();

const PORT =  process.env.PORT || 5000

// Connect to MongoDB
connectDB.connectMongoDB()
connectDB.connectPostgresDB();

const app = express()
//middleware for cors
app.use(cors());


// Middleware for parsing JSON
app.use(express.json());

// Invoice Routes
app.use('/api/invoices', invoiceRoutes);

// Invoice Routes postgres
app.use('/postgres/api/invoices', invoiceRoutesPostgres);



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})