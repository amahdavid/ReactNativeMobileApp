import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChangeEmail = (value: string) => {
    const formattedEmail = value.charAt(0).toLowerCase() + value.slice(1);
    setForm({ ...form, email: formattedEmail });
  };


  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const submit = async () => {
    console.log(form);
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!validatePassword(form.password)) {
      alert("Password must contain at least 8 characters, including letters and numbers");
      return;
    }

    setIsSubmitting(true);
    try {
      await createUser(form.firstName, form.lastName, form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      
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
        <View className="w-full justify-center h-auto px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up for Aora
          </Text>

          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(value) => setForm({ ...form, firstName: value })}
            otherStyles="mt-7"
          />

          <FormField
            title="Last Name"
            value={form.lastName}
            handleChangeText={(value) => setForm({ ...form, lastName: value })}
            otherStyles="mt-4"
          />

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
            title="Sign Up"
            containerStyle="mt-7"
            handlePress={() => {
              submit();
            }}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white text-center mt-7">
              Already have an account?{" "}
            </Text>
            <Link
              href="/login"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
