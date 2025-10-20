// import { Server as NetServer } from "http";
// import { NextApiRequest } from "next";
// import {Server as ServerIO} from "socket.io"
// import { NextApiResponseServerIo } from "@/types";
// export const config ={
//     api:{
//         bodyParser:false
//     }
// }

// const ioHandle =(req:NextApiRequest,res:NextApiResponseServerIo)=>{
//     if(!res.socket.server.io){
//         const path="/api/socket/io";
//         const httpServer:NetServer =res.socket.server as any;
//         const io = new ServerIO(httpServer,{
//             path:path,
//             addTrailingSlash:false
//         })
//         res.socket.server.io=io
//     }
// }

// pages/api/socket/io.ts

import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/types"; // assuming this includes correct type extension

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function ioHandler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (!res.socket.server.io) {
    console.log("🔌 Initializing Socket.IO server...");

    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      // console.log("✅ Client connected:", socket.id);

      socket.on("disconnect", () => {
        // console.log("❌ Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end(); // ✅ VERY IMPORTANT — otherwise you'll get a 500
}
