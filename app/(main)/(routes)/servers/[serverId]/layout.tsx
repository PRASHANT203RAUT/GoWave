import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// const ServerIdLayout =async ({children,params}: {
//   children: React.ReactNode;
//   params: { serverId: string };
// }) => {

//     const profile=await currentProfile();
//     if(!profile){
//         return RedirectToSignIn({})

//     }
//     // const server=await db.server.findUnique({
//     //     where:{
//     //         id:params.serverId,
//     //         members:{
//     //             some:{
//     //                 profileId:profile.id
//     //             }
//     //         }
//     //     }
//     // })
    
//     console.log("params hellow ",params)
    
//     const server = await db.server.findFirst({
//   where: {
//     id: params.serverId,           // filter by server ID
//     members: {
//       some: {
//         profileId: profile.id     // filter by membership
//       }
//     }
//   }
// });
// // console.log(server)
//     console.log("paramsId",params)

//     if(!server){
//         return redirect("/")
//     }
//     return (
//         <div className="h-full">
//             <div className=" md:flex  h-full w-60 z-20 flex-col fixed inset-y-0">

//                  <ServerSidebar
//                  serverId={params.serverId} 
//                   />
//             </div>
          
           
//            <main className="h-full md:pl-60">

//             {children}

//            </main>
//         </div>
//       );
// }
 
// export default ServerIdLayout;






const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) => {
  const { serverId } = await params;

  const profile = await currentProfile();
  if (!profile) {
    return RedirectToSignIn({});
  }

  const server = await db.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;

