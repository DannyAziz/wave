import styled from 'styled-components';

export const Container = styled.View`
  background-color: ${p => p.theme.backgroundColor};
  position: absolute;
  z-index: 2;
  top: 120px;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const Section = styled.View``;

export const SectionTitle = styled.Text`
  ${p => p.theme.fonts.sizes.display.bold.small};
  color: ${p => p.theme.textColor};
`;

export const Results = styled.View`
  padding: 20px;
`;

export const Message = styled.Text`
  margin-bottom: 15px;
  ${p => p.theme.fonts.sizes.text.small};
  color: ${p => p.theme.colours.text.placeholder};
`;
