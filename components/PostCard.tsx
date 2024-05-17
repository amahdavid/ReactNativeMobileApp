import { View, Text, Image, TouchableOpacity } from "@/utils/commonImports";
import React from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

interface Post {
  title: string;
  thumbnail_url: string;
  video_url: string;
  firstName?: string;
  lastName?: string;
}

const PostCard = ({
  data: { title, thumbnail_url, video_url, firstName, lastName },
}: {
  data: Post;
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
        <Video
        source={{ uri: video_url }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && !status.isPlaying) {
            setPlay(false);
          }
        }}
        className="w-52 h-72 rounded-[35px] mt-3"
      />
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
