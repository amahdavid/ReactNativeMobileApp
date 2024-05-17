// Module Imports
import { View, Text, ScrollView, TouchableOpacity, Image, ImageSourcePropType, RefreshControl, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Video, ResizeMode } from "expo-av";
import { router, Tabs, Redirect } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import axios from "axios";

// Local Component Imports
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import Trending from "@/components/Trending";
import SearchInput from "@/components/SearchInput";
import useFetchData from "@/hooks/dataHook";
import { icons, images } from "@/constants";

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
  AsyncStorage,
  RefreshControl,
  FlatList,
};

// Module Exports for Expo Components
export { Video, ResizeMode, router, Tabs, Redirect, StatusBar };

// Module Exports for Axios
export { axios };

// Local Component Exports
export { FormField, CustomButton, PostCard, EmptyState, Trending, SearchInput, useFetchData, icons, images };
