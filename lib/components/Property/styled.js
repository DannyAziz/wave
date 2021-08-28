import styled from 'styled-components';

import LinearGradient from 'react-native-linear-gradient';

export const BorderGradient = styled(LinearGradient)`
  border-radius: 16px;
  width: 160px;
  height: 96px;
  padding-right: 0.5px;
  justify-content: center;
  align-self: center;

  margin-vertical: 10px;
`;

export const Property = styled.View`
  width: 99%;
  height: 94px;
  margin: 1px;
  border-radius: 16px;
  background: white;
  justify-content: center;
  align-self: center;
`;

export const Name = styled.Text`
  text-align: center;
  ${p => p.theme.fonts.sizes.text.small};
`;

export const Value = styled.Text`
  text-align: center;
  ${p => p.theme.fonts.sizes.link.small};
`;

export const Rarity = styled.Text`
  text-align: center;
  ${p => p.theme.fonts.sizes.text.xSmall};
  opacity: 0.6;
`;
