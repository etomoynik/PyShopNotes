import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <Button component={Link} to={routes.HOME}>Заметки</Button>
    <Button component={Link} to={routes.ACCOUNT}>Аккаунт</Button>
    <SignOutButton />
  </ul>

const NavigationNonAuth = () =>
  <Button component={Link} to={routes.SIGN_IN}>Вход</Button>

export default Navigation;
