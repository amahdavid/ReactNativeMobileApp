import { images, Link, router, Redirect, useState, axios, AsyncStorage, validateEmail, validatePassword } from "@/utils/commonImports";
import { FormField, CustomButton } from "@/utils/commonImports";

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
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
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
        console.error(error.response.data)
      } else {
        console.log("Error:", error);
        setError("An unexpected error occurred. Please try again later.");
        console.error(error.response.data)
      }
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
  const [username, setUsername] = useState('');
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
      const response = await axios.post("http://localhost:3000/api/signup", form);
      const { token, response: { id, firstName } } = response.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", id);
      await AsyncStorage.setItem("firstName", firstName); // Store the user's first name
      router.replace("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUpAndFetchUser = async () => {
    try {
      await submit();
      const storedUserId = await AsyncStorage.getItem("userId");
      const userResponse = await fetch(`http://localhost:3000/api/users/${storedUserId}`);
      if (!userResponse.ok) {
        throw new Error("Error fetching user data");
      }
      const user = await userResponse.json();
      setUsername(user.firstName);
      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isSubmitting,
    form,
    handleChangeEmail,
    handleChangeText,
    signUpAndFetchUser,
    submit
  };
};