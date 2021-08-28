import styled from 'styled-components';

import {SafeAreaView} from 'react-native-safe-area-context';

const Container = styled(SafeAreaView).attrs({
  edges: ['top'],
})`
  background-color: ${p => p.theme.backgroundColor};
`;

export default Container;
