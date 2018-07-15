import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpPage = ({ history }) =>
  <div>
    <h1>Зарегистрироваться</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            localStorage.setItem('userEmail', email);
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Имя"
        />
        <TextField
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Электропочта"
        />
        <TextField
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Пароль"
        />
        <TextField
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Повторите пароль"
        />
        <Button disabled={isInvalid} type="submit">
          Зарегистрироваться
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Нет аккаунта?
    {' '}
    <Button component={Link} to={routes.SIGN_UP}>Зарегистрироваться</Button>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};