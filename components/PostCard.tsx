import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";

interface Post {
  title: string;
  thumbnail_url: string;
  video: string;
  firstName: string;
  lastName: string;
}

const PostCard = ({
  posts: { title, thumbnail_url, video, firstName, lastName },
}: {
  posts: Post;
}) => {
  const [play, setPlay] = React.useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-lg"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-sm text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {firstName} {lastName}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Text className="text-whte">Playing</Text>
      ): (
        <TouchableOpacity 
        className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        activeOpacity={0.8}
        onPress={() => setPlay(true)}
        >
            <Image 
                source = {{ uri: thumbnail_url }}
                className="w-full h-full rounded-xl mt-3"
                resizeMode="cover" 
            />
            <Image 
                source={icons.play}
                className="w-12 h-12 absolute"
                resizeMode="contain"
            />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostCard;
