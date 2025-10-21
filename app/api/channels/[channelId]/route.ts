// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { MemberRole } from "@prisma/client";
// import { NextResponse } from "next/server";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { memberId: string } }
// ) {
//   const profile = await currentProfile();
//   const { memberId } = params;
//   const url = new URL(req.url);
//   const serverId = url.searchParams.get("serverId");

//   if (!profile) return new NextResponse("Unauthorized", { status: 401 });
//   if (!serverId) return new NextResponse("ServerId missing", { status: 400 });
//   if (!memberId) return new NextResponse("MemberId missing", { status: 400 });

//   try {
//     const server = await db.server.update({
//       where: {
//         id: serverId,
//         profileId: profile.id,
//       },
//       data: {
//         members: {
//           deleteMany: {
//             id: memberId,
//             profileId: {
//               not: profile.id,
//             },
//           },
//         },
//       },
//       include: {
//         members: {
//           include: { profile: true },
//           orderBy: { role: "asc" },
//         },
//       },
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.error("[Member DELETE Error]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
// export async function PATCH(req:Request,{params}:{params:{channelId:string}}) {
//    try {
//     const profile=await currentProfile();
//     const {name,type}=await req.json()
//     const {searchParams}=new URL(req.url);
//     const serverId=searchParams.get("serverId");
//     if(name==="general"){
//       return new NextResponse("name cannot be general",{status:400})  
//     }
//     if(!profile){
//         return new NextResponse("Unauthorized",{status:400})
//     }
//      if(!serverId){
//         return new NextResponse("ServerId missing",{status:400})
//     }
//      if(!params.channelId){
//         return new NextResponse("Channel Id missing",{status:400})
//     }
    
//     const server= await db.server.update({
//         where:{
//             id:serverId,
//                 members:{
//                 some:{
//                     profileId:profile.id,
//                     role:{
//                         in:[MemberRole.ADMIN,MemberRole.MODERATOR]
//                     }
//                 }
//             }
            
//         },
//         data:{
//             channels:{
//                 update:{
//                     where:{
//                         id:params.channelId,
//                         NOT:{
//                             name:"general",
//                         }
//                     },
//                     data:{
//                         name,type
//                     }
//                 }
//             }
//         }
//     })
//     return NextResponse.json(server);
//    } catch (error) {
//     console.log("[Channel_Id_PATCH_error]",error);
//     return new NextResponse("Internal error",{status:500})
//    } 
    
// }

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

// DELETE handler
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    const { channelId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("ServerId missing", { status: 400 });
    }
    if (!channelId) {
      return new NextResponse("Channel Id missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[Channel_Id_Delete_error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH handler
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    const { channelId } = await params;

    if (name === "general") {
      return new NextResponse("name cannot be general", { status: 400 });
    }
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("ServerId missing", { status: 400 });
    }
    if (!channelId) {
      return new NextResponse("Channel Id missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[Channel_Id_PATCH_error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
