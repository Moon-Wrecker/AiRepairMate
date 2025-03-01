// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '../theme/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xl,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
    },
    startButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      ...theme.shadows.medium,
    },
    startButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.medium,
      marginLeft: theme.spacing.sm,
    },
    featuresContainer: {
      marginTop: theme.spacing.xl * 2,
      width: '100%',
    },
    featureTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.light,
    },
    featureIcon: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      marginRight: theme.spacing.md,
    },
    featureText: {
      flex: 1,
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text.primary,
    },
  };

  const features = [
    {
      icon: 'build',
      text: 'Step-by-step repair guides with detailed instructions',
    },
    {
      icon: 'handyman',
      text: 'Tool recommendations for each repair task',
    },
    {
      icon: 'help',
      text: 'Expert assistance for your DIY projects',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>DIY Repair Assistant</Text>
        <Text style={styles.subtitle}>
          Your personal AI-powered assistant for home repairs and DIY projects
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Icon
            name="chat"
            type="material"
            color={theme.colors.text.inverse}
            size={24}
          />
          <Text style={styles.startButtonText}>Start Chat</Text>
        </TouchableOpacity>

        <View style={styles.featuresContainer}>
          <Text style={styles.featureTitle}>Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon
                  name={feature.icon}
                  type="material"
                  color={theme.colors.text.inverse}
                  size={20}
                />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
