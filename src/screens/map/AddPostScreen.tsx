import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import Octicons from "react-native-vector-icons/Octicons";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomTextInput from "@/components/CustomTextInput";
import CustomPressable from "@/components/CustomPressable";
import { MAP } from "@/constants/navigations";
import { MapStackParamList } from "@/navigations/stack/MapStackNavigator";
import { NEUTRAL } from "@/constants/colours";
import { MarkerColor } from "@/types/domains";
import useCreatePostMutation from "@/hooks/queries/useCreatePostMutation";
import useGetAddress from "@/hooks/useGetAddress";
import MarkerSelector from "@/components/MarkerSelector";

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof MAP.ADD_POST
>;

type PostData = {
  title: string;
  description?: string;
};

const PostSchema = yup.object({
  title: yup.string()
    .required("Title must be 1~30 characters")
    .test(
      "title-length-check",
      "Title must be 1~30 characters",
      val => val ? (1 <= val.length && val.length <= 30) : false
    ),
  description: yup.string()
});

export default function AddPostScreen({
  route,
  navigation
}: AddPostScreenProps) {
  const { location } = route.params;

  const [markerColor, setMarkerColor] = useState<MarkerColor>("RED");
  const [score, setScore] = useState(1);
  const address = useGetAddress(location);

  const descriptionRef = useRef<TextInput | null>(null);

  const createPost = useCreatePostMutation();

  const handlePressMarker = (color: MarkerColor) => setMarkerColor(color);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(PostSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const onSubmit = (data: PostData) => {
    const body = {
      date: new Date(),
      title: data.title,
      description: data.description || "",
      color: markerColor,
      score: score,
      imageUris: []
    };

    createPost.mutate({ address, ...location, ...body }, {
      onSuccess: () => navigation.goBack()
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            value={address}
            disabled
            icon={
              <Octicons
                name="location"
                size={16}
                color={NEUTRAL[500]}
              />
            }
          />
          <CustomPressable
            variant="outlined"
            size="large"
            label="Select date"
          />
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                placeholder="Title"
                onChangeText={onChange}
                onBlur={onBlur}
                blurOnSubmit={false}
                onSubmitEditing={() => descriptionRef.current?.focus()}
                returnKeyType="next"
                value={value}
                error={errors.title && errors.title.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                ref={descriptionRef}
                placeholder="Description"
                onChangeText={onChange}
                onBlur={onBlur}
                blurOnSubmit={false}
                returnKeyType="next"
                multiline
                value={value}
                error={errors.description && errors.description.message}
              />
            )}
          />
          <MarkerSelector
            markerColor={markerColor}
            onPressMarker={handlePressMarker}
          />
        </View>

        {/* submit */}
        <CustomPressable
          label="Add Post"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20
  }
});