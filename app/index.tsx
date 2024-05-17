import {
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  useEffect,
  jwt,
  jwtDecode,
  AsyncStorage,
  router,
  images,
  CustomButton,
} from "@/utils/commonImports";

export default function App() {
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await fetch(
          "http://localhost:3000/api/validate-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const decodedToken = jwtDecode(token) as jwt.JwtPayload;
          if (
            decodedToken &&
            decodedToken.exp &&
            decodedToken.exp * 1000 < Date.now()
          ) {
            await AsyncStorage.removeItem("token");
            router.replace("/login");
          } else {
            router.replace("/home");
          }
        } else {
          // Token validation failed or user doesn't exist
          await AsyncStorage.removeItem("token");
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error checking logged in status:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.favicon}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.mealcard}
            className="max-w-[380px] w-full h-[298px] rounded-lg overflow-hidden"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Food Delicacies with{" "}
              <Text className="text-secondary-200">Foodie</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
            exercitationem porro quod sapiente quisquam eos numquam.
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => {
              router.push("/login");
            }}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
