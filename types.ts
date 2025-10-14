// import { Profile,Server,Member } from "@prisma/client"

// export type ServerWithMembersWithProfiles = Server & {
//     members:(Member  & {profile:Profile}[])
// }

import { Profile, Server, Member, Channel } from "@prisma/client";

import {Server as NetServer,Socket} from "net";
import { NextApiResponse } from "next";
import {Server as SocketIOServer} from "socket.io"
// import { Member,Server,Profile } from "@prisma/client";


// If your server also includes channels, include them
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
  channels: Channel[]; 
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
