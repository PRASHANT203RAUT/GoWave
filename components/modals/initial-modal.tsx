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
const formSchema=z.object({
        name:z.string().min(1,{
            message:"server name is required."
        }),
        imageUrl:z.string().min(1,{
            message:"Server imaage is required"
        })
    })
const InitialModal = () => {
    const [isMounted,setIsMounted]=useState(false);
    const router=useRouter()
    useEffect(()=>{
        setIsMounted(true)
    },[])
    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:"",
        }
    })
    const isLoading=form.formState.isSubmitting;
  const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    // console.log(values)
    try {
        await axios.post("/api/servers",values)
        form.reset()
        router.refresh()
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
  }
  if(!isMounted){
    return null;
  }
    return ( 

        <Dialog open>
    <DialogContent className=" fixed inset-0 m-auto
      max-w-lg w-full
      max-h-[90vh] overflow-hidden
      bg-white text-black p-6
      rounded-lg shadow-lg
      flex flex-col ">
     <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
            Server mine
        </DialogTitle>
     <DialogDescription className="text-center text-zinc-500">
        Giver your server apersonality with a name and image
     </DialogDescription>
     </DialogHeader>
<Form {...form}>
<form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
<div className="space-y-8 px-8">
    <div className="flex items-center justify-center text-center">
        <FormField control={form.control} name="imageUrl" render={({field})=>(
            <FormItem>
               <FormControl>
               <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange} >

               </FileUpload>
               </FormControl>
            </FormItem>
        )}/>
    </div>
  <FormField control={form.control} name="name" render={({field})=>(
    <FormItem>
        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
        Server name
        </FormLabel>
        <FormControl>
            <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="enter server name" {...field}/>
        </FormControl>
        <FormMessage/>
    </FormItem>
  )}></FormField>
</div>
<DialogFooter className="bg-gray-100 px-6 py-4">
    <Button disabled={isLoading} variant="primary">
Create
    </Button>
</DialogFooter>
</form>
</Form>
    </DialogContent>
        </Dialog>
     );
}
 
export default InitialModal;


