import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


import moment from 'moment-timezone'

import { db } from '../firebase';

const styles = theme => ({
  card: {
    height: 350,
    width: 350,
    margin: 1,
    width: "50%",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.children? this.props.children.text: null,
      date: this.props.children? this.props.children.date: null,
      title: this.props.children? this.props.children.title: null,
    };  
  }

  saveNote() {
    const text = this.state.text;
    const title = this.state.title;
    console.log("save", this.props)
    if (text) {
      this.deleteNote();
      db.doCreateNote(localStorage.getItem('userEmail').split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0),
        text.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0),
        text, title);
        this.props.action();
    }
    // if (this.props.closeModal) {
    //   this.props.closeModal().bind(this);
    // }
    
  }

  deleteNote() {
    console.log(this.props)
    if (this.props.children) {
      db.doDeleteNote(localStorage.getItem('userEmail').split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0),
      this.props.children.text.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));
      this.props.action();
    }
    // if (this.props.closeModal) {
    //   this.props.closeModal();
    // }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  declOfNum(titles, number){
    number = Math.abs(number);
    var cases = [2, 0, 1, 1, 1, 2];
    return  titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }

  getDuration(date) {
    const diffDuration = moment.duration(moment().diff(moment.tz(date, "Europe/Moscow").format()))
    const seconds = diffDuration.seconds()? `${diffDuration.seconds()} ${this.declOfNum(['секунда','секунды','секунд'], (diffDuration.seconds()))}`: "";
    const minutes = diffDuration.minutes()? `${diffDuration.minutes()} ${this.declOfNum(['минута', 'минуты', 'минут'], (diffDuration.minutes()))}`: "";
    const hours = diffDuration.hours()? `${diffDuration.hours()} ${this.declOfNum(['час', 'часа', 'часов'], (diffDuration.hours()))}`: "";
    const days = diffDuration.days()? `${diffDuration.day()} ${this.declOfNum(['день', 'дня', 'дней'], (diffDuration.days()))}`: "";
    const years = diffDuration.years()? `${diffDuration.years()} ${this.declOfNum(['год', 'года', 'лет'], (diffDuration.years()))}`: "";
    return years + " " + days + " " + hours + " " + minutes + " " + seconds;
  }

  render() {
    const date = this.state.date;
    return (
      <div>
        <Card style={{
            margin: 10, 
            height: 350,
            width: 450,
          }}>
          <CardContent>
            <div>
              { date? `Дата создания: ${moment.tz(date, "Europe/Moscow").format()}` : "" }
            </div>
            <div>
              { date? `Время с момента создания: ${this.getDuration(date)}` : "" }
            </div>
            <TextField
              id="title"
              label="Название"
              value={this.state.title}
              onChange={this.handleChange('title')}
            />
            <TextField style={{width: "100%"}}
              id="multiline-static"
              label="Текст"
              multiline
              rows="4"
              defaultValue=""
              margin="normal"
              value={this.state.text}
              onChange={this.handleChange('text')}
            />
          </CardContent>
          <CardActions justify="center">
            <Button variant="contained" color="secondary" onClick={() => this.deleteNote()} >
              Удалить
              <DeleteIcon  />
            </Button>
            <Button variant="contained" size="small" onClick={() => this.saveNote()} >
              <SaveIcon />
              Сохранить
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default Note;