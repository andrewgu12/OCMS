// Interface for User Schema
import { Document } from "mongoose";

export interface IUserModel extends Document {
  username: string;
  hash: string;
  salt: string;
  setPassword(): void;
  validPassword( password: string ): boolean;
}