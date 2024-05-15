import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-lg text-center mt-7">Profile</Text>
      <Link href="/login" className="text-lg font-psemibold text-black">
        Login
      </Link>
      <Link href="/signUp" className="text-lg font-psemibold text-black">
        Sign Up
      </Link>
    </View>
  );
};

export default Profile;
