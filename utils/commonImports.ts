// Module Imports
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  RefreshControl,
  FlatList,
  Alert,
  KeyboardTypeOptions,
  TextInput,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Video, ResizeMode } from "expo-av";
import { SplashScreen, router, Tabs, Redirect, Stack, Link, useLocalSearchParams, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import axios from "axios";
import jwt, { jwtDecode } from "jwt-decode";

// Local Component Imports
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import Trending from "@/components/Trending";
import SearchInput from "@/components/SearchInput";
import useFetchData from "@/hooks/dataHook";
import InfoBox from "@/components/InfoBox";
import { icons, images } from "@/constants";
import { validateEmail, validatePassword } from "./validation";

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
  useEffect,
  ImageSourcePropType,
  AsyncStorage,
  RefreshControl,
  FlatList,
  Alert,
  KeyboardTypeOptions,
  TextInput,
  ImageBackground
};

// Module Exports for Expo Components
export { Video, ResizeMode, router, Tabs, Stack, Redirect, StatusBar, Link, useLocalSearchParams, useFonts, SplashScreen, usePathname };

// Module Exports for Others
export { axios, jwt, jwtDecode};

// Local Component Exports
export {
  FormField,
  CustomButton,
  PostCard,
  EmptyState,
  Trending,
  SearchInput,
  InfoBox,
  useFetchData,
  icons,
  images,
  validateEmail,
  validatePassword,
};
