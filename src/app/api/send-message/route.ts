import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

import { Message } from "@/model/user.model";

export async function POST(request:Request) {
    await dbConnect()

    const { username, content } = await request.json()

    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                sucess: false,
                message: "user not found"
            }, {status: 404})
        }

        //is user accepting the messages
        if(!user.isAcceptingMessage){
            return Response.json({
                sucess: false,
                message: "user not accepting messages"
            }, {status: 403})
        }

        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            sucess: true,
            message: "message send successfully"
        }, {status: 200})
        
    } catch (error) {
        console.log("error adding messages ", error);
        return Response.json({
            sucess: false,
            message: "Internal server error"
        }, {status: 500})
    }
    
}