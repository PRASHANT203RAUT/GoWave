"use client"
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogTitle,DialogHeader } from "../ui/dialog";
import { getRandomValues } from "crypto";
import { Form,FormMessage,FormControl,FormField,FormItem,FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Island_Moments } from "next/font/google";
import { useEffect, useState } from "react";
import FileUpload from "../file-upload";
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import qs from "query-string"
const formSchema=z.object({
       
        fileUrl:z.string().min(1,{
            message:"Attachment is required"
        })
    })
const MessageFileModal = () => {
    const {isOpen,onClose,type,data}=useModal();
    const isModalOpen=isOpen && type ==="messageFile";
    const {apiUrl,query}=data
    const router=useRouter()
    
    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
           
            fileUrl:"",
        }
    })

    const handleClose = ()=>{
        form.reset()
        onClose()

    }
    const isLoading=form.formState.isSubmitting;
  const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    // console.log(values)
    try {
        const url=qs.stringifyUrl({
            url:apiUrl ||"",
            query
        })
        await axios.post(url,{...values,content:values.fileUrl})
        form.reset()
        router.refresh()
        handleClose()
    } catch (error) {
        console.log(error)
    }
  }

    return ( 

        <Dialog open={isModalOpen} onOpenChange={handleClose}>
    <DialogContent className=" fixed inset-0 m-auto
      max-w-lg w-full
      max-h-[90vh] overflow-hidden
      bg-white text-black p-6
      rounded-lg shadow-lg
      flex flex-col ">
     <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
            Add an Attachment
        </DialogTitle>
     <DialogDescription className="text-center text-zinc-500">
        Giver your server apersonality with a name and image
     </DialogDescription>
     </DialogHeader>
<Form {...form}>
<form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
<div className="space-y-8 px-8">
    <div className="flex items-center justify-center text-center">
        <FormField control={form.control} name="fileUrl" render={({field})=>(
            <FormItem>
               <FormControl>
               <FileUpload endpoint="messageFile" value={field.value} onChange={field.onChange} >

               </FileUpload>
               </FormControl>
            </FormItem>
        )}/>
    </div>
 
</div>
<DialogFooter className="bg-gray-100 px-6 py-4">
    <Button disabled={isLoading} variant="primary">
SEND
    </Button>
</DialogFooter>
</form>
</Form>
    </DialogContent>
        </Dialog>
     );
}
 
export default MessageFileModal;


