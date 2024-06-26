import { View, FlatList, TouchableOpacity, Image, router, SafeAreaView, AsyncStorage } from "@/utils/commonImports";
import { EmptyState, PostCard, InfoBox, useFetchData, images, icons } from "@/utils/commonImports";

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
