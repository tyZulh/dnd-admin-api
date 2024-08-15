import { Document } from 'mongoose';

export interface ICreature extends Document {
  readonly name: string;
}
