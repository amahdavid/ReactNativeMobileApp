import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
const Login = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeEmail = (value: string) => {
    const formattedEmail = value.charAt(0).toLowerCase() + value.slice(1);
    setForm({ ...form, email: formattedEmail });
  };

  const submit = async () => {
    console.log(form);
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {

      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home")

    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={handleChangeEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-4"
            secureTextEntry={true}
          />

          <CustomButton
            title="Login"
            containerStyle="mt-7"
            handlePress={() => {
              submit();
            }}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white text-center mt-7">
              Don't have an account?{" "}
            </Text>
            <Link href="/signUp" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
