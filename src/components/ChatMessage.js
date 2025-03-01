// src/components/ChatMessage.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useTheme } from '../theme/ThemeContext';
import { format } from 'date-fns';

const ChatMessage = ({ message, onGuidePress }) => {
  const theme = useTheme();
  const isUser = message.type === 'user';

  const styles = {
    container: {
      marginVertical: theme.spacing.xs,
      alignItems: isUser ? 'flex-end' : 'flex-start',
    },
    bubble: {
      maxWidth: '80%',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: isUser ? theme.colors.primary : theme.colors.surface,
      ...theme.shadows.light,
    },
    messageText: {
      color: isUser ? theme.colors.text.inverse : theme.colors.text.primary,
      fontSize: theme.typography.sizes.md,
    },
    timestamp: {
      fontSize: theme.typography.sizes.xs,
      color: isUser ? theme.colors.text.inverse : theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
      opacity: 0.8,
    },
    guidesContainer: {
      marginTop: theme.spacing.md,
    },
    guidesTitle: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    guideCard: {
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      ...theme.shadows.light,
    },
    guideTitle: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
    },
    guideImage: {
      height: 150,
      borderRadius: theme.borderRadius.sm,
    },
    guideDifficulty: {
      marginTop: theme.spacing.xs,
      fontStyle: 'italic',
      color: theme.colors.text.secondary,
      fontSize: theme.typography.sizes.sm,
    },
    toolsContainer: {
      marginTop: theme.spacing.md,
    },
    toolsTitle: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    toolItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    toolText: {
      marginLeft: theme.spacing.xs,
      color: theme.colors.text.primary,
      fontSize: theme.typography.sizes.sm,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.messageText}>{message.content}</Text>
        <Text style={styles.timestamp}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </Text>

        {message.repairGuides && message.repairGuides.length > 0 && (
          <View style={styles.guidesContainer}>
            <Text style={styles.guidesTitle}>Repair Guides:</Text>
            {message.repairGuides.map((guide, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => onGuidePress(guide.id, guide.title)}
              >
                <Card containerStyle={styles.guideCard}>
                  <Text style={styles.guideTitle}>{guide.title}</Text>
                  {guide.imageUrl && (
                    <Card.Image 
                      source={{ uri: guide.imageUrl }} 
                      style={styles.guideImage}
                    />
                  )}
                  <Text style={styles.guideDifficulty}>
                    Difficulty: {guide.difficulty || 'Moderate'}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {message.tools && message.tools.length > 0 && (
          <View style={styles.toolsContainer}>
            <Text style={styles.toolsTitle}>Recommended Tools:</Text>
            {message.tools.map((tool, index) => (
              <View key={index} style={styles.toolItem}>
                <Icon 
                  name="build"
                  type="material"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text style={styles.toolText}>{tool}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatMessage;
