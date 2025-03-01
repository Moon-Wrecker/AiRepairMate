import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '../theme/ThemeContext';

const RepairGuideItem = ({ guide, onPress }) => {
  const theme = useTheme();

  const styles = {
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      marginVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.md,
      ...theme.shadows.light,
    },
    touchable: {
      overflow: 'hidden',
      borderRadius: theme.borderRadius.md,
    },
    imageContainer: {
      height: 150,
      width: '100%',
      backgroundColor: theme.colors.background,
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    contentContainer: {
      padding: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    description: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
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
    difficultyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    difficultyText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.sm,
      marginLeft: theme.spacing.xs,
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={styles.imageContainer}>
          {guide.imageUrl ? (
            <Image source={{ uri: guide.imageUrl }} style={styles.image} />
          ) : (
            <View style={[styles.image, { backgroundColor: theme.colors.surface }]} />
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {guide.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {guide.description}
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Icon name="access-time" type="material" size={16} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>{guide.estimatedTime || '30-60 mins'}</Text>
            </View>
            <View style={styles.difficultyContainer}>
              <Icon name="build" type="material" size={16} color={theme.colors.text.inverse} />
              <Text style={styles.difficultyText}>
                {guide.difficulty || 'Moderate'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RepairGuideItem;
