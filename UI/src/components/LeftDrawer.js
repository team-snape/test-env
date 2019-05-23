import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, deepPurple800} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import Moon from '../images/rocket.svg';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: deepPurple800,
      paddingLeft: 40,
      height: 57,
    },
    menuItem: {
      color: white,
      fontSize: 14,
      textAlign: 'center',
      padding: '8px',
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage:  'url(' + require('../images/comety.gif') + ')',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      },
      image: {
        cursor: 'pointer',
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        paddingLeft: 40,
        height: 27,
      }
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.logo}>
          Apollo Aperture
        </div>
        <div style={styles.avatar.div}>
          <Avatar src="https://i.imgur.com/ghpRvan.png"
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>Welcome</span>
        </div>
        <div>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
        <img src={Moon} alt="" style={styles.image} />
    </Drawer>
  );
};

export default LeftDrawer;
