import { ResponsePagination } from "src/interface";
import { ResponseSuccessPts } from "src/interface/response_pts_interface";

class BaseResponsePts {
    _success (msg : string , data? : any) : ResponseSuccessPts{
        return {
            status : "success",
            msg : msg,
            data : data || {},
        };
    }

    _pagination(
    message : string ,
    data : any ,
    total : number ,
    page :number ,
    pageSize : number 
    ) : ResponsePagination {
        return {
            status : "succes",
            msg : message,
            data : data || {},
            pagination : {
                total : total ,
                page : page,
                pageSize : pageSize,
                totalPage : Math.ceil(total/pageSize)
            }
        }
    }
}

export default BaseResponsePts