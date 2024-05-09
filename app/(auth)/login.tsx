import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import React, { useState } from 'react'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
          source={images.logo}
          resizeMode='contain'
          className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up for Aora
          </Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(value) => setForm({...form, email: value})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(value) => setForm({...form, password: value})}
            otherStyles="mt-4"
            secureTextEntry={true}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login