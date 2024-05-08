import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className= "flex-1 items-center justify-center bg-white">
      <Text className = "text-3xl">Mobile App Dev!</Text>
      <StatusBar style="auto" />
      <Link href="profile" style={{color: 'blue'}}>
        <Text>Profile</Text>
      </Link>
    </View>
  );
}
