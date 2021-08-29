import React from 'react';

import styled from 'styled-components';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import BackIcon from '@lib/../assets/arrow-left.svg';

const BackButtonContainer = styled.Pressable`
  position: absolute;
  top: 35px;
  left: 10px;
  z-index: 2;
`;

const BackButton = ({onPress}) => {
  const wrappedOnPress = () => {
    if (onPress) {
      ReactNativeHapticFeedback.trigger('impactMedium');
      onPress();
    }
  };

  return (
    <BackButtonContainer onPress={wrappedOnPress}>
      <BackIcon height={48} width={48} />
    </BackButtonContainer>
  );
};

export default BackButton;
