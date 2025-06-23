import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import "./global.css"


const index = () => {
  return (
    <>
    <View>
      <Text className="bg-blue-500 text-center flex mt-52 ">index</Text>

    </View>
     <Link href="/test" className = "text-center bg-slate-400  mt-10 ">Hello world</Link>
    </>
    
  )
}

export default index