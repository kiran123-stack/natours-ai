import mongoose, { Document, Schema } from 'mongoose';

// 1. Create an Interface representing a document in MongoDB.
export interface ITour extends Document {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt: Date;
  startDates: Date[];
}

// 2. Create the Schema corresponding to the document interface.
const tourSchema = new Schema<ITour>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // Validator with error message
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult',
    },
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // Don't send this to client by default
  },
  startDates: [Date],
});

// 3. Create and Export the Model
const Tour = mongoose.model<ITour>('Tour', tourSchema);

export default Tour;