export default class ApiError{
    status;
    success;
    error;
    message;
    constructor(statusCode,error=null,message=null){
        this.success=false;
        this.status=statusCode;
        this.error=error;
        this.message = message;
    }
    
}