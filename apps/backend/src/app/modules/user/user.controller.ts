import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status'

const getUsers = catchAsync(async(req,res)=>{
    const result= await UserServices.getUserFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User fetched successfully",
        data:result
    })
})

export const UserController={
    getUsers
}