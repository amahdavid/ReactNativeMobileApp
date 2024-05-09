import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(form);
    createUser();
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
            handleChangeText={(value) => setForm({ ...form, email: value })}
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
