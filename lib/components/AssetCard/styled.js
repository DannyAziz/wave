import styled from 'styled-components/native';

export const AssetCard = styled.Pressable`
  height: 272px;
  width: 171px;
  border-radius: 16px;

  background-color: ${p => p.theme.bodyColor};
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.08);

  margin-bottom: 30px;
`;

export const AssetImage = styled.Image`
  height: 60%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const AssetInfo = styled.View`
  padding: 5px;
`;

export const AssetNameContainer = styled.View``;

export const AssetPriceContainer = styled.View`
  margin-top: 10px;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

export const AssetName = styled.Text.attrs({
  numberOfLines: 1,
})`
  /* flex: 1; */
  ${p => p.theme.fonts.sizes.link.small}
  color: ${p => p.theme.textColor};
  text-align: center;
`;
export const SubText = styled.Text`
  /* flex: 1; */
  ${p => p.theme.fonts.sizes.text.xSmall}
  color: ${p => p.theme.textColor};
`;

export const PriceLabel = styled(SubText)`
  text-align: right;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Price = styled(AssetName)`
  text-align: right;
`;
