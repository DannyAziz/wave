import styled from 'styled-components';

import {Dimensions} from 'react-native';

export const Text = styled.Text`
  ${p => p.theme.fonts.sizes.text.medium};
  color: ${p => p.theme.textColor};
`;

export const Links = styled.ScrollView`
  width: ${Dimensions.get('window').width}px;
  margin: 0 -20px;
`;
