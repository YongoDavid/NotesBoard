import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import noteRoutes from './routes/noteRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();


//middleware
if(process.env.NODE_ENV !== "production") {
    app.use(
        cors({
        origin: "http://localhost:5173",
        })
    );
};
app.use(express.json()); // this middleware will parse JSON bodies:reqbody
app.use(rateLimiter);

app.use('/api/notes', noteRoutes);
// Serve react app as static 

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    });
}

// Best for production
connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log(`Server has started on PORT: `+ PORT);
}); 
})
