import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TabContextProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <TabContext.Provider value={{ selectedTag, setSelectedTag }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};