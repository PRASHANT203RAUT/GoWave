// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { DirectMessage, Message } from "@prisma/client";
// import { NextResponse } from "next/server";

// const MESSAGES_BATCH=20;
// export async function GET(req:Request) {
//     try {
//         const {userId}=await auth()
//         const profile = await currentProfile()
//         const {searchParams}=new URL(req.url)
//         const cursor=searchParams.get("cursor")
//        const conversationId = searchParams.get("conversatoinId")

//         if(!profile){
//             return new NextResponse("unauthorized",{status:401})
//         }
//           if(!conversationId){
//             return new NextResponse("channel id is missing",{status:401})
//         }
//         let messages:DirectMessage[]=[];
//         if(cursor){
//             messages=await db.directMessage.findMany({
//                 take:MESSAGES_BATCH,
//                 skip:1,
//                 cursor:{
//                     id:cursor,
//                 },
//                 where:{
//                     conversationId,
//                 },
//                 include:{
//                     member:{
//                         include:{
//                             profile:true
//                         },
//                     }
//                 },
//                 orderBy:{
//                     createdAt:"desc"
//                 }

//             })
//         }
//         else{
//             messages=await db.directMessage.findMany({
//                 take:MESSAGES_BATCH,
//                 where:{
//                     conversationId
//                 },
//                 include:{
//                     member:{
//                         include:{
//                             profile:true
//                         }
//                     }
//                 },
//                 orderBy:{
//                     createdAt:"desc"
//                 }
//             })
//         }
//         let nextCursor =null
//         if(messages.length===MESSAGES_BATCH){
//             nextCursor=messages[MESSAGES_BATCH-1].id
//         }
//         return NextResponse.json({items:messages,nextCursor});
//     } catch (error) {
//      console.log("[DIRECT_MESSAGES_ERROR]",error);
//      return new NextResponse("Internal Error",{status:500})   
//     }
    
// }


import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { DirectMessage } from "@prisma/client";
import { NextResponse } from "next/server"

const MESSAGES_BATCH = 20;

export async function GET(
    req: Request
) {
    try {

        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse("conversation ID missing", { status: 400 });
        }

        let messages: DirectMessage[] = [];

        if (cursor) {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        } else {
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
        }

        let nextCursor = null;

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        

        return NextResponse.json({
            items: messages,
            nextCursor,
        });

        

    } catch (error) {
        console.log("[DIRECT_MESSAGES_GET]", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}