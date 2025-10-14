// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { RedirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// // import { redirect } from "next/dist/server/api-utils";

// interface ServerIdPageProps{
//     params:{
//         serverId:string;
//     }
// }

// const ServerIdPage = async({params}:ServerIdPageProps) => {
//     const profile=await currentProfile()
//     if(!profile){
//         // return RedirectToSignIn({});
//         redirect("/sign-in");
//     }
//     const server=await db.server.findUnique({
//         where:{
//             id:params.serverId,
//             members:{
//                 some:{
//                     profileId:profile.id,
//                 }
//             }
//         },
//         include:{
//             channels:{
//                 where:{
//                     name:"general"
//                 },
//                 orderBy:{
//                     createdAt:"asc"
//                 }
//             }
//         }

//     })
//     const initialChannel=server?.channels[0]
//     if(initialChannel?.name!=="general"){
//         return null
//     }
//     return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
// }
 
// export default ServerIdPage;

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const awaitedParams = await params;  // <--- Await params here

  const profile = await currentProfile();
  if (!profile) {
    redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: awaitedParams.serverId,  // <--- use awaitedParams here
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/servers/${awaitedParams.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
