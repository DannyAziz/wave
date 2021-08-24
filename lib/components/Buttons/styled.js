import styled from 'styled-components';

import LinearGradient from 'react-native-linear-gradient';

export const ButtonGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
`;

export const Text = styled.Text`
  opacity: ${p => (p.mask ? 0 : 1)};
  color: white;
  ${p => p.theme.fonts.sizes.link.medium};
`;

const Button = styled.Pressable`
  width: 156px;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 30px 7px;

  border-radius: 4px;
`;

export const PrimaryButton = styled(Button)`
  background: black;
`;

export const SecondaryButton = styled(Button)`
  border: 1px solid ${p => p.theme.colours.fill.primary};
`;

export const SubtleButton = styled(SecondaryButton)`
  border: 1px solid ${p => p.theme.colours.text.placeholder};
`;

export const DisabledButton = styled(PrimaryButton)`
  opacity: 0.5;
`;
