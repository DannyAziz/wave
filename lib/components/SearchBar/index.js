import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.View`
  width: 80%;
  margin: auto;
  padding: 20px 0;
  flex-direction: row;
  justify-content: space-between;
`;
const TextInput = styled.TextInput.attrs(p => ({
  placeholderTextColor: p.theme.colours.text.placeholder,
  clearButtonMode: 'always',
}))`
  width: 80%;
  height: 40px;
  border-radius: 8px;
  padding-left: 12px;
  background-color: ${p => p.theme.colours.background.grey};
  color: ${p => p.theme.colours.text.black};
`;
const FilterButton = styled.View`
  width: 43px;
  height: 40px;
  border-radius: 8px;
  background-color: ${p => p.theme.colours.background.grey};
`;

const SearchBar = () => {
  return (
    <Wrapper>
      <TextInput placeholder="Search" />
      <FilterButton />
    </Wrapper>
  );
};

export default SearchBar;
