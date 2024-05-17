import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: any;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles = "",
  ...props
}: FormFieldProps) => {
  const {
    placeholder = "",
    keyboardType = "default",
    secureTextEntry = false,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold"
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType as KeyboardTypeOptions | undefined}
          secureTextEntry={!showPassword && secureTextEntry}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
