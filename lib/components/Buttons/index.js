import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import * as Styled from './styled';

// linear-gradient(108.08deg, #56CCF2 -2.53%, #2F80ED 106.16%)

const GradientText = ({text}) => (
  <MaskedView maskElement={<Styled.Text>{text}</Styled.Text>}>
    <LinearGradient
      colors={['#56CCF2', '#2F80ED']}
      start={{x: -14.5253, y: 2.02026}}
      end={{x: 76.659, y: 291.348}}
      useAngle
      angle={108.08}>
      <Styled.Text mask>{text}</Styled.Text>
    </LinearGradient>
  </MaskedView>
);

const PrimaryButton = props => (
  <Styled.PrimaryButton {...props}>
    <Styled.ButtonGradient
      colors={['#56CCF2', '#2F80ED']}
      start={{x: -14.5253, y: 2.02026}}
      end={{x: 76.659, y: 291.348}}
      useAngle
      angle={108.08}
    />
    <Styled.Text>{props.text}</Styled.Text>
  </Styled.PrimaryButton>
);

const Button = props => {
  const {type, text, onPress} = props;

  const wrappedOnPress = () => {
    if (onPress) {
      ReactNativeHapticFeedback.trigger('impactMedium');
      onPress();
    }
  };

  switch (type) {
    case 'primary':
      return <PrimaryButton text={text} {...props} onPress={wrappedOnPress} />;
    case 'secondary':
      return (
        <Styled.SecondaryButton {...props} onPress={wrappedOnPress}>
          <GradientText text={text} />
        </Styled.SecondaryButton>
      );
    case 'subtle':
      return (
        <Styled.SubtleButton {...props} onPress={wrappedOnPress}>
          <GradientText text={text} />
        </Styled.SubtleButton>
      );
    case 'disabled':
      return (
        <Styled.DisabledButton {...props} onPress={wrappedOnPress}>
          <Styled.ButtonGradient
            colors={['#56CCF2', '#2F80ED']}
            start={{x: -14.5253, y: 2.02026}}
            end={{x: 76.659, y: 291.348}}
            useAngle
            angle={108.08}
          />
          <Styled.Text>{text}</Styled.Text>
        </Styled.DisabledButton>
      );
    default:
      return <PrimaryButton text={text} {...props} onPress={wrappedOnPress} />;
  }
};

export default Button;
