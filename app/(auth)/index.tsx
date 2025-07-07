import { Link } from 'expo-router'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'



const index = () => {
  return (
    <>
<ImageBackground
      source={require('@/assets/images/Frame.webp')} // or { uri: 'https://...' }
      className="flex-1 justify-center items-center"
      resizeMode="cover"
    >
  <View className="flex-1 justify-between px-4 py-11">
      <View>
        <Text className="text-3xl font-bold mt-12 text-center">Welcome</Text>
      </View>
      <View className="flex-row items-start w-full gap-2 justify-center">
        <Link href="./login" asChild>
          <TouchableOpacity className="flex-1 h-[59px] overflow-hidden px-8 py-[11px] rounded-[100px] bg-[#1d6235] justify-center items-center">
            <Text className="w-[111px] font-semibold text-center text-white text-base">LOGIN</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity className="flex-1 h-[59px] overflow-hidden px-8 py-[11px] rounded-[100px] bg-[#79ae46] justify-center items-center">
            <Text className="w-[111px] text-base font-semibold text-center text-white">SIGN UP</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
</ImageBackground>

    </>
  )
}

export default index