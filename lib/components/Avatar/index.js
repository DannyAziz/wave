import React from 'react';

import * as Styled from './styled';

const Avatar = props => (
  <Styled.Avatar active={props.active}>
    {props.active && (
      <Styled.Gradient
        colors={['#56CCF2', '#2F80ED']}
        start={{x: -14.5253, y: 2.02026}}
        end={{x: 76.659, y: 291.348}}
        useAngle
        angle={108.08}
      />
    )}
    <Styled.AvatarImage source={{uri: props.image}} />
    <Styled.AvatarText active={props.active}>{props.name}</Styled.AvatarText>
  </Styled.Avatar>
);

export default Avatar;
