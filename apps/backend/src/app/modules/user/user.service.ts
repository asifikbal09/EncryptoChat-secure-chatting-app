import { User } from "./user.model"

const getUserFromDB = async()=>{
    const result = await User.find().select('-password -privateKey')
    return result
}

export const UserServices = {
    getUserFromDB
}