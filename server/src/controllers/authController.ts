import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modals/userModal';

// Helper function to create JWT Token
const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super-secret-key', {
    expiresIn: '90d',
  });
};

export const signup = async (req: Request, res: Response) => {
  try {
    // We only allow specific fields for security (prevent malicious admins)
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // Create Token
   const token = signToken((newUser._id as any).toString());
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};

// ... imports and signup function are above ...

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }

    // 2. Check if user exists && password is correct
    // We explicitly select the password because we hid it in the model (select: false)
    const user = await User.findOne({ email }).select('+password');

    // we use the method 'matchPassword' we created in userModel.ts
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    // 3. If everything ok, send token to client
    const token = signToken((user._id as any).toString());

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};