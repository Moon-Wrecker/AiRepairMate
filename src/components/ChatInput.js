// src/components/ChatInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '../theme/ThemeContext';

const ChatInput = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  const inputStyles = {
    container: {
      flexDirection: 'row',
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    input: {
      flex: 1,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      maxHeight: 100,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.text.primary,
      fontSize: theme.typography.sizes.md,
    },
    sendButton: {
      width: 45,
      height: 45,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: theme.spacing.sm,
      ...theme.shadows.light,
    },
    disabledButton: {
      backgroundColor: theme.colors.secondary,
      opacity: 0.7,
    },
  };

  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Ask about a repair..."
        placeholderTextColor={theme.colors.text.secondary}
        multiline
        returnKeyType="send"
        onSubmitEditing={handleSend}
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={[
          inputStyles.sendButton,
          isLoading && inputStyles.disabledButton
        ]} 
        onPress={handleSend}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon name="hourglass-empty" type="material" color={theme.colors.text.inverse} />
        ) : (
          <Icon name="send" type="material" color={theme.colors.text.inverse} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;


