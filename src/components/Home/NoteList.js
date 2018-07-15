import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';


import Note from '../Note'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      isModalOpen: false,
    };   
  }

  swapModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  render() {
    const notes = this.props.notes
    console.log(this.props.action)
    return (
      
      <Grid container spacing={16} style={{flexGrow: 1}}>
        <Grid item xs={12} style={{}} >
        <Button style={{}} variant="fab" color="primary" aria-label="Add" onClick={() => this.swapModal()}>
            <AddIcon />
        </Button>
        {this.state.isModalOpen? <Note action={this.props.action}></Note>: <div></div>}
        {notes? 
          <Grid container justify="right" spacing={16} style = {{}}>
            {notes? Object.keys(notes).map(key =>
              <Grid item> <Note action={this.props.action} closeModal={this.closeModal} key={key}>{notes[key]}</Note> </Grid>
            ): ""}
          </Grid>
          :
          <div>Здесь пока ничего нет</div>
        }
        </Grid>
        </Grid>
    );
  }
};

export default NoteList;
   