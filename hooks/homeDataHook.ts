import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

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
  trendingPosts: Post[];
}

const useFetchData = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<Data>({
    posts: [],
    user: { firstName: "", lastName: "" },
    trendingPosts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (!storedUserId) {
          throw new Error("User not found");
        }

        const [postsResponse, userResponse, trendingPostsResponse] =
          await Promise.all([
            fetch(`http://localhost:3000/api/posts`),
            fetch(`http://localhost:3000/api/users/${storedUserId}`),
            fetch(`http://localhost:3000/api/trending-posts`),
          ]);

        if (
          !postsResponse.ok ||
          !userResponse.ok ||
          !trendingPostsResponse.ok
        ) {
          throw new Error("Error fetching data");
        }

        const [postsData, userData, trendingPostData] = await Promise.all([
          postsResponse.json(),
          userResponse.json(),
          trendingPostsResponse.json(),
        ]);

        setData({
          posts: postsData.posts,
          user: userData,
          trendingPosts: trendingPostData.posts,
        });
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
        setRefreshing(false);
      }
    };

    fetchData();
  }, [refreshing]);

  const onRefresh = async () => {
    setRefreshing(true);
  };

  return { refreshing, data, isLoading, onRefresh };
};

export default useFetchData;
