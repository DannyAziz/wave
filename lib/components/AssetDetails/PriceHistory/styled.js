import styled from 'styled-components';

import {ChartDot, ChartYLabel, ChartXLabel} from '@rainbow-me/animated-charts';

export const Dot = styled(ChartDot)`
  align-items: center;
  background-color: ${({color}) => color};
  justify-content: center;

  top: 2px;
`;

export const InnerDot = styled.View`
  height: 10px;
  border-radius: 5px;
  background-color: ${({color}) => color};
  shadow-color: ${({color}) => color};
  shadow-offset: 0 3px;
  shadow-opacity: 0.6;
  shadow-radius: 4.5px;
  width: 10px;
`;

export const YLabel = styled(ChartYLabel)`
  ${p => p.theme.fonts.sizes.display.bold.small};
`;

export const XLabel = styled.View`
  flex-direction: row;
`;
