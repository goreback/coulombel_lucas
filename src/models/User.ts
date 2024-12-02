import {Schema, model, Document} from 'mongoose';

// Définir une interface
interface IUser extends Document {
    name: string;
    email: string;
    age: number;
    createdAt: Date;
}


// définir notre schéma
const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    age: {type: Number, required: true, min: 0},
    createdAt: {type: Date, default: Date.now}  
})

// Créer notre model
const User = model<IUser>('User', userSchema);

export default User