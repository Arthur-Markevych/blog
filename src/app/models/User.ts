import { Post } from "./Post";
import * as firebase from 'firebase/app';

export interface User {
    uid?:string;
    displayName?:string,
    firstname?:string | null,
    lastname?:string | null,
    email:string,
}