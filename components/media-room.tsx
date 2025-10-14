// "use client";

// import { useEffect,useState } from "react";
// import {LiveKitRoom,useStartAudio,VideoConference} from "@livekit/components-react"
// import { Channel } from "@prisma/client";
// import { useUser } from "@clerk/nextjs";
// import { Loader2 } from "lucide-react";

// interface MediaRoomProps{
//     chatId:string;
//     video:boolean;
//     audio:boolean;

// }

// export const MediaRoom =({chatId,video,audio}:MediaRoomProps)=>{

//     const {user}=useUser();
//     const [token,setToken]=useState("");
//     useEffect(()=>{
//         if(!user?.firstName ||!user?.lastName) return;
//         const name=`${user.firstName} ${user.lastName}`;
//         (async ()=>{
//             try {

//                 const resp =await fetch(`/api/livekit?room=${chatId}&username=${name}`)
//                 const data =await resp.json()
//                 setToken(data.token)
//             } catch (error) {
//                 console.log(error)
//             }
//         })()
//     },[user?.firstName,user?.lastName,chatId])
//     if(token === ""){
//         return(
//             <div className="flex flex-col flex-1 justify-center items-center">
//                 <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
//                 <p className="text-xs text-zinc-500 dark:text-zinc-400">
// Loading...
//                 </p>
//             </div>
//         )
//     }
//     return(
//         <LiveKitRoom data-lk-theme="default" serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} token={token}
//         connect={true} video={video} audio={audio}
//         >
//             <VideoConference/>
//         </LiveKitRoom>
//     )

// }



// "use client";

// import { useEffect, useState } from "react";
// import { LiveKitRoom, VideoConference } from "@livekit/components-react";
// import "@livekit/components-styles";
// import { Channel } from "@prisma/client";
// import { useUser } from "@clerk/nextjs";
// import { Loader2 } from "lucide-react";

// interface MediaRoomProps {
//     chatId: string;
//     video: boolean;
//     audio: boolean;
// };

// export const MediaRoom = ({
//     chatId,
//     video,
//     audio
// }: MediaRoomProps) => {
//     const { user } = useUser();
//     const [token, setToken] = useState("");

//     useEffect(() => {
//         if (!user?.firstName || !user?.lastName) return;

//         const name = `${user.firstName} ${user.lastName}`;

//         (async () => {
//             try{
//                 const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
//                 const data = await resp.json();
//                 setToken(data.token);
//             } catch (e) {
//                 console.log(e);
//             }
//         })()
//     }, [user?.firstName, user?.lastName, chatId]);

//     if (token === "") {
//         return (
//             <div className="flex flex-col flex-1 justify-center items-center">
//                 <Loader2
//                     className="h-7 w-7 text-zinc-500 animate-spin my-4"
//                 />
//                 <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     Loading...
//                 </p>
//             </div>
//         )
//     }

//     return (
//         <LiveKitRoom
//             data-lk-theme="default"
//             serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
//             token={token}
//             connect={true}
//             video={video}
//             audio={audio}
//         >
//             <VideoConference />
//         </LiveKitRoom>
//     )
// }
    








"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
};

export const MediaRoom = ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");
      console.log("user:",user)
    useEffect(() => {
         console.log(process.env.NEXT_PUBLIC_LIVEKIT_URL)
        console.log("🔥🔥🔥media crom called ")
        // if (!user?.firstName || !user?.lastName) return;
        if (!user?.username) return;


        // const name = `${user.firstName} ${user.lastName}`;
        const name = `${user.username}`;


        (async () => {
            try{
                // const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                console.log("Media kkkd")
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
      const data = await resp.json();
      console.log("LiveKit token response:", data);
      setToken(data.token);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [user?.username, chatId]);

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2
                    className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}
    












// "use client";

// import { useEffect, useState } from "react";
// import { LiveKitRoom, VideoConference } from "@livekit/components-react";
// import { useUser } from "@clerk/nextjs";
// import { Loader2 } from "lucide-react";

// interface MediaRoomProps {
//     chatId: string;
//     video: boolean;
//     audio: boolean;
// }

// export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
//     const { user } = useUser();
//     const [token, setToken] = useState("");
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         console.log("🔍 User check:", { 
//             user: !!user, 
//             firstName: user?.firstName, 
//             lastName: user?.lastName 
//         });
        
//         if (!user?.firstName || !user?.lastName) {
//             console.log("❌ Missing user info, skipping token fetch");
//             setIsLoading(false);
//             setError("User information not available");
//             return;
//         }
        
//         const name = `${user.firstName} ${user.lastName}`;
        
//         const fetchToken = async () => {
//             try {
//                 setIsLoading(true);
//                 setError(null);
                
//                 const url = `/api/livekit?room=${chatId}&username=${encodeURIComponent(name)}`;
//                 console.log("🔍 Fetching token from:", url);
                
//                 const resp = await fetch(url);
                
//                 console.log("📡 API Response:", {
//                     status: resp.status,
//                     statusText: resp.statusText,
//                     ok: resp.ok,
//                     headers: Object.fromEntries(resp.headers.entries())
//                 });
                
//                 if (!resp.ok) {
//                     const errorText = await resp.text();
//                     console.error("❌ API Error Response:", errorText);
//                     throw new Error(`API Error ${resp.status}: ${errorText}`);
//                 }
                
//                 const data = await resp.json();
//                 console.log("📦 API Response Data:", data);
                
//                 if (data.token) {
//                     console.log("✅ Token set successfully, length:", data.token.length);
//                     setToken(data.token);
//                 } else {
//                     console.error("❌ No token in response:", data);
//                     throw new Error(data.error || "No token in response");
//                 }
                
//             } catch (error) {
//                 console.error("💥 Error fetching token:", error);
//                 setError(error instanceof Error ? error.message : "Failed to get token");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
        
//         fetchToken();
//     }, [user?.firstName, user?.lastName, chatId]);

//     if (isLoading) {
//         return (
//             <div className="flex flex-col flex-1 justify-center items-center">
//                 <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
//                 <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     Loading video room...
//                 </p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex flex-col flex-1 justify-center items-center p-4">
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
//                     <strong className="font-bold">Connection Error</strong>
//                     <p className="text-sm mt-1">{error}</p>
//                 </div>
//                 <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded mb-4 max-w-md">
//                     <strong className="font-bold">Debug Info:</strong>
//                     <div className="text-sm mt-2">
//                         <div>User: {user?.firstName} {user?.lastName}</div>
//                         <div>Chat ID: {chatId}</div>
//                         <div>API URL: /api/livekit</div>
//                         <div>Server URL: {process.env.NEXT_PUBLIC_LIVEKIT_URL}</div>
//                     </div>
//                 </div>
//                 <button 
//                     onClick={() => window.location.reload()} 
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Try Again
//                 </button>
//             </div>
//         );
//     }

//     if (!token) {
//         return (
//             <div className="flex flex-col flex-1 justify-center items-center">
//                 <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded mb-4">
//                     <strong className="font-bold">Debug Info:</strong>
//                     <div className="text-sm mt-2">
//                         <div>User: {user?.firstName} {user?.lastName}</div>
//                         <div>Chat ID: {chatId}</div>
//                         <div>Token: {token ? 'Available' : 'Not available'}</div>
//                         <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
//                         <div>Error: {error || 'None'}</div>
//                         <div>Server URL: {process.env.NEXT_PUBLIC_LIVEKIT_URL || 'Not configured'}</div>
//                     </div>
//                 </div>
//                 <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     No token available - Check console for details
//                 </p>
//             </div>
//         );
//     }

//     const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
    
//     if (!serverUrl) {
//         return (
//             <div className="flex flex-col flex-1 justify-center items-center">
//                 <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                     <strong className="font-bold">Configuration Error</strong>
//                     <p className="text-sm mt-1">NEXT_PUBLIC_LIVEKIT_URL not configured</p>
//                 </div>
//             </div>
//         );
//     }

//     console.log("🚀 Connecting to LiveKit:", { serverUrl, video, audio });

//     return (
//         <div className="flex flex-col flex-1">
//             <LiveKitRoom
//                 data-lk-theme="default"
//                 serverUrl={serverUrl}
//                 token={token}
//                 connect={true}
//                 video={video}
//                 audio={audio}
//                 onConnected={() => console.log("✅ Connected to LiveKit")}
//                 onDisconnected={() => console.log("❌ Disconnected from LiveKit")}
//                 onError={(error: Error) => console.error("💥 LiveKit error:", error)}
//             >
//                 <VideoConference />
//             </LiveKitRoom>
//         </div>
//     );
// };