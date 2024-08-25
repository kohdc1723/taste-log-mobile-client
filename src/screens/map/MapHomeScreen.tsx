import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';

import useAuth from '@/hooks/useAuth';
import CustomPressable from '@/components/CustomPressable';

export default function MapHomeScreen() {
  const { logoutMutation } = useAuth();

  const handleClickLogout = () => logoutMutation.mutate(null);

  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <CustomPressable
        label="Logout"
        onPress={handleClickLogout}
      />
    </SafeAreaView>
  )
}