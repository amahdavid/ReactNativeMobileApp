import { View, Text } from 'react-native'
import React from 'react'

interface FormFieldProps {
    title: string;
    value: any;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string,
    keyboardType?: string;
    secureTextEntry?: boolean;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}: FormFieldProps) => {
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
        </View>
    )
}

export default FormField