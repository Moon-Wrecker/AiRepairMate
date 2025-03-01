import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '../theme/ThemeContext';

const ToolsRecommendation = ({ tools, onToolPress }) => {
  const theme = useTheme();

  const styles = {
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      margin: theme.spacing.md,
      padding: theme.spacing.md,
      ...theme.shadows.light,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    headerIcon: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      marginRight: theme.spacing.sm,
    },
    headerText: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
    },
    scrollContainer: {
      maxHeight: 300,
    },
    toolItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
      ...theme.shadows.light,
    },
    toolInfo: {
      flex: 1,
      marginLeft: theme.spacing.sm,
    },
    toolName: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    toolDescription: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.text.secondary,
    },
    categoryTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
      alignSelf: 'flex-start',
      marginTop: theme.spacing.xs,
    },
    categoryText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.xs,
      marginLeft: theme.spacing.xs,
    },
    essentialBadge: {
      position: 'absolute',
      top: theme.spacing.xs,
      right: theme.spacing.xs,
      backgroundColor: theme.colors.error,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    essentialText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.bold,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Icon 
            name="build" 
            type="material" 
            color={theme.colors.text.inverse} 
            size={24}
          />
        </View>
        <Text style={styles.headerText}>Recommended Tools</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {tools.map((tool, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.toolItem}
            onPress={() => onToolPress && onToolPress(tool)}
          >
            <Icon 
              name={tool.icon || "handyman"} 
              type="material" 
              color={theme.colors.primary}
              size={24}
            />
            <View style={styles.toolInfo}>
              <Text style={styles.toolName}>{tool.name}</Text>
              {tool.description && (
                <Text style={styles.toolDescription} numberOfLines={2}>
                  {tool.description}
                </Text>
              )}
              {tool.category && (
                <View style={styles.categoryTag}>
                  <Icon 
                    name="category" 
                    type="material" 
                    color={theme.colors.text.inverse} 
                    size={12}
                  />
                  <Text style={styles.categoryText}>{tool.category}</Text>
                </View>
              )}
            </View>
            {tool.essential && (
              <View style={styles.essentialBadge}>
                <Text style={styles.essentialText}>Essential</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ToolsRecommendation;
