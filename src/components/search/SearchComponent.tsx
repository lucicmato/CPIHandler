import React, { ChangeEvent } from 'react';

import styles from './SearchComponent.module.scss';

interface SearchComponentProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ handleInputChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="search">Search:</label>
      <input
        id="search"
        type="text"
        className={styles.paddingInput}
        placeholder="Enter first name"
        name="firstName"
        onChange={e => {
          handleInputChange(e);
        }}
      />
    </div>
  );
};

export default SearchComponent;
