import mongoose from 'mongoose';

export const connectDB = async () => {
     try {
          await mongoose.connect(process.env.MONGODB_URI)
          console.log("DATABASE CONNECTED");
     } catch (error) {
          console.error("CANNOT CONNECT TO DATABASE :", error.message);
          process.exit(1);
     }
};
