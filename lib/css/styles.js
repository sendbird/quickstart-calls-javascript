import jss from 'jss'
import preset from 'jss-preset-default'

/*** assets ***/
import logoMid from '../assets/ic-logo-inverse-01.svg';
import logoSmall from '../assets/ic-logo-purple-300.svg';
import logoBig from '../assets/ic-logo-horizontal-purple-300.svg';
import audioIcon from '../assets/ic-callkit-audio.svg';
import audioOffBlack from '../assets/ic-callkit-audio-off-black.svg';
import audioOffWhite from '../assets/ic-callkit-audio-off-white.svg';
import declineIcon from '../assets/ic-callkit-decline.svg';
import endIcon from '../assets/ic-callkit-end.svg';
import widgetIcon from '../assets/ic-call-logs-filled.svg';
import widgetCloseIcon from '../assets/ic-close-24.svg';

const option = Object.assign(
  {},
  preset(),
  {
    createGenerateId: () => {
      return (rule, sheet) => `sendbird-sample-${rule.key}`;
    }
  }
);

jss.setup(option);

const colors = {
  navy50: '#f6f8fc',
  navy100: '#dee2f2',
  navy200: '#c9d0e6',
  navy900: '#212242',
  white: '#ffffff',
  purple300: '#825eeb',
  green300: '#1fcca1',
  green400: '#00998c',
  red300: '#f24d6b',
  red400: '#d92148',
  mutegray: 'rgba(255, 255, 255, 0.2)'
};

const styles = {
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  right: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  column: {
    display: 'flex',
    flexDirection: 'column'
  },

  row: {
    display: 'flex',
    flexDirection: 'row'
  },

  grow1: {
    flexGrow: 1
  },

  grow2: {
    flexGrow: 2
  },

  grow3: {
    flexGrow: 3
  },

  grow4: {
    flexGrow: 4
  },

  btn: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    borderRadius: '4px',
    height: '40px',
    '& label': {
      cursor: 'inherit'
    }
  },

  btnPrimary: {
    backgroundColor: colors.purple300,
    color: colors.white
  },

  btnBig: {
    width: '180px',
    height: '50px',
    marginLeft: '16px',
    marginRight: '16px'
  },

  btnMid: {
    width: '80px',
    height: '40px',
  },

  btns: {
    width: '100%',
    marginBottom: '23px',
    '& $btn': {
      marginLeft: '10px'
    },
    '& $btn:first-child': {
      marginLeft: '0px'
    }
  },

  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  hidden: {
    display: 'none'
  },

  invisible: {
    visibility: 'hidden'
  },

  logoSmall: {
    width: '24px',
    height: '24px',
    marginLeft: '24px',
    marginRight: '16px',
    backgroundImage: `url(${logoSmall})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  profileSmall: {
    width: '36px',
    height: '36px',
    marginLeft: '24px',
    marginRight: '16px',
    objectFit: 'cover',
    backgroundImage: data => `url(${data.profileUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  logoMid: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: `${colors.white}`,
    backgroundImage: `url(${logoMid})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginBottom: '16px'
  },

  logoBig: {
    display: 'block',
    width: '180px',
    height: '40px',
    background: `url(${logoBig})`,
    marginBottom: '24px'
  },


  /*** views ***/
  view: {
    boxSizing: 'border-box',
    width: '100vw',
    height: '100%',
    padding: '24px'
  },

  viewDial: {
    backgroundColor: colors.navy50,
    color: colors.navy900
  },

  viewLogin: {
    backgroundColor: colors.navy50,
    color: colors.navy900
  },

  viewCall: {
    backgroundColor: colors.navy900,
    color: colors.white
  },

  viewDialWidget: {
    padding: 0,
    '& $formContainer': {
      boxSizing: 'border-box',
      flexGrow: '1',
      paddingLeft: '24px',
      paddingRight: '24px',
      border: 'none'
    },
    '& $field': {
      marginTop: '40px',
      marginBottom: '8px'
    }
  },


  /*** fonts ***/
  fontSmall: {
    fontFamily: 'Avenir Next',
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal'
  },

  fontNormal: {
    fontFamily: 'Avenir Next',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: 'normal'
  },

  fontMidBig: {
    fontFamily: 'Avenir Next',
    fontSize: '18px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.33',
    letterSpacing: '-0.25px'
  },

  fontBig: {
    fontFamily: 'Avenir Next',
    height: '32px',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.33',
    letterSpacing: '-0.25px'
  },

  fontHeavy: {
    fontWeight: 500
  },


  /*** components ***/
  formContainer: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '4px',
    border: 'solid 1px #dee2f2',
    backgroundColor: colors.white,
    paddingLeft: '48px',
    paddingRight: '48px'
  },

  field: {
    boxSizing: 'border-box',
    width: '100%',
    height: '40px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '16px',
    borderRadius: '4px',
    border: `solid 1px ${colors.navy200}`,
    backgroundColor: colors.white,
    marginBottom: '22px'
  },

  fieldInvalid: {
    border: `solid 1px ${colors.red300}`
  },

  fieldLabel: {
    display: 'inline-block',
    height: '12px',
    marginTop: '6px',
    marginBottom: '6px',
    '&:first-of-type': {
      marginTop: '38px'
    }
  },


  /*** buttons ***/
  loginButton: {
  },

  dialButton: {
  },

  logoutButton: {
  },


  /*** misc ***/
  loginTitleDiv: `
    margin-bottom: 40px;
  `,

  hr: `
    width: calc(100% + 96px);
    height: 1px;
    border: 0;
    border-top: 1px solid ${colors.navy100};
    margin-left: -48px;
    margin-top: 10px;
    margin-bottom: 23px;
  `,

  error: {
    marginBottom: '8px',
    color: colors.red300
  },

  remoteProfile: `
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: contain;
    margin-bottom: 24px;
  `,

  peerName: `
    margin-bottom: 4px;
  `,

  connectionInfo: `
    height: 20px;
    margin-bottom: 24px;
  `,

  peerStateDiv: `
    align-items: center;
    margin-bottom: 97px;
  `,

  peerMuteIcon: `
    width: 32px;
    height: 32px;
    background-image: url(${audioOffWhite});
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 8px;
  `,

  peerMuteLabel: `
    display: block;
  `,

  btnCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    cursor: 'pointer',
    '&::before': {
      content: '',
      display: 'block',
      width: '64px',
      height: '64px',
      borderRadius: '50%'
    },
    'btn-circle:hover::before': {
      backgroundColor: colors.mutegray
    }
  },

  btnCall: {
    marginLeft: '32px',
    marginRight: '32px',
    marginBottom: '8px',
  },

  btnAccept: {
    backgroundColor: colors.green300,
    backgroundImage: `url(${audioIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  btnMute: {
    backgroundColor: colors.mutegray,
    backgroundImage: `url(${audioOffWhite})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  btnUnmute: {
    backgroundColor: colors.white,
    backgroundImage: `url(${audioOffBlack})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  btnEnd: {
    backgroundColor: colors.red300,
    backgroundImage: `url(${endIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  btnDecline: {
    backgroundColor: colors.red300,
    backgroundImage: `url(${declineIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  btnClose: {
    width: '248px',
    height: '64px',
    border: 'none',
    borderRadius: '4px',
    marginBottom: '28px',
    background: 'rgba(255, 255, 255, 0.08)',
    color: colors.white,
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.28)'
    }
  },


  /*** widget ***/
  widgetApp: {
  },

  widgetDiv: {
    position: 'inherit',
    width: '376px',
    height: '592px',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 9px 15px -7px rgba(33, 34, 66, 0.04), 0 9px 46px 8px rgba(33, 34, 66, 0.08), 0 24px 38px 3px rgba(33, 34, 66, 0.12)',
    backgroundColor: colors.white,
    overflow: 'hidden'
  },

  widgetIcon: {
    cursor: 'pointer',
    width: '56px',
    height: '56px',
    borderRadius: '32px',
    backgroundColor: colors.purple300,
    backgroundImage: `url(${widgetIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  widgetHeader: {
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    backgroundColor: colors.purple300,
  },

  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  headerUserId: {
    color: colors.white,
  },

  headerNickname: {
    color: colors.navy200,
  },

  widgetCloseBtn: {
    position: 'absolute',
    right: '24px',
    top: '28px',
    width: '24px',
    height: '24px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    backgroundImage: `url(${widgetCloseIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
};

const sheet = jss.createStyleSheet(styles, {
  link: true
});
const classes = sheet.classes;

export { jss, sheet, classes };
