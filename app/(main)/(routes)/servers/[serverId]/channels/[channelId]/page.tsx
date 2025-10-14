// import ChatHeader from "@/components/chat/chat-header";
// import ChatInput from "@/components/chat/chat-input";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { RedirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// interface ChannelIdPageProps{
//     params:{
//         serverId:string;
//         channelId:string;
//     }
// }

// const ChannelIdPage = async({
//     params
// }:ChannelIdPageProps) => {
//   const { serverId, channelId } = await params;
//     const profile=await currentProfile();
//     if(!profile){
//         // return RedirectToSignIn({})/
//         redirect("/sign-in");
//     }
//     const channel=await db.channel.findUnique({
//         where:{
//             id:params.channelId,
//         }
//     })
//     const member=await db.member.findFirst({
//         where:{
//             serverId:params.serverId,
//             profileId:profile.id
//         }
//     })
//     if(!channel ||!member){
//         redirect("/")
//     }
// return (
//   <div className="bg-white dark:bg-[#313338] flex flex-col h-full max-h-screen">
//     <ChatHeader
//       name={channel.name}
//       serverId={channel.serverId}
//       type="channel"
//     />

//     <div className="flex-grow overflow-y-auto px-4 py-2">
//       Future Messages
//       {/* Your messages list */}
//     </div>

//     <div className="border-t border-gray-300 dark:border-gray-700 px-4 py-2">
//       <ChatInput
//         name={channel.name}
//         type="channel"
//         apiUrl="/api/socket/messages"
//         query={{
//           channelId: channel.id,
//           serverId: channel.serverId,
//         }}
//       />
//     </div>
//   </div>
// );


// }
 
// export default ChannelIdPage;






import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  // Await the params before using its properties
  const { serverId, channelId } = await params;
  
  const profile = await currentProfile();
  if (!profile) {
    // return RedirectToSignIn({})
    redirect("/sign-in");
  }
  
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    }
  });
  
  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id
    }
  });
  
  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full max-h-screen">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />

      {/* <div className="flex-grow overflow-y-auto px-4 py-2">
        Future Messages
       

      </div> */}
      {channel.type === ChannelType.TEXT && (
        <>
        <ChatMessages
      member={member}
      name={channel.name}
      chatId={channel.id}
      apiUrl="/api/messages"
      socketQuery={{
        channelId:channel.id,
        serverId:channel.serverId
      }}
      socketUrl="/api/socket/messages"
      paramKey="channelId"
      paramValue={channel.id}
      type="channel"
      
      />

        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
        />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
        chatId={channel.id}
        video={false}
        audio={true}
        />
      )}
       {channel.type === ChannelType.VIDEO && (
        <MediaRoom
        chatId={channel.id}
        video={true}
        audio={true}
        />
      )}
      
      
    </div>
  );
};

export default ChannelIdPage;










// import ChatHeader from "@/components/chat/chat-header";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { RedirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// interface ChannelIdPageProps {
//     params: {
//         serverId: string;
//         channelId: string;
//     };
// }

// const ChannelIdPage = async (props: Promise<ChannelIdPageProps>) => {
//     const { params } = await props; // ✅ Await props to get params

//     const profile = await currentProfile();
//     if (!profile) {
//         return RedirectToSignIn({});
//     }

//     const channel = await db.channel.findUnique({
//         where: {
//             id: params.channelId,
//         },
//     });

//     const member = await db.member.findFirst({
//         where: {
//             serverId: params.serverId,
//             profileId: profile.id,
//         },
//     });

//     if (!channel || !member) {
//         redirect("/");
//     }

//     return (
//         <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
//             <ChatHeader
//                 name={channel.name}
//                 serverId={channel.serverId}
//                 type="channel"
//             />
//         </div>
//     );
// };

// export default ChannelIdPage;
