import { Stack, StatusBar, React } from "@/utils/commonImports";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name = "signUp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "login"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light"/>
    </>
  );
};

export default AuthLayout;
