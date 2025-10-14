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
import { useParams, useRouter } from "next/navigation";
// import qs from queryString
import qs from "query-string";

const DeleteMessageModal = () => {

    const {isOpen,onClose,type,data}=useModal();
 
  
   const isModalOpen=isOpen && type === "deleteMessage";
  
  const {apiUrl,query}=data;
//  const router=useRouter()
 const params=useParams()
 

  const [isLoading,setIsLoading]=useState(false)
  const url=qs.stringifyUrl({
    url:apiUrl || "",
    query
  })
  const onClick=async()=>{
    try {
        setIsLoading(true);
        
        await axios.delete(url)
        onClose()
       
        
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
            Delete Message
        </DialogTitle>
        <DialogDescription className="text-center text-zinc-500">
Are you sure you want to Delete this ? <br />
The message will be permanently deleted
        </DialogDescription >
     
     </DialogHeader>
<DialogFooter className="bg-gray-100 px-6 py-4 ">
<div className="flex items-center justify-between w-full ">
    <Button disabled={isLoading} onClick={onClose} variant="ghost">
Cancel
    </Button>
    <Button  disabled={isLoading} variant="primary" onClick={onClick} >
Confirm
    </Button>
</div>
</DialogFooter>
{/* Invite Modal */}
    </DialogContent>
        </Dialog>
     );
}
 
export default DeleteMessageModal;


