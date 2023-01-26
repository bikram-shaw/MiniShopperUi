import { Address } from "./Address";

export class User{
     firstName:string;
     lastName:string;
     emailId:string;
     password:string;
    constructor(
         firstName:string,
         lastName:string,
         emailId:string,
         password:string
    ){
this.firstName=firstName;
this.lastName=lastName;
this.emailId=emailId;
this.password=password;

    }
}