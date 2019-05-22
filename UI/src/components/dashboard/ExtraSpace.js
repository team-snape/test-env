import React from 'react';
import Paper from 'material-ui/Paper';
import {white, blueGrey600} from 'material-ui/styles/colors';
import {ResponsiveContainer} from 'recharts';
import GlobalStyles from '../../styles';

// This is a presentational component we can put anything into... Currently a card w/ "Howdy"
const ExtraSpace = () => {
  const styles = {
    paper: {
      backgroundColor: white,
      height: 150
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 85
    },
    header: {
      color: white,
      backgroundColor: blueGrey600,
      padding: 10
    }
  };
  return (
    <Paper style={styles.paper}>
      <div style={{...GlobalStyles.title, ...styles.header}}> Query Response </div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <h1>Response outputs here...</h1> 
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default ExtraSpace;
