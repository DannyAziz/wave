import React from 'react';

import styled from 'styled-components';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export const BorderGradient = styled(LinearGradient)`
  border-radius: 15px;
  min-width: 30px;
  height: 32px;
  margin-horizontal: 12px;
  padding-right: 0.5px;
  justify-content: center;
  align-self: center;
`;

export const BGGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
`;

const StyledPill = styled.Pressable`
  height: 30px;
  width: 99%;
  border-radius: 15px;
  margin: 0 1px;
  justify-content: center;
  align-items: center;
  padding: 0 16px;

  background: white;
`;

const Text = styled.Text`
  opacity: ${p => (p.mask ? 0 : 1)};
  ${p => p.theme.fonts.sizes.link.medium};
  color: white;
`;

const GradientText = ({text}) => (
  <MaskedView maskElement={<Text>{text}</Text>}>
    <LinearGradient
      colors={['#56CCF2', '#2F80ED']}
      start={{x: -14.5253, y: 2.02026}}
      end={{x: 76.659, y: 291.348}}
      useAngle
      angle={108.08}>
      <Text mask>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

const Pill = props => {
  const {text, active} = props;

  return (
    <BorderGradient
      colors={['#56CCF2', '#2F80ED']}
      start={{x: -14.5253, y: 2.02026}}
      end={{x: 76.659, y: 291.348}}
      useAngle
      angle={108.08}>
      <StyledPill {...props}>
        {active && (
          <BGGradient
            colors={['#56CCF2', '#2F80ED']}
            start={{x: -14.5253, y: 2.02026}}
            end={{x: 76.659, y: 291.348}}
            useAngle
            angle={108.08}
          />
        )}
        {active ? <Text>{text}</Text> : <GradientText text={text} />}
      </StyledPill>
    </BorderGradient>
  );
};

export default Pill;
