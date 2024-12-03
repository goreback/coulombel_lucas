import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

// Définir une interface
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    age: number;
    createdAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
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
    password: {type: String, required: true},
    age: {type: Number, required: true, min: 0},
    createdAt: {type: Date, default: Date.now}  
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

// Créer notre model
const User = model<IUser>('User', userSchema);

export default User