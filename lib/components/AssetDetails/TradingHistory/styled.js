import styled from 'styled-components';

export const Container = styled.View``;

export const TableHeader = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const TableHeaderItem = styled.Text`
  flex: 1;
  ${p => p.theme.fonts.sizes.link.medium};
  color: ${p => p.theme.textColor};
  text-align: center;
`;

export const TableRowContainer = styled.View`
  height: 36px;
  margin-bottom: 5px;
`;

export const TableRow = styled.View`
  flex-direction: row;
`;

export const TableRowPriceItem = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TableRowItem = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: ${p => (p.noFlex ? 'none' : 1)};
  ${p => p.theme.fonts.sizes.text.xSmall};
  color: ${p => p.theme.textColor};
  text-align: center;
`;

export const TableRowDivider = styled.View`
  width: 90%;
  margin: auto;
  height: 1px;
  background-color: #dcdcdc;
`;

export const LoadMoreContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
