import { account } from '@/lib/appwrite';
import { Button } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const User = () => {
   const router = useRouter();
  const [user, setUser] = useState<any>(null);
      const getUser = async ()=>{
        try {
    const user = await account.get();
   
} catch (err) {
    console.log(err)
}
    }
      const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    router.replace("/(auth)")

  };
    console.log(user)
    
  return (
    <View>
      <Text className="text-center pt-20 ml-8 text-3xl">user</Text>
      <Button onPressIn={handleLogout} className='text-center pt-10 ml-8 text-3xl'><Text className='text-center text-3xl'>Logout</Text></Button>
    </View>
  )
}

export default User