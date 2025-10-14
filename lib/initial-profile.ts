import { currentUser } from "@clerk/nextjs/server";
// import { RedirectToSignIn } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";
// import { redirectToSignIn } from "@clerk/nextjs/server"
// export const initialProfile =async()=>{
//     const user=await currentUser();
//     if(!user){ 
//         // return redirectToSignIn();
//          throw new Error("User not authenticated");
//     }
//    const profile = await db.profile.findUnique({
//     where:{
//         userId:user.id
//     }
//    });
//    if(profile){
//     return profile
//    }
//    const newProfile=await db.profile.create({
//     data:{
//         userId:user.id,
//         name:`${user.firstName} ${user.lastName}`,
//         imageUrl:user.imageUrl,
//         email:user.emailAddresses[0].emailAddress
//     }
//    })
//    return newProfile
// }

// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
import { syncProfileFromClerk } from "@/lib/syncProfile"; // import the sync function

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Sync profile data from Clerk before fetching or creating
  await syncProfileFromClerk(user.id);

  // Now try to find the profile in the DB after sync
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  // If profile somehow doesn't exist (e.g., sync didn't create), create it manually
  const name =
    (user.firstName || user.lastName)
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : user.username || user.emailAddresses[0]?.emailAddress || "Unknown";

  const imageUrl = user.imageUrl || "";
  const email = user.emailAddresses[0]?.emailAddress || "";

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name,
      imageUrl,
      email,
    },
  });

  return newProfile;
};

