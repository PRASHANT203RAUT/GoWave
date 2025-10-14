"use client"

import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogTitle,DialogHeader } from "../ui/dialog";
import { getRandomValues } from "crypto";

import { Island_Moments } from "next/font/google";
import { useEffect, useState } from "react";
;
import { useModal } from '@/hooks/use-modal-store';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origni";
import axios from "axios";

const InviteModal = () => {

    const {isOpen,onOpen,onClose,type,data}=useModal();
    const origin=useOrigin()
 
  
   const isModalOpen=isOpen && type === "invite";
  
  const {server}=data;

  const  inviteUrl=`${origin}/invite/${server?.inviteCode}`
 
  const [copied,setCopied]=useState(false)

  const [isLoading,setIsLoading]=useState(false)

  const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(()=>{
        setCopied(false)
    },1000)
  }
const onNew=async()=>{
    try {
        setIsLoading(true)
        const response=await axios.patch(`/api/servers/${server?.id}/invite-code`)
        onOpen("invite",{server:response.data})
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
}
    return ( 

 <Dialog
  open={isModalOpen}
// 
onOpenChange={onClose}
>
    <DialogContent className=" fixed inset-0 m-auto
      max-w-lg w-full
      max-h-[40vh] overflow-hidden
      bg-white text-black p-6
      rounded-lg shadow-lg
      flex flex-col ">
     <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
            Invite Peoples / Friend
        </DialogTitle>
     
     </DialogHeader>
<div className="p-6">
   <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
    Server invite link
   </Label>
   <div className="flex items-center mt-2 gap-x-2">
   {/* <Input
  className="bg-zinc-400/50 text-black border-none focus-visible:ring-0 focus-visible:ring-offset-0"
  value="invite-link"
/> */}

    <Input disabled={isLoading} className="!bg-zinc-400/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteUrl}/>
   <Button disabled={isLoading} onClick={onCopy}  size="icon">
   { copied?<Check className="w-4 h-4"/>:
<Copy className="w-4 h-4"/>}

   </Button>
   
   </div>
   <Button onClick={onNew} disabled={isLoading} variant="link" size="sm" className="text-xs text-zinc-500 mt-4">
    Generate a new link
    <RefreshCw className="w-4 h-4 ml-2"/>
   </Button>
   
</div>
{/* Invite Modal */}
    </DialogContent>
        </Dialog>
     );
}
 
export default InviteModal;


