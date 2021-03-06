import React from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import styled from 'styled-components';

const TextInput = styled.TextInput.attrs(p => ({
  placeholderTextColor: p.theme.colours.text.placeholder,
  clearButtonMode: 'always',
  onPressIn: () => {
    ReactNativeHapticFeedback.trigger('selection');
  },
}))`
  border-radius: 8px;
  height: 40px;
  min-width: 145px;
  padding-left: 12px;
  background-color: ${p => p.theme.colours.textInput.background};
  color: ${p => p.theme.textColor};
`;

export default TextInput;
