import { View, Text, FlatList, Image, RefreshControl, React, SafeAreaView, images } from "@/utils/commonImports";
import { SearchInput, Trending, EmptyState, PostCard, useFetchData } from "@/utils/commonImports";

const Home = () => {
  const { refreshing, data, isLoading, onRefresh } = useFetchData();
  const { user, posts, trendingPosts } = data;

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard data={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Hi there,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user.firstName}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.favicon}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput initialQuery={""} />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular">
                Latest Videos
              </Text>
              <Trending posts={trendingPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Posts Found"
            description="No posts found in this category"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
