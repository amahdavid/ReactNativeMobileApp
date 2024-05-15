import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import axios from "axios";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts?search=${query}`); // Fetch posts based on search query
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error fetching posts
      }
    };

    fetchPosts();
  }, [query])
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            data={item}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            description="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
