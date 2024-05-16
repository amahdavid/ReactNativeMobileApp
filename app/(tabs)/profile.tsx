import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import PostCard from "@/components/PostCard";
import { AsyncStorage, images } from "@/utils/authUtils";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import useFetchData from "@/hooks/dataHook";

interface Post {
  id: number;
  title: string;
  thumbnail_url: string;
  video: string;
}

interface User {
  firstName: string;
  lastName: string;
}

interface Data {
  posts: Post[];
  user: User;
}

const Profile = () => {
  const { data } = useFetchData();
  const { user, userSpecificPosts } = data;

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    router.replace("/login");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={userSpecificPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard data={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Posts Found"
            description="No posts found in this category"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={images.profile}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user.firstName + " " + user.lastName}
              description="User's bio"
              containerStyles="mt-5"
              titleStyles="text-xl"
            />
            <InfoBox
              title="1.2k"
              description="Followers"
              titleStyles="text-xl"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
