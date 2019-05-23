import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toDashboard: false};
  }
  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    };
    return (
      <PageBase title="Schema Form"
                navigation="Post Schema">
        <form>
          <TextField
            hintText="Astronaut Name"
            floatingLabelText="Astronaut Name"
            fullWidth={true}
          />
          <TextField
            hintText="Nationality"
            floatingLabelText="Nationality"
            fullWidth={true}
          />
          <TextField
            hintText="Rank"
            floatingLabelText="Rank"
            fullWidth={true}
          />
          <TextField
            hintText="Mission"
            floatingLabelText="Mission"
            fullWidth={true}
          />
          <TextField
            hintText="Status"
            floatingLabelText="Status"
            fullWidth={true}
          />
          <Divider/>
  
          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>
  
            {/* // Redirects to Dashboard */}
            <Link to="/">
            <RaisedButton label="LAUNCH"
                          style={styles.saveButton}
                          type="submit"
                          primary={true}/>
            </Link>
          </div>
        </form>
      </PageBase>  
    );
  }
}


// const FormPage = () => {

//   const styles = {
//     toggleDiv: {
//       maxWidth: 300,
//       marginTop: 40,
//       marginBottom: 5
//     },
//     toggleLabel: {
//       color: grey400,
//       fontWeight: 100
//     },
//     buttons: {
//       marginTop: 30,
//       float: 'right'
//     },
//     saveButton: {
//       marginLeft: 5
//     }
//   };

//   return (
//     <PageBase title="Schema Form"
//               navigation="Post Schema">
//       <form>
//         <TextField
//           hintText="Astronaut Name"
//           floatingLabelText="Astronaut Name"
//           fullWidth={true}
//         />
//         <TextField
//           hintText="Nationality"
//           floatingLabelText="Nationality"
//           fullWidth={true}
//         />
//         <TextField
//           hintText="Rank"
//           floatingLabelText="Rank"
//           fullWidth={true}
//         />
//         <TextField
//           hintText="Mission"
//           floatingLabelText="Mission"
//           fullWidth={true}
//         />
//         <TextField
//           hintText="Status"
//           floatingLabelText="Status"
//           fullWidth={true}
//         />
//         <Divider/>

//         <div style={styles.buttons}>
//           <Link to="/">
//             <RaisedButton label="Cancel"/>
//           </Link>

//           {/* // Redirects to Dashboard */}
//           <Link to="/">
//           <RaisedButton label="LAUNCH"
//                         style={styles.saveButton}
//                         type="submit"
//                         primary={true}/>
//           </Link>
//         </div>
//       </form>
//     </PageBase>
//   );
// };

export default FormPage;
