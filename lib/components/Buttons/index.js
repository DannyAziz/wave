import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
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

const PrimaryButton = ({text}) => (
  <Styled.PrimaryButton>
    <Styled.ButtonGradient
      colors={['#56CCF2', '#2F80ED']}
      start={{x: -14.5253, y: 2.02026}}
      end={{x: 76.659, y: 291.348}}
      useAngle
      angle={108.08}
    />
    <Styled.Text>{text}</Styled.Text>
  </Styled.PrimaryButton>
);

const Button = ({type, text = 'Test'}) => {
  switch (type) {
    case 'primary':
      return <PrimaryButton text={text} />;
    case 'secondary':
      return (
        <Styled.SecondaryButton>
          <GradientText text={text} />
        </Styled.SecondaryButton>
      );
    case 'subtle':
      return (
        <Styled.SubtleButton>
          <GradientText text={text} />
        </Styled.SubtleButton>
      );
    case 'disabled':
      return (
        <Styled.DisabledButton>
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
      return <PrimaryButton text={text} />;
  }
};

export default Button;
