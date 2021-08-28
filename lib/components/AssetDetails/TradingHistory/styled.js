import styled from 'styled-components';

export const Container = styled.View``;

export const TableHeader = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const TableHeaderItem = styled.Text`
  flex: 1;
  ${p => p.theme.fonts.sizes.link.medium};
  text-align: center;
`;

export const TableRowContainer = styled.View`
  height: 36px;
  margin-bottom: 5px;
`;

export const TableRow = styled.View`
  flex-direction: row;
`;

export const TableRowItem = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 1;
  ${p => p.theme.fonts.sizes.text.xSmall};
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
