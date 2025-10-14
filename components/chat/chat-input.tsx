"use client";

import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import { Form,FormControl,FormField,FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Plus, Smile } from "lucide-react";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";
import { useRouter } from "next/navigation";

interface ChatInputProps{
    apiUrl:string;
    query:Record<string,any>;
    name:string;
    type:"conversation"|"channel"
}

const formSchema=z.object({
    content:z.string().min(1),

})
const ChatInput = ({apiUrl,query,name,type}:ChatInputProps) => {

    const {onOpen}=useModal()
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            content:"",
        }
    })


const router=useRouter()
const isLoading=form.formState.isSubmitting;
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
try {
    const url=qs.stringifyUrl({
        url:apiUrl,
        query
    });
    await axios.post(url,values);
    form.reset();
    router.refresh()
    
} catch (error) {
    console.log(error)
    
}}
    return (


<Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#313338]"
  >
    <div className="flex items-center gap-3 w-full">
      {/* Plus Button */}
      <button
        onClick={() => onOpen("messageFile", { apiUrl, query })}
        type="button"
        className="h-10 w-10 bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full flex items-center justify-center shrink-0"
      >
        <Plus className="text-white dark:text-[#313338] w-5 h-5" />
      </button>

      {/* Input + EmojiPicker */}
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem className="relative w-full">
            <FormControl>
              <Input
                {...field}
                placeholder={`Message #${name}`}
                disabled={isLoading}
                className="bg-gray-100 dark:bg-[#202225] h-10 pl-4 pr-12"
              />
            </FormControl>

            {/* Emoji Picker */}
            <div className="absolute right-3 top-1.5 -translate-y-1/2 flex items-center justify-center h-5 w-5">
  <EmojiPicker
    onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
  />
</div>

          </FormItem>
        )}
      />
    </div>
  </form>
</Form>






    );
}
 
export default ChatInput;


// "use client";


// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Form, FormControl, FormField, FormItem } from "../ui/form";
// import { Input } from "../ui/input";
// import { Plus } from "lucide-react";

// interface ChatInputProps {
//   apiUrl: string;
//   query: Record<string, any>;
//   name: string;
//   type: "conversation" | "channel";
// }

// const formSchema = z.object({
//   content: z.string().min(1),
// });

// const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       content: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (value: z.infer<typeof formSchema>) => {
//     console.log(value);
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex items-center gap-2 px-4 py-3 border-t border-gray-300 dark:border-gray-700"
//       >
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem className="flex-grow">
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder={`Message #${name}`}
//                   disabled={isLoading}
//                   className="bg-gray-100 dark:bg-[#202225]"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <button
//           type="button"
//           onClick={() => {
//             /* your plus button handler here */
//           }}
//           className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition"
//           aria-label="Add attachment"
//         >
//           <Plus className="w-5 h-5 text-white dark:text-[#313338]" />
//         </button>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Send
//         </button>
//       </form>
//     </Form>
//   );
// };

// export default ChatInput;
