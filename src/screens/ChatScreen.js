import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { sendMessageToAI } from '../api/repairApi';

const ChatScreen = ({ navigation }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      content: 'Hello! I\'m your DIY Repair Assistant. How can I help you today? Try asking about fixing a leaky faucet or other home repairs.',
      type: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'DIY Repair Assistant',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.text.inverse,
      headerTitleStyle: {
        fontWeight: theme.typography.weights.bold,
      },
    });
  }, [navigation, theme]);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    setSending(true);
    try {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        content: message,
        type: 'user',
        timestamp: new Date().toISOString(),
      };
      
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Get AI response using the mock API
      const aiResult = await sendMessageToAI(message, messages);
      
      // Create AI response message with guides and tools
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: aiResult.message,
        type: 'assistant',
        timestamp: new Date().toISOString(),
        repairGuides: aiResult.repairGuides || [],
        tools: aiResult.tools || [],
        difficulty: aiResult.difficulty
      };
      
      setMessages([...updatedMessages, aiResponse]);

      // Scroll to the bottom
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  const handleGuidePress = (guideId, title) => {
    navigation.navigate('RepairGuide', { guideId, title });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      ...(Platform.OS === 'web' ? {
        height: '100vh',
        overflow: 'hidden',
      } : {}),
    },
    chatContainer: {
      flex: 1,
      flexDirection: 'column',
      ...(Platform.OS === 'web' ? {
        height: 'calc(100vh - 60px)', // Adjust for header height
        position: 'relative',
      } : {}),
    },
    messageList: {
      flex: 1,
      padding: theme.spacing.md,
      ...(Platform.OS === 'web' ? {
        overflowY: 'auto',
        height: 'calc(100% - 60px)', // Adjust for input height
      } : {}),
    },
    loadingContainer: {
      position: 'absolute',
      bottom: 80,
      left: 20,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 1,
      ...theme.shadows.light,
    },
    loadingText: {
      marginLeft: theme.spacing.sm,
      color: theme.colors.text.secondary,
      fontSize: theme.typography.sizes.sm,
    },
    inputContainer: {
      ...(Platform.OS === 'web' ? {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      } : {}),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          style={styles.messageList}
          data={messages}
          renderItem={({ item }) => (
            <ChatMessage
              message={item}
              onGuidePress={handleGuidePress}
            />
          )}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          onLayout={() => flatListRef.current?.scrollToEnd()}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
        {sending && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Assistant is thinking...</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <ChatInput 
            onSend={handleSend}
            disabled={sending}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
