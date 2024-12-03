import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
dotenv.config();



// Créer notre app
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', authRoutes);


const uri = process.env.URI;
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})