import { account } from "@/lib/appwrite";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";



export default function RootLayout() {
   const router = useRouter();
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        router.replace("./user/page");
      } catch (err) {
        console.log("Error fetching user", err);
        
      }
    };
    fetchUser();
  }, []);
  
  return <Stack  screenOptions={{headerShown:false}}/>;
}
