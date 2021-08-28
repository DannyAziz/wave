import React from 'react';

import styled from 'styled-components';

const TextInput = styled.TextInput.attrs(p => ({
  placeholderTextColor: p.theme.colours.text.placeholder,
  clearButtonMode: 'always',
}))`
  border-radius: 8px;
  height: 40px;
  min-width: 145px;
  padding-left: 12px;
  background-color: ${p => p.theme.colours.background.grey};
  color: ${p => p.theme.colours.text.black};
`;

export default TextInput;
