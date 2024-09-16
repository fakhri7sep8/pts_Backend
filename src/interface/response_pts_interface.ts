export interface ResponseSuccessPts {
    status : string ,
    msg : string ,
    data? : any ,
}

export interface ResponsePaginationPts extends ResponseSuccessPts{
    pagination : {
        total : number,
        page : number,
        pageSize : number,
        totalPage : number,
    }
}
