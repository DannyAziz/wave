import styled from 'styled-components/native';

export const AssetCard = styled.View`
  /* border: 1px solid black; */
  max-height: 50%;
  /* width: 50%; */
  height: 179px;
  margin-bottom: 10px;
  padding: 5px;

  flex-direction: row;
  /* justify-content: space-around; */
`;

export const AssetImage = styled.Image`
  height: 100%;
  flex: 1;
`;

export const AssetInfo = styled.View`
  flex: 1;
  margin-left: 20px;
  padding: 20px 0;
  justify-content: space-between;
`;

export const MainText = styled.Text`
  /* flex: 1; */
  ${p => p.theme.fonts.sizes.display.regular.large}
  color: #353840;
`;
export const SubText = styled.Text`
  /* flex: 1; */
  font-size: 11px;
  color: #707083;
`;
