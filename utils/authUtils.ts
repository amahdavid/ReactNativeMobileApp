import { images } from "@/constants";
import { Link, router, Redirect } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { validateEmail, validatePassword } from "./validation";

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

  const handleChangeText = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  }

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
      const { token, response: { userId } } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", userId);
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
    handleChangeText,
  };
};

export const useSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChangeEmail = (value: string) => {
    const formattedEmail = value.charAt(0).toLowerCase() + value.slice(1);
    setForm({ ...form, email: formattedEmail });
  };

  const handleChangeText = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  }
  

  const submit = async () => {
    console.log(form);
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!validatePassword(form.password)) {
      alert(
        "Password must contain at least 8 characters, including letters and numbers"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:3000/api/signup", form);
      router.replace("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    form,
    handleChangeEmail,
    submit,
    handleChangeText
  };
};

export { images, Link, router, FormField, CustomButton, axios, AsyncStorage, Redirect };
