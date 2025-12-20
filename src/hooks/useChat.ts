import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Simulated AI responses for demo
const getAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('turn off') && lowerMessage.includes('light')) {
    return "I've turned off the lights. Is there anything else you'd like me to do?";
  }
  if (lowerMessage.includes('turn on') && lowerMessage.includes('light')) {
    return "I've turned on the lights for you. Let me know if you'd like to adjust the brightness.";
  }
  if (lowerMessage.includes('temperature') || lowerMessage.includes('thermostat')) {
    return "The current temperature is 72°F. Would you like me to adjust it?";
  }
  if (lowerMessage.includes('set') && lowerMessage.includes('72')) {
    return "Done! I've set the temperature to 72°F. It should reach that in about 10 minutes.";
  }
  if (lowerMessage.includes('camera') || lowerMessage.includes('video') || lowerMessage.includes('see')) {
    return "I'm opening the camera view for you. I can see the front door camera has detected some motion recently.";
  }
  if (lowerMessage.includes('lock') || lowerMessage.includes('door')) {
    return "All doors are currently locked. The front door was last accessed at 3:45 PM today.";
  }
  if (lowerMessage.includes('good morning') || lowerMessage.includes('morning')) {
    return "Good morning! I've activated your morning routine: lights are gradually brightening, thermostat is set to 70°F, and your coffee maker is starting up.";
  }
  if (lowerMessage.includes('good night') || lowerMessage.includes('night')) {
    return "Goodnight! I've turned off all lights, locked the doors, set the thermostat to 68°F, and armed the security system.";
  }
  if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you feel')) {
    return "I'm doing well, thank you for asking! I'm here to help make your home comfortable. Is there something on your mind?";
  }
  if (lowerMessage.includes('sad') || lowerMessage.includes('stressed') || lowerMessage.includes('anxious')) {
    return "I'm sorry to hear that. Would you like me to adjust the ambiance? I can dim the lights, play some calming music, or set a comfortable temperature. Taking care of your environment can help you feel better.";
  }
  if (lowerMessage.includes('happy') || lowerMessage.includes('excited')) {
    return "That's wonderful to hear! 😊 Your positive energy is contagious. Is there anything special I can help you set up to celebrate?";
  }
  
  return "I understand. I'm here to help you control your home or just chat. You can ask me to control devices, check status, or talk about anything on your mind.";
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(content),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
