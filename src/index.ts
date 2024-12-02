import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';




// Créer notre app
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', userRoutes);


const uri = "mongodb://root:example@localhost:27017/";
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})