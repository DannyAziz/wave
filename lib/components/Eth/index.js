import React from 'react';

import {useTheme} from 'styled-components';
import Svg, {Path} from 'react-native-svg';

const EthLogo = ({height = '15', width = '15'}) => {
  const theme = useTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 33 53" fill="none">
      {/* Main Diamond Top Right */}
      <Path
        d="M16.3576 0.666687L16.0095 1.85009V36.1896L16.3576 36.5371L32.2976 27.115L16.3576 0.666687Z"
        fill={theme.colours.ethLogo.main.topRight}
      />
      {/* Main Diamond Top Left */}
      <Path
        d="M16.3578 0.666687L0.417816 27.115L16.3578 36.5372V19.8699V0.666687Z"
        fill={theme.colours.ethLogo.main.topLeft}
      />
      {/* Main Diamond Bottom Right */}
      <Path
        d="M16.3575 39.5552L16.1613 39.7944V52.0268L16.3575 52.6L32.307 30.1378L16.3575 39.5552Z"
        fill={theme.colours.ethLogo.main.bottomRight}
      />
      {/* Main Diamond Bottom Left */}
      <Path
        d="M16.3578 52.5998V39.5551L0.417816 30.1377L16.3578 52.5998Z"
        fill={theme.colours.ethLogo.main.bottomLeft}
      />
      {/* Inner Diamond Right */}
      <Path
        d="M16.3575 36.537L32.2973 27.1151L16.3575 19.8699V36.537Z"
        fill={theme.colours.ethLogo.inner.right}
      />
      {/* Inner Diamond Left */}
      <Path
        d="M0.417816 27.1151L16.3576 36.537V19.8699L0.417816 27.1151Z"
        fill={theme.colours.ethLogo.inner.left}
      />
    </Svg>
  );
};

export default EthLogo;
