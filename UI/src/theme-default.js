import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepPurple800, blueGrey500} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 60,
    color: deepPurple800
  },
  drawer: {
    width: 230,
    color: blueGrey500
  },
  raisedButton: {
    primaryColor: deepPurple800,
  }
});


export default themeDefault;