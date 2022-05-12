import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.error('err', error);
  }
};
