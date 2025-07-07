import { account } from '@/lib/appwrite';
import { Button } from '@react-navigation/elements';
import React from 'react';
import { Text, View } from 'react-native';

const Try = () => {
  const logout = async ()=>{
    await account.deleteSessions()
  }
  return (
    <View>
      <Text className='text-8xl'>TRY</Text>
      <Button onPressIn={logout}>Logout</Button>
    </View>
  )
}

export default Try;