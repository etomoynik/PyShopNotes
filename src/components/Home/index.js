import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Note from '../Note'
import NoteList from './NoteList'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      notes: {},
    };
  }

  handler() {
    db.onceGetNotes(localStorage.getItem('userEmail').split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).then(snapshot =>
      this.setState(() => ({ notes: snapshot.val() }))
    );
  }

  componentDidMount() {
    db.onceGetNotes(localStorage.getItem('userEmail').split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).then(snapshot =>
      this.setState(() => ({ notes: snapshot.val() }))
    );
  }

  render() {
    const { notes } = this.state;
    console.log(notes)
    return (
      <div>
      { <NoteList action={this.handler} notes={notes} /> }
      </div>
    );
  }
}



const authCondition = (authUser) => !!authUser;


HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withAuthorization(authCondition)(HomePage);