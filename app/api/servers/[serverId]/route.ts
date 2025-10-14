import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

// export async function PATCH(req:Request,{params}:{params:{serverId:string}}) {
//     try {
//         const profile=await currentProfile();
//         const {name,imageUrl}=await req.json()
//         if(!profile){
//             return new NextResponse("Unauthorized",{status:401})
//         }
//         const server =await db.server.update({
//             where:{
//   id:params.serverId,
//   profileId:profile.id
//             },
//             data:{
//                 name,imageUrl
//             }
//         })
//   return NextResponse.json(server)
        
//     } catch (error) {
//         console.log("[serverID patch]",error)
//         return new NextResponse("Internal error",{status:500})
//     }
    
// }
// export async function DELETE(req:Request,{params}:{params:{serverId:string}}) {
//     try {
//         const profile=await currentProfile();
//         if(!profile){
//             return new NextResponse("Unauthorized",{status:401})
//         }
//         const server =await db.server.delete({
//             where:{
//   id:params.serverId,
//   profileId:profile.id
//             },
           
//         })
//   return NextResponse.json(server)
        
//     } catch (error) {
//         console.log("[serverID delete error]",error)
//         return new NextResponse("Internal error",{status:500})
//     }
    
// }

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
        channels: true,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[serverID patch]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    console.log("params id in delete",params.serverId)
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
   
    // Fetch server to validate ownership
    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    if (server.profileId !== profile.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete server
    await db.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json({ message: "Server deleted successfully" });
  } catch (error: any) {
    console.error("[SERVER DELETE ERROR]", error);

    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const server = await db.server.findUnique({
      where: { id: params.serverId },
      include: {
        members: {
          include: { profile: true },
        },
        channels: true,
      },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER GET ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}