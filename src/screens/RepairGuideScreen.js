// src/screens/RepairGuideScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import { getRepairGuide } from '../api/repairApi';
import { useTheme } from '../theme/ThemeContext';

const RepairGuideScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { guideId, title } = route.params;
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set navigation options
    navigation.setOptions({
      title: title || 'Repair Guide',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.text.inverse,
      headerTitleStyle: {
        fontWeight: theme.typography.weights.bold,
      },
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ marginLeft: theme.spacing.sm }}
        >
          <Icon 
            name="arrow-back" 
            type="material" 
            color={theme.colors.text.inverse} 
            size={24}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme, title]);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRepairGuide(guideId);
        setGuide(data);
      } catch (error) {
        console.error('Error fetching repair guide:', error);
        setError(error.message || 'Could not load the repair guide');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [guideId]);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.sizes.md,
      marginTop: theme.spacing.sm,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    errorText: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.sizes.md,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    backButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.light,
    },
    backButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
    },
    content: {
      flex: 1,
    },
    overviewCard: {
      margin: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.light,
    },
    mainImage: {
      height: 200,
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.md,
    },
    description: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
      lineHeight: 24,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.sm,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      marginLeft: theme.spacing.xs,
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.text.secondary,
    },
    toolsCard: {
      margin: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.light,
    },
    divider: {
      marginVertical: theme.spacing.md,
      backgroundColor: theme.colors.border,
    },
    toolItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    toolText: {
      marginLeft: theme.spacing.sm,
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text.primary,
    },
    stepsCard: {
      margin: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.surface,
      ...theme.shadows.light,
    },
    stepContent: {
      alignItems: 'center',
    },
    stepImage: {
      width: '100%',
      height: 200,
      marginBottom: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
    },
    stepTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
      alignSelf: 'flex-start',
    },
    stepDescription: {
      fontSize: theme.typography.sizes.md,
      lineHeight: 24,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
      alignSelf: 'flex-start',
    },
    tipContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      marginTop: theme.spacing.sm,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tipText: {
      marginLeft: theme.spacing.sm,
      flex: 1,
      fontSize: theme.typography.sizes.sm,
      fontStyle: 'italic',
      color: theme.colors.text.secondary,
    },
    stepNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.lg,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.sm,
      ...theme.shadows.light,
    },
    navButtonText: {
      marginHorizontal: theme.spacing.xs,
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.md,
    },
    disabledButton: {
      backgroundColor: theme.colors.secondary,
      opacity: 0.5,
    },
    disabledButtonText: {
      color: theme.colors.text.inverse,
    },
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading repair guide...</Text>
      </View>
    );
  }

  if (error || !guide) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Could not load the repair guide. Please try again later.'}
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Guide Overview */}
        <Card containerStyle={styles.overviewCard}>
          <Card.Title>{guide.title}</Card.Title>
          {guide.imageUrl && (
            <Card.Image source={{ uri: guide.imageUrl }} style={styles.mainImage} />
          )}
          <Text style={styles.description}>{guide.description}</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon name="build" type="material" color={theme.colors.primary} size={20} />
              <Text style={styles.infoText}>Difficulty: {guide.difficulty || 'Moderate'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="access-time" type="material" color={theme.colors.primary} size={20} />
              <Text style={styles.infoText}>Time: {guide.estimatedTime || '30-60 mins'}</Text>
            </View>
          </View>
        </Card>

        {/* Tools Section */}
        {guide.tools && guide.tools.length > 0 && (
          <Card containerStyle={styles.toolsCard}>
            <Card.Title>Tools Needed</Card.Title>
            <Divider style={styles.divider} />
            {guide.tools.map((tool, index) => (
              <View key={index} style={styles.toolItem}>
                <Icon name="check-circle" type="material" color={theme.colors.success} size={16} />
                <Text style={styles.toolText}>{tool}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* Step by Step Guide */}
        {guide.steps && guide.steps.length > 0 && (
          <Card containerStyle={styles.stepsCard}>
            <Card.Title>Step {currentStep + 1} of {guide.steps.length}</Card.Title>
            <Divider style={styles.divider} />
            
            <View style={styles.stepContent}>
              {guide.steps[currentStep].imageUrl && (
                <Image 
                  source={{ uri: guide.steps[currentStep].imageUrl }} 
                  style={styles.stepImage} 
                  resizeMode="contain"
                />
              )}
              <Text style={styles.stepTitle}>{guide.steps[currentStep].title}</Text>
              <Text style={styles.stepDescription}>{guide.steps[currentStep].description}</Text>
              
              {guide.steps[currentStep].tip && (
                <View style={styles.tipContainer}>
                  <Icon name="lightbulb" type="material" color={theme.colors.primary} size={20} />
                  <Text style={styles.tipText}>{guide.steps[currentStep].tip}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.stepNavigation}>
              <TouchableOpacity 
                style={[
                  styles.navButton,
                  currentStep === 0 && styles.disabledButton
                ]}
                onPress={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
              >
                <Icon name="arrow-back" type="material" color={theme.colors.text.inverse} size={20} />
                <Text style={[
                  styles.navButtonText,
                  currentStep === 0 && styles.disabledButtonText
                ]}>Previous</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.navButton,
                  currentStep === guide.steps.length - 1 && styles.disabledButton
                ]}
                onPress={() => currentStep < guide.steps.length - 1 && setCurrentStep(currentStep + 1)}
                disabled={currentStep === guide.steps.length - 1}
              >
                <Text style={[
                  styles.navButtonText,
                  currentStep === guide.steps.length - 1 && styles.disabledButtonText
                ]}>Next</Text>
                <Icon name="arrow-forward" type="material" color={theme.colors.text.inverse} size={20} />
              </TouchableOpacity>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepairGuideScreen;

