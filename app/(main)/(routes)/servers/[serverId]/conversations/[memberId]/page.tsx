// import ChatHeader from "@/components/chat/chat-header";
// import { getOrCreateConversation } from "@/lib/conversation";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { RedirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// interface MemberIdPageProps{
//     params:{
//         memberId:string;
//         serverId:string;
//     }
// }

// const MemberIdPage = async({params}:MemberIdPageProps) => {
//     console.log("memberid page",params.serverId)
//     const profile=await currentProfile()
//     if(!profile){
//         // return  RedirectToSignIn({})
//          redirect("/sign-in");
//     }
//     const currentMember=await db.member.findFirst({
//       where:{
//         serverId:params.serverId,
//         profileId:profile.id,
//       } ,
//       include:{
//         profile:true
//       } 
//     })
//     if(!currentMember){
//         return redirect("/")
//     }

//     const conversation = await getOrCreateConversation(currentMember.id,params.memberId)
//     if(!conversation){
//         return redirect(`/servers/${params.serverId}`)

//     }
//     const {memberOne,memberTwo}=conversation
//     const otherMember=memberOne.profileId === profile.id?memberTwo:memberOne
    
//     return ( 
//     <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
//         <ChatHeader
//         imageUrl={otherMember.profile.imageUrl}
//         name={otherMember.profile.name}
//         serverId={params.serverId}
//         type="conversation"
//         />

//     </div> );
// }
 
// export default MemberIdPage;


// import ChatHeader from "@/components/chat/chat-header";
// import { getOrCreateConversation } from "@/lib/conversation";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";

// interface MemberIdPageProps {
//   params: {
//     memberId: string;
//     serverId: string;
//   };
// }

// const MemberIdPage = async ({ params }: MemberIdPageProps) => {
//   console.log("memberid page", params.serverId);

//   const profile = await currentProfile();

//   // ✅ Use server-side redirect instead of <RedirectToSignIn />
//   if (!profile) {
//     redirect("/sign-in"); // Customize your sign-in route if needed
//   }

//   const currentMember = await db.member.findFirst({
//     where: {
//       serverId: params.serverId,
//       profileId: profile.id,
//     },
//     include: {
//       profile: true,
//     },
//   });

//   if (!currentMember) {
//     redirect("/");
//   }

//   const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

//   if (!conversation) {
//     redirect(`/servers/${params.serverId}`);
//   }

//   const { memberOne, memberTwo } = conversation;
//   const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

//   return (
//     <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
//       <ChatHeader
//         imageUrl={otherMember.profile.imageUrl}
//         name={otherMember.profile.name}
//         serverId={params.serverId}
//         type="conversation"
//       />
//     </div>
//   );
// };

// export default MemberIdPage;








import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: Promise<{
    memberId: string;
    serverId: string;
  }>;
  searchParams: Promise<{
    video?: string;
  }>;
}


export default async function MemberIdPage({
  params,
  searchParams,
}: MemberIdPageProps) {
  const { memberId, serverId } = await params;
  const { video } = await searchParams; 

  const profile = await currentProfile();
  if (!profile) {
    return RedirectToSignIn({});
  }
  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: { profile: true },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) {
    return redirect(`/servers/${serverId}`);
  }

  const { memberOne, memberTwo } = conversation;
  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  const isVideo = video === "true";

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={serverId}
        type="conversation"
      />
      {isVideo ? (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      ) : (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{ conversationId: conversation.id }}
          />
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{ conversationId: conversation.id }}
          />
        </>
      )}
    </div>
  );
}



// export default MemberIdPage;