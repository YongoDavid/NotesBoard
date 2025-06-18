import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import noteRoutes from './routes/noteRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


//middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json()); // this middleware will parse JSON bodies:reqbody
app.use(rateLimiter);

app.use('/api/notes', noteRoutes);

// Best for production
connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log(`Server has started on PORT: `+ PORT);
}); 
})
