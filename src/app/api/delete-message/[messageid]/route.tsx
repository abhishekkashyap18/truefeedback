import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth"
// import mongoose from "mongoose";


export async function DELETE(request:Request, {params}:{params: {messageid: string}}) {
    const messageId = params.messageid
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            sucess: false,
            message: "NOT Authenticated"
        }, {status: 401})
    }
    
    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            { $pull: {messages: {_id: messageId}}}
        )

        if(updateResult.modifiedCount == 0){
            return Response.json({
                sucess: false,
                message: "Message not found or already deleted"
            }, {status: 404})
        }

        return Response.json({
            sucess: true,
            message: "Deleted Message Successfully!"
        }, {status: 200})

    } catch (error) {
        console.log("Error in delete route",error);
        return Response.json({
            sucess: false,
            message: "Error deleting message"
        }, {status: 500})
    }

   
    
}