import mongoose, { Document, Schema } from 'mongoose';

export interface Ingredient extends Document {
    name: String,
    quantity: String,
    secret: Boolean
}

const schema = new Schema({
  name: { type: String, require: true },
  quantity: { type: String, require: true },
  secret: { type: Boolean, require: false },
});

export const Ingredient = mongoose.model<Ingredient>('Ingredient', schema);