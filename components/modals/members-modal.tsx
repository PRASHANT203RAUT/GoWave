// "use client"

// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogHeader } from "../ui/dialog";
// import { getRandomValues } from "crypto";

// import { Island_Moments } from "next/font/google";
// import { useEffect, useState } from "react";
// ;
// import { useModal } from '@/hooks/use-modal-store';
// import qs from "query-string"
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// import { Check, Copy, Gavel, Loader2, MoreVertical, RefreshCw, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
// import { useOrigin } from "@/hooks/use-origni";
// import axios from "axios";
// import { ServerWithMembersWithProfiles } from "@/types";
// import { ScrollArea } from "../ui/scroll-area";
// import { UserAvatar } from "../user-avatar";
// import {
//     DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator
//     , DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger
// } from "../ui/dropdown-menu";
// import { MemberRole } from "@prisma/client";
// import { useRouter } from "next/navigation";

// const MemberModal = () => {
//     const router=useRouter()

//     const { isOpen, onOpen, onClose, type, data } = useModal();
//     const [loadingId, setLoadingId] = useState("")


//     const isModalOpen = isOpen && type === "members";

//     const { server } = data as { server: ServerWithMembersWithProfiles };

//     const roleIconMap = {
//         "GUEST": null,
//         "MODERATOR": <ShieldCheck className="h-4 w4 ml-2 text-indigo-500" />,
//         "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
//     }


//     // const onNew=async()=>{
//     //     try {
//     //         setIsLoading(true)
//     //         const response=await axios.patch(`/api/servers/${server?.id}/invite-code`)
//     //         onOpen("invite",{server:response.data})
//     //     } catch (error) {
//     //         console.log(error)
//     //     }finally{
//     //         setIsLoading(false)ee
//     //     }
//     // }
//     const onKick =async (memberId:string)=>{
// try {
//     setLoadingId(memberId);
//     const url=qs.stringifyUrl({
//         url:`/api/members/${memberId}`,
//         query:{
//             serverId:server?.id,
//         }
//     })
//     const response=await axios.delete(url)
//     router.refresh();
//     onOpen("members",{server:response.data})
    
// } catch (error) {
//    console.log(error) 
// }finally{
//     setLoadingId("")
// }
    
//     }
//     const onRoleChange=async(memberId:string,role:MemberRole)=>{
//         try {
//             setLoadingId(memberId)
//             const url=qs.stringifyUrl({
//                 url:`/api/members/${memberId}`,
//                 query:{
//                     serverId:server?.id,
                  
//                 }
//             })
//             const response=await axios.patch(url,{role});

//         router.refresh();
//         onOpen("members",{server:response.data})
//         } catch (error) {
//             console.log(error)
//         }finally{
//             setLoadingId("")
//         }

//     }
//     return (

//         <Dialog
//             open={isModalOpen}
//             // 
//             onOpenChange={onClose}
//         >
//             <DialogContent className=" fixed inset-0 m-auto
//       max-w-lg w-full
//       max-h-[40vh] overflow-hidden
//       bg-white text-black p-6
//       rounded-lg shadow-lg
//       flex flex-col ">
//                 <DialogHeader className="pt-8 px-6">
//                     <DialogTitle className="text-2xl text-center font-bold">
//                         Manage Members
//                     </DialogTitle>
//                     <DialogDescription className="text-center text-zinc-500">
//                         {server?.members?.length} Members
//                     </DialogDescription >

//                 </DialogHeader>

//                 <ScrollArea className="mt-8 max-h-[420px] pr-6 ">
//                     {server?.members?.map((member) => (
//                         <div key={member.id} className="flex items-center gap-x-2 mb-6" >
//                             <UserAvatar src={member.profile.imageUrl} />
//                             <div className="flex flex-col gap-y-1 ">
//                                 <div className="text-xs font-semibold flex items-center gap-x-1">
                                   
//                                     {member.profile.name}
//                                     {roleIconMap[member.role]}
//                                 </div>
//                                 <p className="text-xs text-zinc-500">
//                                     {member.profile.email}
//                                 </p>

//                             </div>
//                             {server.profileId !== member.profileId && loadingId !== member.id} 
//                             <div className="ml-auto">
//                                 <DropdownMenu>
//                                     <DropdownMenuTrigger>
//                                         <MoreVertical className="h-4 w-4 text-zinc-500" />
//                                     </DropdownMenuTrigger>
//                                     <DropdownMenuContent side="left">
//                                         <DropdownMenuSub>
//                                             <DropdownMenuSubTrigger className="flex items-center">
//                                                 <ShieldQuestion className="w-4 h-4 mr-2" />
//                                                 <span>Role</span>
//                                             </DropdownMenuSubTrigger>
//                                             <DropdownMenuPortal>
//                                                 <DropdownMenuSubContent>
//                                                     <DropdownMenuItem onClick={()=>onRoleChange(member.id,"GUEST")}>
//                                                         <Shield className="h-4 w-4 mr-2" />
//                                                         Guest
//                                                         {
//                                                             member.role === "GUEST" && (
//                                                                 <Check className="h-4 w-4 ml-auto" />
//                                                             )

//                                                         }
//                                                     </DropdownMenuItem>
//                                                     <DropdownMenuItem onClick={()=>onRoleChange(member.id,"MODERATOR")}>
//                                                         <Shield className="h-4 w-4 mr-2" />
//                                                         Moderator
//                                                         {
//                                                             member.role === "MODERATOR" && (
//                                                                 <Check className="h-4 w-4 ml-auto" />
//                                                             )

//                                                         }
//                                                     </DropdownMenuItem>
//                                                 </DropdownMenuSubContent>
//                                             </DropdownMenuPortal>
//                                         </DropdownMenuSub>
//                                         <DropdownMenuSeparator />
//                                         <DropdownMenuItem onClick={()=>onKick(member.id)}>
//                                             <Gavel className="h-4 w-4 mr-2" />

//                                             Kick
//                                         </DropdownMenuItem>
//                                     </DropdownMenuContent>
//                                 </DropdownMenu>
//                             </div>
                            
//                             {
//                                loadingId === member.id && (
//                                 <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>
//                                )
//                             }
//                         </div>
//                     ))}

//                 </ScrollArea>
//                 {/* Invite Modal */}
//             </DialogContent>
//         </Dialog>
//     );
// }

// export default MemberModal;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import axios from "axios";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";

import {
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Gavel,
  Check,
  Loader2
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";

const roleIcons = {
  GUEST: <Shield className="w-4 h-4 ml-2 text-gray-400" />,
  MODERATOR: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />
};

const MemberModal = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const currentUserId = server?.profileId;

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id }
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id }
      });

      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  // Add safety check for server and members
  if (!server || !server.members) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server.members.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] px-6">
          {server.members.map((member) => {
            // Debug logging
            console.log("Member object:", member);
            console.log("Member profile:", member.profile);
            console.log("Member name:", member.profile?.name);
            console.log("Member email:", member.profile?.email);
            console.log("Member imageUrl:", member.profile?.imageUrl);
            
            const isCurrentUser = currentUserId === member.profileId;
            const isAdmin = member.role === "ADMIN";

            return (
              <div key={member.id} className="flex items-center gap-x-2 mb-6">
                {/* Avatar with fallback */}
                <UserAvatar 
                  src={member.profile?.imageUrl || ""} 
                  className="h-8 w-8"
                />

                {/* Member info - fixed layout */}
                <div className="flex flex-col gap-y-1 min-w-0 flex-1">
                  <div className="text-xs font-semibold flex items-center">
                    <span className="truncate">
                      {member.profile?.name || "Unknown User"}
                    </span>
                    {roleIcons[member.role]}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {member.profile?.email || "No email"}
                  </p>
                </div>

                {/* Actions */}
                {!isCurrentUser && !isAdmin && loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <MoreVertical className="w-4 h-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "MODERATOR")}
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {loadingId === member.id && (
                  <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                )}
              </div>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;