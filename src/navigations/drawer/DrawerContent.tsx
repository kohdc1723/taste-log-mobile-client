import { BLACK, NEUTRAL, ROSE, WHITE } from "@/constants/colours";
import useAuth from "@/hooks/useAuth";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { getProfileQuery } = useAuth();
  const { email, nickname, imageUri, kakaoImageUri } = getProfileQuery.data || {};

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
        {...props}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {(!imageUri && !kakaoImageUri) && (
              <Image
                source={require("@/assets/default-user.png")}
                style={styles.userImage}
              />
            )}
            {(!imageUri && kakaoImageUri) && (
              <Image
                source={{ uri: kakaoImageUri }}
                style={styles.userImage}
              />
            )}
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.userImage}
              />
            )}
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 32
  },
  nameText: {
    color: BLACK
  },
  userInfoContainer: {
    alignItems: "center",
    gap: 16
  },
  userImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  }
});