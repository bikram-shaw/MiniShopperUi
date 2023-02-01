export class ApiResponse<T>{
    isSuccess:boolean;
    data:T;
    message:string

    constructor(isSuccess:boolean,data:T,message:string){
        this.isSuccess=isSuccess;
        this.data=data;
        this.message=message;
    }
}