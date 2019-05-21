import React from 'react';
import Paper from 'material-ui/Paper';
import {white, blueGrey500} from 'material-ui/styles/colors';
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import {typography} from 'material-ui/styles';

const QuickAccess = (props) => {
  const styles = {
    paper: {
      backgroundColor: white,
      height: 150
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px'
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: blueGrey500,
      padding: 10,
    }
  };
  return (
    <Paper style={styles.paper}>
      <div style={{...styles.header}}>GraphQL Playground Quick Access</div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default QuickAccess;
