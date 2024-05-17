import { SafeAreaView, ScrollView, View, Text, Image, images, Link } from "@/utils/commonImports";
import { FormField, CustomButton } from "@/utils/commonImports";
import { useSignup } from "@/utils/authUtils";

const SignUp = () => {
  const { isSubmitting, form, handleChangeEmail, handleChangeText, signUpAndFetchUser } =
    useSignup();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-auto px-4 my-6">
          <Image
            source={images.favicon}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up for Aora
          </Text>

          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(value) => handleChangeText("firstName", value)}
            otherStyles="mt-7"
          />

          <FormField
            title="Last Name"
            value={form.lastName}
            handleChangeText={(value) => handleChangeText("lastName", value)}
            otherStyles="mt-4"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={handleChangeEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(value) => handleChangeText("password", value)}
            otherStyles="mt-4"
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign Up"
            containerStyle="mt-7"
            handlePress={() => {
              signUpAndFetchUser();
            }}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white text-center mt-7">
              Already have an account?{" "}
            </Text>
            <Link
              href="/login"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
