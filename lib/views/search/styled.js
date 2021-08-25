import styled from 'styled-components';

export const CollectionSection = styled.View`
  min-height: 300px;
  width: 100%;
  padding: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

export const CollectionImage = styled.Image`
  height: 75px;
  width: 75px;
  border-radius: 37.5px;
`;

export const CollectionName = styled.Text`
  ${p => p.theme.fonts.sizes.display.bold.large};
  color: ${p => p.theme.textColor};
`;

export const CollectionDescription = styled.Text`
  ${p => p.theme.fonts.sizes.text.medium};
  color: ${p => p.theme.textColor};
  text-align: center;
`;

export const CollectionStats = styled.View`
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const CollectionStat = styled.View`
  width: 83px;
  height: 72px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid black;
  justify-content: space-evenly;
  margin-right: ${p => (p.last ? 0 : 5)}px;
`;

export const CollectionStatTitle = styled.Text`
  text-align: center;
  ${p => p.theme.fonts.sizes.text.small};
  color: ${p => p.theme.textColor};
`;
export const CollectionStatValue = styled.Text`
  text-align: center;
  ${p => p.theme.fonts.sizes.link.small};
  color: ${p => p.theme.textColor};
`;
