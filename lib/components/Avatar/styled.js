import styled from 'styled-components';

import LinearGradient from 'react-native-linear-gradient';

export const Gradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 105%;
  border-radius: 15px;
`;

export const AvatarImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #c4c4c4;
  margin-right: 7px;
`;

export const AvatarText = styled.Text`
  ${p => p.theme.fonts.sizes.text.small};
  color: ${p => (p.active ? 'white' : p.theme.textColor)};
`;

export const Avatar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${p => (p.active ? 0 : 10)}px;
`;
