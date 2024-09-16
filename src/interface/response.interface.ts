export interface ResponseSuccess {
    status : string ,
    msg : string ,
    data? : any ,
}

export interface ResponsePagination extends ResponseSuccess{
    pagination : {
        total : number,
        page : number,
        pageSize : number,
        totalPage : number,
    }
}
