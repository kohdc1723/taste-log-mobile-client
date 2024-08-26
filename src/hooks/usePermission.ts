import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS, Permission } from "react-native-permissions";

import MESSAGES from "@/constants/messages";

type PermissionType = "LOCATION" | "PHOTO";

type PermissionOS = {
  [key in PermissionType]: Permission;
};

type Alerts = {
  [key in PermissionType]: { TITLE: string; DESCRIPTION: string; };
};

const ANDROID_PERMISSIONS: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
};

const IOS_PERMISSIONS: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY
};

export default function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === "android";
      const permissions = isAndroid ? ANDROID_PERMISSIONS : IOS_PERMISSIONS;

      const alertPermission = () => Alert.alert(
        MESSAGES[type].TITLE,
        MESSAGES[type].DESCRIPTION,
        [
          {
            text: "Go to Settings",
            onPress: () => Linking.openSettings()
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      );

      const checked = await check(permissions[type]);

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            alertPermission();
            return;
          }
          await request(permissions[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          alertPermission();
          break;
        default:
          break;
      };
    })();
  }, []);
};