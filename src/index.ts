import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import User  from './models/User';




// Créer notre app
const app = express();
const PORT = 3000;

app.use(express.json());



const uri = "mongodb://root:example@localhost:27017/";
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error)
    })

// Route par défaut
app.get('/', (req: Request, res: Response) => {
    res.send('balbflasblfknag');
})

// Route pour créer un utilisateur
app.post('/users', async (req: Request, res: Response): Promise<any> => {
    try {   
    const {name, email, age} = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            message: 'Name, email and age are required'
        })
    }
    const newUser = new User({name, email, age});
    const savedUser = await newUser.save();
    res.status(201).json({
        message: 'User created successfully',
        user: savedUser})
}
    catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message : 'Cette adresse email existe deja'
            })
        }
        console.log(error)
        return res.status(500).json({
            message: 'Error creating user',
            error: error.message
        })
}})





app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})