import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

// 1. Interface (Type Definition)
export interface IUser extends Document {
  name: string;
  email: string;
  photo?: string;
  role: 'user' | 'guide' | 'lead-guide' | 'admin';
  password: string;
  passwordConfirm: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// 2. Schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // FIX IS HERE: Change 'this: IUser' to 'this: any'
      validator: function (this: any, el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});
  


// 3. Middlewares (Hooks)

// Encrypt password before saving
// Encrypt password before saving
userSchema.pre('save', async function () {
  // 1. If password is not modified, exit function immediately
  if (!this.isModified('password')) return;

  // 2. Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // 3. Delete passwordConfirm field
  this.passwordConfirm = undefined as any;
  
  // No need to call next()! Async functions resolve automatically.
});

// 4. Instance Method: Check if password is correct
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;