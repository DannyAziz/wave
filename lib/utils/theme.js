const _DEFAULTS = {
  _BLACK: '#222222',
  _WHITE: '#FFFFFF',
  _BODY: '#333333',
  _FONT_FAMILY: 'Poppins',
};

const FONTS = Object.freeze({
  sizes: {
    display: {
      regular: {
        large: `
          fontFamily: "Poppins-Regular";
          font-size: 40px;
          line-height: 48px;
          /* or 120% */

          letter-spacing: 1px;`,
        medium: `
          fontFamily: "Poppins-Regular";
          font-size: 32px;
          line-height: 36px;
          /* or 112% */

          letter-spacing: 1px;
        `,
        small: `
          fontFamily: "Poppins-Regular";
          font-size: 24px;
          line-height: 32px;
          /* or 133% */

          letter-spacing: 1px;
        `,
      },
      bold: {
        large: `
          fontFamily: "Poppins-Bold";
          font-size: 40px;
          line-height: 48px;
          /* or 120% */

          letter-spacing: 1px;
        `,
        medium: `
          fontFamily: "Poppins-Bold";
          font-size: 32px;
          /* or 112% */

          letter-spacing: 0.01px;
        `,
        small: `
          fontFamily: "Poppins-Bold";
          font-size: 24px;
          line-height: 32px;
          /* or 133% */

          letter-spacing: 0.01px;
        `,
      },
    },
    text: {
      large: `
        fontFamily: "Poppins-Regular";
        font-size: 20px;
        line-height: 28px;
      `,
      medium: `
        fontFamily: "Poppins-Regular";
        font-size: 16px;
        line-height: 22px;
      `,
      small: `
        fontFamily: "Poppins-Regular";
        font-size: 14px;
        line-height: 20px;
      `,
      xSmall: `
        fontFamily: "Poppins-Regular";
        font-size: 10px;
        line-height: 12px;
      `,
    },
    link: {
      large: `
        fontFamily: "Poppins-Bold";
        font-size: 20px;
        line-height: 28px;
      `,
      medium: `
        fontFamily: "Poppins-Bold";
        font-size: 16px;
        line-height: 24px;
      `,
      small: `
        fontFamily: "Poppins-Bold";
        font-size: 14px;
        line-height: 20px;
      `,
      xSmall: `
        fontFamily: "Poppins-SemiBold";
        font-size: 10px;
        line-height: 12px;
      `,
    },
  },
});

const SHADOWS = Object.freeze({
  none: '',
  smallest: '0px 2px 2px -1px rgba(78, 78, 110, 0.12)',
  small: '0px 2px 4px -1px rgba(78, 78, 110, 0.18)',
  medium:
    '0px 9px 60px rgba(78, 78, 110, 0.0282725), 0px 4.27116px 13.4018px rgba(78, 78, 110, 0.0417275), 0px 2.2612px 3.99006px rgba(78, 78, 110, 0.07)',
  big: '0px 6px 13px rgba(78, 78, 110, 0.11), 0px 1.34018px 2.90372px rgba(78, 78, 110, 0.0655718), 0px 0.399006px 0.864513px rgba(78, 78, 110, 0.0444282)',
  biggest:
    '0px 15px 40px rgba(78, 78, 110, 0.07), 0px 4.52206px 12.0588px rgba(78, 78, 110, 0.0456112), 0px 1.87823px 5.00862px rgba(78, 78, 110, 0.035), 0px 0.67932px 1.81152px rgba(78, 78, 110, 0.0243888)',
});

const BORDERS = Object.freeze({
  small: '12px',
  medium: '18px',
  large: '21px',
});

const COLOURS = Object.freeze({
  primary: {
    black: _DEFAULTS._BLACK,
    white: _DEFAULTS._WHITE,
  },
  // background colors
  background: {
    white: _DEFAULTS._WHITE,
    black: _DEFAULTS._BLACK,
    body: _DEFAULTS._BODY,
    grey: '#F0F0F0',
  },
  textInput: {
    background: '#F0F0F0',
  },
  // Text colors
  text: {
    black: _DEFAULTS._BODY,
    white: '#FCFCFC',
    pureWhite: _DEFAULTS._WHITE,
    placeholder: '#888888',
  },
});

const DARKCOLOURS = Object.freeze({
  primary: {
    black: _DEFAULTS._BLACK,
    white: _DEFAULTS._WHITE,
  },
  // background colors
  background: {
    white: _DEFAULTS._WHITE,
    black: _DEFAULTS._BLACK,
    body: _DEFAULTS._BODY,
    grey: '#F0F0F0',
  },
  textInput: {
    background: _DEFAULTS._BODY,
  },
  // Text colors
  text: {
    black: _DEFAULTS._BODY,
    white: '#FCFCFC',
    pureWhite: _DEFAULTS._WHITE,
    placeholder: '#888888',
  },
});

const baseTheme = Object.freeze({
  colours: COLOURS,
  fonts: FONTS,
  shadows: SHADOWS,
  borders: BORDERS,
  zIndexes: {
    base: 1,
  },
});

export const lightTheme = Object.freeze({
  ...baseTheme,
  backgroundColor: COLOURS.background.white,
  bodyColor: COLOURS.background.white,
  textColor: COLOURS.text.black,
});

export const darkTheme = Object.freeze({
  ...baseTheme,
  colours: DARKCOLOURS,
  backgroundColor: COLOURS.background.black,
  bodyColor: COLOURS.background.body,
  textColor: COLOURS.text.white,
});
