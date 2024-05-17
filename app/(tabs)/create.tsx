import {FormField, CustomButton } from "@/utils/commonImports"
import { SafeAreaView, ScrollView, Text, React, axios, AsyncStorage, router } from "@/utils/commonImports"

const Create = () => {
  const [uploading, setUploading] = React.useState(false);

  const [form, setForm] = React.useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
  });

  const handleUpload = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.video_url ||
      !form.thumbnail_url
    ) {
      alert("Please fill all fields");
      return;
    }
    setUploading(true);

    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:3000/api/create-post/${storedUserId}`,
        form
      );
      console.log(response.data);
      alert("Recipe uploaded successfully");
      router.replace("/home");
    } catch (error: any) {
      console.log("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">
          Upload a recipe
        </Text>
        <FormField
          title="Recipe Title"
          value={form.title}
          placeholder="Enter recipe title"
          handleChangeText={(e: string) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <FormField
          title="Description"
          value={form.description}
          placeholder="Enter recipe description"
          handleChangeText={(e: string) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />
        <FormField
          title="Video_url"
          value={form.video_url}
          placeholder="Enter the video url"
          handleChangeText={(e: string) =>
            setForm({ ...form, video_url: e.toLowerCase() })
          }
          otherStyles="mt-7"
        />
        <FormField
          title="Thumbnail_url"
          value={form.thumbnail_url}
          placeholder="Enter the thumbnail url"
          handleChangeText={(e: string) => {
            const lowercasedThumbnailUrl =
              e.charAt(0).toLowerCase() + e.slice(1);
            setForm({ ...form, thumbnail_url: lowercasedThumbnailUrl });
          }}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Upload"
          handlePress={handleUpload}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
