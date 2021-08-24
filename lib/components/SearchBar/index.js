import React from 'react';
import {Image} from 'react-native';
import styled, {useTheme} from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation} from '@react-navigation/native';

import SettingsSlider from '@lib/../assets/settings-sliders.svg';

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
const FilterButton = styled.Pressable`
  width: 43px;
  height: 40px;
  border-radius: 8px;
  background-color: ${p => p.theme.colours.background.grey};

  justify-content: center;
  align-items: center;
`;
export const Gradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;

const SearchBar = ({filterActive}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const openFilter = () => navigation.navigate('Filter');

  return (
    <Wrapper>
      <TextInput placeholder="Search" />
      <FilterButton onPress={openFilter}>
        {filterActive && (
          <Gradient
            colors={['#56CCF2', '#2F80ED']}
            start={{x: -14.5253, y: 2.02026}}
            end={{x: 76.659, y: 291.348}}
            useAngle
            angle={108.08}
          />
        )}
        <SettingsSlider
          stroke={filterActive ? 'white' : theme.colours.text.placeholder}
          width={24}
          height={24}
        />
      </FilterButton>
    </Wrapper>
  );
};

export default SearchBar;
