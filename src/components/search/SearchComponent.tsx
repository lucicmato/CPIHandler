import React, { ChangeEvent } from 'react';

import styles from './SearchComponent.module.scss';

interface SearchComponentProps {
  labelMessage: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ labelMessage, handleInputChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="search">{labelMessage}</label>
      <input
        id="search"
        type="text"
        className={styles.paddingInput}
        placeholder="Search..."
        name="firstName"
        onChange={e => {
          handleInputChange(e);
        }}
      />
    </div>
  );
};

export default SearchComponent;
