import React, { createContext, useContext, useState, useEffect } from 'react';

interface AvatarContextType {
  avatarUrl: string;
  setCustomAvatar: (url: string) => void;
  handleFileUpload: (file: File) => void;
  resetToDefault: () => void;
}

const DEFAULT_AVATAR = '/1766735580444.jpg';
const STORAGE_KEY = 'mary_profile_avatar_v2';

const AvatarContext = createContext<AvatarContextType>({
  avatarUrl: DEFAULT_AVATAR,
  setCustomAvatar: () => {},
  handleFileUpload: () => {},
  resetToDefault: () => {},
});

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrlState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    }
    return DEFAULT_AVATAR;
  });

  const setCustomAvatar = (url: string) => {
    setAvatarUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch {
      // quota or private mode safe
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomAvatar(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetToDefault = () => {
    setAvatarUrlState(DEFAULT_AVATAR);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // safe
    }
  };

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        setCustomAvatar,
        handleFileUpload,
        resetToDefault,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
