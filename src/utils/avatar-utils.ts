// Types for avatar customization
export interface AvatarCustomization {
  scale?: number;
  radius?: number;
  size?: number;
  seed?: string;
  backgroundColor?: string;
  primaryColor?: string;
}

/**
 * Generates a consistent avatar URL using DiceBear Bottts
 * @param seed - Unique identifier (address, username, etc.) to generate the avatar
 * @param theme - Current theme ('light' or 'dark')
 * @param customization - Optional customization parameters
 * @returns URL string for the avatar
 */
export const generateAvatar = (
  seed: string,
  theme: 'light' | 'dark' = 'light',
  customization: AvatarCustomization = {}
) => {
  const {
    scale = 110,
    radius = 8,
    size = 128,
    backgroundColor: customBg,
    primaryColor: customPrimary,
  } = customization;

  // Theme-based or custom colors
  const backgroundColor = customBg || (theme === 'dark' ? '18181b' : 'ffffff');
  const primaryColor = customPrimary || (theme === 'dark' ? 'cdeb63' : '18181b');

  const baseUrl = 'https://api.dicebear.com/7.x/bottts/svg';
  const params = new URLSearchParams({
    seed: customization.seed || seed,
    backgroundColor,
    primaryColor,
    scale: scale.toString(),
    radius: radius.toString(),
    size: size.toString(),
    translateX: '2',
    translateY: '2'
  });

  return `${baseUrl}?${params.toString()}`;
};

// Storage key for custom avatar settings
const AVATAR_SETTINGS_KEY = 'userAvatarSettings';

/**
 * Saves custom avatar settings to local storage
 */
export const saveAvatarSettings = (address: string, settings: AvatarCustomization) => {
  const allSettings = JSON.parse(localStorage.getItem(AVATAR_SETTINGS_KEY) || '{}');
  allSettings[address] = settings;
  localStorage.setItem(AVATAR_SETTINGS_KEY, JSON.stringify(allSettings));
};

/**
 * Gets saved avatar settings from local storage
 */
export const getAvatarSettings = (address: string): AvatarCustomization | undefined => {
  const allSettings = JSON.parse(localStorage.getItem(AVATAR_SETTINGS_KEY) || '{}');
  return allSettings[address];
};

/**
 * Gets the ENS avatar or generates a fallback DiceBear avatar
 * @param ensAvatar - ENS avatar URL if available
 * @param address - Wallet address or other unique identifier
 * @param theme - Current theme ('light' or 'dark')
 * @returns Avatar URL string
 */
export const getAvatarUrl = (
  ensAvatar: string | null | undefined, 
  address: string,
  theme: 'light' | 'dark' = 'light'
) => {
  if (ensAvatar) return ensAvatar;
  
  // Check for custom settings
  const customSettings = getAvatarSettings(address);
  return generateAvatar(address, theme, customSettings);
};
