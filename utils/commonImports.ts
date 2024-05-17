// Module Imports
import { View, Text, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Video, ResizeMode } from "expo-av";
import { router, Tabs, Redirect } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import axios from "axios";

// Local Component Imports
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

// Module Exports for React and React Native Components
export {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  React,
  useState,
  ImageSourcePropType,
  AsyncStorage
};

// Module Exports for Expo Components
export { Video, ResizeMode, router, Tabs, Redirect, StatusBar };

// Module Exports for Axios
export { axios };

// Local Component Exports
export { FormField, CustomButton, icons };
