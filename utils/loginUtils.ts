import { images } from "@/constants";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (value: string) => {
    const formattedEmail = value.charAt(0).toLowerCase() + value.slice(1);
    setForm({ ...form, email: formattedEmail });
  };

  const handleChangePassword = (value: string) => {
    setForm({ ...form, password: value });
  };


  const submit = async () => {
    console.log(form);
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/signin",
        form
      );
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      router.replace("/home");
    } catch (error) {
      console.log(error);
      console.error("Token is null or undefined");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    form,
    handleChangeEmail,
    submit,
    handleChangePassword
  };
}

export {
  images,
  Link,
  router,
  FormField,
  CustomButton,
  axios,
  AsyncStorage
};
