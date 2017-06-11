// Interface for User Schemas. Separate out the model interface from the user interface. 
import { Document } from "mongoose";

export interface IUser {
  username: string;
  hash: string;
  salt: string;
}

export interface IUserModel extends IUser, Document {
  setPassword(pass: string): void;
  validPassword(pass: string): boolean;
}