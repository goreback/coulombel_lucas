import express, {Request, Response} from 'express';// 1
import mongoose from 'mongoose';//3
import projectsRoutes from './routes/projectsRoutes';
import tasksRoutes from './routes/tasksRoutes';
import dotenv from 'dotenv';//2
dotenv.config();



// Créer notre app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use('/api', projectsRoutes);
app.use('/api', tasksRoutes);


// connexion mongo
const uri = process.env.MONGO_URI;
mongoose.connect(uri as string)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

// ecoute sur le port 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})