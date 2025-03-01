// App.js
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import RepairGuideScreen from './src/screens/RepairGuideScreen';
import theme from './src/theme/theme';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: theme.colors.background,
              ...(Platform.OS === 'web' ? {
                overflowY: 'auto',
                height: 'calc(100% - 60px)',
              } : {})
            }
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen
            name="RepairGuide"
            component={RepairGuideScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.text.inverse,
              headerTitleStyle: {
                fontWeight: theme.typography.weights.bold,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
