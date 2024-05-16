import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface BasePost {
  id: number;
  title: string;
  thumbnail_url: string;
  video: string;
}

interface Post extends BasePost {}

interface UserSpecificPost extends BasePost {}

interface User {
  firstName: string;
  lastName: string;
}

interface Data {
  posts: Post[];
  user: User;
  trendingPosts: Post[];
  userSpecificPosts: UserSpecificPost[];
}

const useFetchData = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<Data>({
    posts: [],
    user: { firstName: "", lastName: "" },
    trendingPosts: [],
    userSpecificPosts: [],
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

        const [
          postsResponse,
          userResponse,
          trendingPostsResponse,
          userSpecificPostsResponse,
        ] = await Promise.all([
          fetch(`http://localhost:3000/api/posts`),
          fetch(`http://localhost:3000/api/users/${storedUserId}`),
          fetch(`http://localhost:3000/api/trending-posts`),
          fetch(`http://localhost:3000/api/${storedUserId}/posts`),
        ]);

        if (
          !postsResponse.ok ||
          !userResponse.ok ||
          !trendingPostsResponse.ok ||
          !userSpecificPostsResponse.ok
        ) {
          throw new Error("Error fetching data");
        }

        const [postsData, userData, trendingPostData, userSpecificData] =
          await Promise.all([
            postsResponse.json(),
            userResponse.json(),
            trendingPostsResponse.json(),
            userSpecificPostsResponse.json(),
          ]);

        setData({
          posts: postsData.posts,
          user: userData,
          trendingPosts: trendingPostData.posts,
          userSpecificPosts: userSpecificData.posts,
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
