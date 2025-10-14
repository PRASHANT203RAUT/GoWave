// import { NextRequest, NextResponse } from 'next/server';
// import { AccessToken } from 'livekit-server-sdk';

// // Do not cache endpoint result
// export const revalidate = 0;

// export async function GET(req: NextRequest) {
//   const room = req.nextUrl.searchParams.get('room');
//   const username = req.nextUrl.searchParams.get('username');
//   if (!room) {
//     return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
//   } else if (!username) {
//     return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

//   if (!apiKey || !apiSecret || !wsUrl) {
//     return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
//   }

//   const at = new AccessToken(apiKey, apiSecret, { identity: username });
//   at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

//   return NextResponse.json(
//     { token: await at.toJwt() },
//     { headers: { "Cache-Control": "no-store" } },
//   );
// }


// import { NextRequest, NextResponse } from 'next/server';
// import { AccessToken } from 'livekit-server-sdk';

// // Do not cache endpoint result
// export const revalidate = 0;

// export async function GET(req: NextRequest) {
//   // 🔧 Log the environment variables
//   console.log("🔧 ENV:", {
//     apiKey: process.env.LIVEKIT_API_KEY,
//     apiSecret: process.env.LIVEKIT_API_SECRET,
//     wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL,
//   });

//   const room = req.nextUrl.searchParams.get('room');
//   const username = req.nextUrl.searchParams.get('username');

//   if (!room) {
//     return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
//   } else if (!username) {
//     return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

//   if (!apiKey || !apiSecret || !wsUrl) {
//     return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
//   }

//   const at = new AccessToken(apiKey, apiSecret, { identity: username });
//   at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

//   return NextResponse.json(
//     { token: await at.toJwt() },
//     { headers: { "Cache-Control": "no-store" } },
//   );
// }


// // app/api/livekit/route.ts (App Router)
// import { NextRequest, NextResponse } from "next/server";
// import { AccessToken } from "livekit-server-sdk";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const room = searchParams.get("room");
//   const username = searchParams.get("username");

//   if (!room || !username) {
//     return NextResponse.json(
//       { error: "Missing room or username" },
//       { status: 400 }
//     );
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

//   if (!apiKey || !apiSecret || !serverUrl) {
//     return NextResponse.json(
//       { error: "Server configuration error" },
//       { status: 500 }
//     );
//   }

//   try {
//     const at = new AccessToken(apiKey, apiSecret, {
//       identity: username,
//       ttl: "10m",
//     });

//     at.addGrant({
//       room,
//       roomJoin: true,
//       canPublish: true,
//       canSubscribe: true,
//     });

//     const token = await at.toJwt();
//     return NextResponse.json({ token });
//   } catch (error) {
//     console.error("Token generation error:", error);
//     return NextResponse.json(
//       { error: "Failed to generate token" },
//       { status: 500 }
//     );
//   }
// }



// import { AccessToken } from "livekit-server-sdk";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const room = req.nextUrl.searchParams.get("room");
//   const username = req.nextUrl.searchParams.get("username");
//   if (!room) {
//     return NextResponse.json(
//       { error: 'Missing "room" query parameter' },
//       { status: 400 }
//     );
//   } else if (!username) {
//     return NextResponse.json(
//       { error: 'Missing "username" query parameter' },
//       { status: 400 }
//     );
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

//   if (!apiKey || !apiSecret || !wsUrl) {
//     return NextResponse.json(
//       { error: "Server misconfigured" },
//       { status: 500 }
//     );
//   }

//   const at = new AccessToken(apiKey, apiSecret, { identity: username });

//   at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

//   return NextResponse.json({ token: await at.toJwt() });
// }


// import { AccessToken } from "livekit-server-sdk";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const room = req.nextUrl.searchParams.get("room");
//   const username = req.nextUrl.searchParams.get("username");
//   if (!room) {
//     return NextResponse.json(
//       { error: 'Missing "room" query parameter' },
//       { status: 400 }
//     );
//   } else if (!username) {
//     return NextResponse.json(
//       { error: 'Missing "username" query parameter' },
//       { status: 400 }
//     );
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

//   if (!apiKey || !apiSecret || !wsUrl) {
//     return NextResponse.json(
//       { error: "Server misconfigured" },
//       { status: 500 }
//     );
//   }

//   const at = new AccessToken(apiKey, apiSecret, { identity: username });

//   at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

//   return NextResponse.json({ token: await at.toJwt() });
// }


// import { AccessToken } from "livekit-server-sdk";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     console.log("🔥 Livekit API route called");
//   // Log all the relevant env vars for debugging
//   console.log("LIVEKIT_API_KEY:", process.env.LIVEKIT_API_KEY);
//   console.log("LIVEKIT_API_SECRET:", process.env.LIVEKIT_API_SECRET);
//   console.log("NEXT_PUBLIC_LIVEKIT_URL:", process.env.NEXT_PUBLIC_LIVEKIT_URL);

//   const room = req.nextUrl.searchParams.get("room");
//   const username = req.nextUrl.searchParams.get("username");

//   if (!room) {
//     return NextResponse.json(
//       { error: 'Missing "room" query parameter' },
//       { status: 400 }
//     );
//   } else if (!username) {
//     return NextResponse.json(
//       { error: 'Missing "username" query parameter' },
//       { status: 400 }
//     );
//   }

//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

//   if (!apiKey || !apiSecret || !wsUrl) {
//     return NextResponse.json(
//       { error: "Server misconfigured" },
//       { status: 500 }
//     );
//   }

//   const at = new AccessToken(apiKey, apiSecret, { identity: username });

//   at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

//   return NextResponse.json({ token: await at.toJwt() });
// }


import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

   console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 Livekit API route called");
//   // Log all the relevant env vars for debugging
  console.log("LIVEKIT_API_KEY:", process.env.LIVEKIT_API_KEY);
  console.log("LIVEKIT_API_SECRET:", process.env.LIVEKIT_API_SECRET);
  console.log("NEXT_PUBLIC_LIVEKIT_URL:", process.env.NEXT_PUBLIC_LIVEKIT_URL);
  const room = req.nextUrl.searchParams.get("room");
  const username = req.nextUrl.searchParams.get("username");
  if (!room) {
    return NextResponse.json(
      { error: 'Missing "room" query parameter' },
      { status: 400 }
    );
  } else if (!username) {
    return NextResponse.json(
      { error: 'Missing "username" query parameter' },
      { status: 400 }
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username });

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

  return NextResponse.json({ token: await at.toJwt() });
}