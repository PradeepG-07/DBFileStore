export default class ApiResponse{
    status;
    success;
    data;
    message;
    constructor(statusCode,data=null,message=null){
        this.success=true;
        this.status=statusCode;
        this.data=data;
        this.message = message;
    }
    
}