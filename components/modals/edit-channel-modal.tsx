"use client"
import qs from "query-string"
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
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

import { Select,SelectContent,SelectItem ,SelectTrigger,SelectValue} from '../ui/select';
import { ChannelType } from '@prisma/client';
const formSchema=z.object({
        name:z.string().min(1,{
            message:"server name is required."
        }).refine(
            name=>name!=="general",
            {
                message:"Channel name cannot be 'general'"
            }
        ),
        type:z.nativeEnum(ChannelType)
       
    })
const EditChannelModal = () => {

    const {isOpen,onClose,type,data}=useModal();
    const router=useRouter()
  const {channel,server}=data;
   const params=useParams()

   const isModalOpen=isOpen && type === "editChannel";

    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            type:  channel?.type||ChannelType.TEXT
           
        }
    })
    useEffect(()=>{
// if(channelType){
//     form.setValue("type",channelType);
// }else{
//     form.setValue("type",ChannelType.TEXT);

// }
if(channel){
   form.setValue("name",channel.name);
   form.setValue("type",channel.type) 
}


    },[form,channel])
    const isLoading=form.formState.isSubmitting;
  const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    // console.log(values)
    try {
        const url=qs.stringifyUrl({
            url:`/api/channels/${channel?.id}`,
            query:{
                serverId:server?.id
            }
        })
        await axios.patch(url,values)
        form.reset()
        router.refresh()
        onClose()
    } catch (error) {
        console.log(error)
    }
  }
  const handleClose=()=>{
     form.reset();
     onClose();
  }

    return ( 

 <Dialog
  open={isModalOpen}
  onOpenChange={(open) => {
    if (!open) handleClose();  // close when Dialog requests to close
  }}
>
    <DialogContent className=" fixed inset-0 m-auto
      max-w-lg w-full
      max-h-[90vh] overflow-hidden
      bg-white text-black p-6
      rounded-lg shadow-lg
      flex flex-col ">
     <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
           Edit Channel
        </DialogTitle>
    
     </DialogHeader>
<Form {...form}>
<form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
<div className="space-y-8 px-8">
    
  <FormField control={form.control} name="name" render={({field})=>(
    <FormItem>
        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
        Channel name
        </FormLabel>
        <FormControl>
            <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Enter Channel name" {...field}/>
        </FormControl>
        <FormMessage/>
    </FormItem>
  )}></FormField>
  <FormField
  control={form.control} name="type"
  render={({field})=>(
    <FormItem>
  <FormLabel>
    Channel Type
  </FormLabel>
  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
<FormControl>
    <SelectTrigger
    className='bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none'
    >
        <SelectValue placeholder="Select a channel type"/>

    </SelectTrigger>
</FormControl>
<SelectContent>
    {Object.values(ChannelType).map((type)=>(
        <SelectItem key={type} value={type} className='capitalize'>
           {type.toLowerCase()}
        </SelectItem>
    ))}
</SelectContent>
  </Select>
    </FormItem>
  )}
  />

</div>
<DialogFooter className="bg-gray-100 px-6 py-4">
    <Button disabled={isLoading} variant="primary">
Save
    </Button>
</DialogFooter>
</form>
</Form>
    </DialogContent>
        </Dialog>
     );
}
 
export default EditChannelModal;


