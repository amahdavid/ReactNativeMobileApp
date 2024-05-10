import { Text, View, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.foodie}
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
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton 
            title="Get Started"
            handlePress={() => {router.push("/home")}} // change this back to /login when you are done
            containerStyle="w-full mt-7"
          />
        </View>
        </ScrollView>
        <StatusBar
          backgroundColor="#161622"
          style="light"
        />
    </SafeAreaView>
  );
}