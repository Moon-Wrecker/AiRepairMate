// src/utils/mediaUtils.js
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

// Audio recording settings
const RECORDING_OPTIONS = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

// Request camera and library permissions
export const requestMediaPermissions = async () => {
  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
  const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const { status: audioStatus } = await Audio.requestPermissionsAsync();
  
  return {
    camera: cameraStatus === 'granted',
    library: libraryStatus === 'granted',
    audio: audioStatus === 'granted',
  };
};

// Pick image from camera or library
export const pickImage = async (useCamera = false) => {
  try {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    };
    
    let result;
    if (useCamera) {
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync(options);
    }
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Get the selected asset
      const selectedAsset = result.assets[0];
      
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(selectedAsset.uri);
      
      return {
        uri: selectedAsset.uri,
        type: 'image',
        name: selectedAsset.uri.split('/').pop(),
        size: fileInfo.size,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};

// Audio recording functions
let recording = null;

export const startRecording = async () => {
  try {
    // Clear any existing recording
    if (recording !== null) {
      recording.setOnRecordingStatusUpdate(null);
      recording = null;
    }
    
    // Prepare the recording
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    
    // Start recording
    const { recording: newRecording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
    recording = newRecording;
    
    return true;
  } catch (error) {
    console.error('Error starting recording:', error);
    return false;
  }
};

export const stopRecording = async () => {
  try {
    if (!recording) {
      return null;
    }
    
    // Stop recording
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    
    // Reset audio mode
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);
    
    recording = null;
    
    return {
      uri,
      type: 'audio',
      name: uri.split('/').pop(),
      size: fileInfo.size,
    };
  } catch (error) {
    console.error('Error stopping recording:', error);
    return null;
  }
};

// Play audio file
export const playAudio = async (uri) => {
  try {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync({ uri });
    await soundObject.playAsync();
    
    // Return the sound object so it can be unloaded later
    return soundObject;
  } catch (error) {
    console.error('Error playing audio:', error);
    return null;
  }
};

// Mock speech-to-text function (in a real app, you would use a proper speech-to-text service)
export const mockTranscribeAudio = async (audioFile) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock transcription based on filename
  const filename = audioFile.name.toLowerCase();
  
  if (filename.includes('refrigerator') || filename.includes('fridge')) {
    return "My refrigerator is making a strange noise and not cooling properly.";
  } else if (filename.includes('washing') || filename.includes('washer')) {
    return "My washing machine is leaking water during the spin cycle.";
  } else if (filename.includes('dishwasher')) {
    return "The dishwasher isn't draining completely after the wash cycle.";
  } else {
    return "I need help fixing my appliance. It's not working correctly.";
  }
};
