import styled from 'styled-components';

export const Avatar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const AvatarImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #c4c4c4;
  margin-right: 7px;
`;

export const AvatarText = styled.Text`
  ${p => p.theme.fonts.sizes.text.small}
`;
