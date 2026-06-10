import Constants from 'expo-constants';

type ConstantExtra = {
  API_URL?: string;
};

export const constantExtras = Constants.expoConfig?.extra as ConstantExtra;
