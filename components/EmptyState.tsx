import { View, Text, Image, CustomButton, router, images } from "@/utils/commonImports";

const EmptyState = ({ title, description }: { title: string, description: string }) => {
  return (
    <View className="justify center items-center px-4">
      <Image
        source={images.empty}
        className="w-[150px] h-[150px]"
        resizeMode="contain"
      />

      <Text className="text-xl text-white mt-2 text-center font-psemibold">
        {title}
      </Text>

      <Text className="text-sm text-white font-pmedium">{description}</Text>

      <CustomButton 
        title="Create Post"
        handlePress={() => router.push("/create")}
        containerStyle="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
