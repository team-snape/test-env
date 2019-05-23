import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';
import queryImg from '../images/query.png';
import astInput from '../images/input.png';
import astOutput from '../images/astoutput.png';

const imagesPath = {
  minus: queryImg,
  plus: astInput,
  equals: astOutput,
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      navDrawerOpen: false,
      queryResponse: "",
      treeResponse: "",
      img: [],
      astOut: [],
    };
    this.onClick = this.handleClick.bind(this);
  }
  toggleImage = () => {
    this.setState(state => ({ open: !state.open, img: [imagesPath.plus, imagesPath.equals], queryResponse: "Abstract Syntax Tree", astOut: [imagesPath.equals], treeResponse: "AST OUTPUT" }))
  };

  getImageName = () => this.state.open ? 'plus' : 'minus';
  
  handleClick(event) {
    this.setState({
      img: [imagesPath.minus, imagesPath.plus, imagesPath.equals],
      id: 1,
      queryResponse: "Query Response"
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  } 

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    const imageName = this.getImageName();
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      button: {
        marginLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: 'bold',
      },
      footer: {
        display: 'block',
        margin: '0 auto',
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      },
      imageTitle: {
        textAlign: 'center',
        color: 'blue',
      },
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header} 
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username="User Admin"/>
    
            <div style={styles.container}>
              {this.props.children}
            </div>
            <div>
              <button id={this.state.id} onClick={this.onClick} style={styles.button}> Fetch </button>
              <br>
              </br>
              <h1 onClick={this.onClick} style={styles.imageTitle}> {this.state.queryResponse} </h1>
              <br>
              </br>
              <img src={this.state.img[0]} alt="" style={styles.footer} onClick={this.toggleImage} />
              <br>
              </br>
              <h1 onClick={this.onClick} style={styles.imageTitle}> {this.state.treeResponse} </h1>
              <img src={this.state.astOut[0]} alt="" style={styles.footer} onClick={this.toggleImage} />
            </div>
       
        </div>
      </MuiThemeProvider>
    );
  }
}
//#efefef

export default withWidth()(App);
