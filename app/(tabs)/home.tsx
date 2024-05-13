import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([] as any[]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userId, setUserId] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (!storedUserId) {
          throw new Error("User not found");
        }
        setUserId(storedUserId);
        const response = await fetch(
          `http://localhost:3000/api/${userId}/posts`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch new data
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }]}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text className="text-3xl text-white text-center">{item.id}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  User's Name
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
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular">
                Latest Videos
              </Text>
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
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
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;
