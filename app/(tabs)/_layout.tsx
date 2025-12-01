import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="page2"
        options={{
          title: '2',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="2.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="page3"
        options={{
          title: '3',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="3.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="page4"
        options={{
          title: '4',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="4.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="page5"
        options={{
          title: '5',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="5.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="page6"
        options={{
          title: '6',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="5.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="page7"
        options={{
          title: '7',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="5.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
