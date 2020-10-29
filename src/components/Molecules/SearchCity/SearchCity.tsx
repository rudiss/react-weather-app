import React, { RefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { SearchBar, SearchInput, SearchIcon, RefreshButton } from './styles';
import Loader from '../../Atoms/Loader';

type SearchCityProps = {
  submit: () => void;
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showResult: boolean | unknown;
  isLoading: boolean;
  searchRef: RefObject<HTMLInputElement> | any;
};

const SearchCity: React.FC<SearchCityProps> = ({
  submit,
  value,
  change,
  showResult,
  isLoading,
  searchRef,
}) => {
  return (
    <React.Fragment>
      <SearchBar
        showResult={showResult}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {isLoading && <Loader />}
        <SearchInput
          ref={searchRef}
          type="text"
          value={value}
          placeholder="Digite cidade e pressione enter..."
          onChange={change}
        />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <RefreshButton type="button" onClick={() => submit()}>
          Atualizar
          <FontAwesomeIcon icon={faSyncAlt} />
        </RefreshButton>
      </SearchBar>
    </React.Fragment>
  );
};

export default SearchCity;
