// "use client";

// import { useTheme } from "next-themes";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { Smile } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// interface EmojiPickerProps {
//   onChange: (value: string) => void;
// }

// export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
//   const { resolvedTheme } = useTheme(); 

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <button
//           type="button"
//           className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
//         >
//           <Smile />
//         </button>
//       </PopoverTrigger>

//       <PopoverContent
//         side="right"
//         sideOffset={40}
//         className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
//       >
//         <Picker
//           data={data}
//           theme={resolvedTheme === "dark" ? "dark" : "light"}
//           onEmojiSelect={(emoji: any) => onChange(emoji.native)}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// };


"use client";

import { useTheme } from "next-themes";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
        >
          <Smile className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16 z-[9999]"
        align="start"
        alignOffset={-40}
      >
        <Picker
          data={data}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};