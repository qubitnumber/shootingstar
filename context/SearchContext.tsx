import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextProps {
  searchTag: string;
  setSearchTag: (tag: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTag, setSearchTag] = useState('');

  return (
    <SearchContext.Provider value={{ searchTag, setSearchTag }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};