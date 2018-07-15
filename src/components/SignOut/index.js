import React from 'react';
import Button from '@material-ui/core/Button';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <Button
    onClick={auth.doSignOut}
  >
    Выход
  </Button>

export default SignOutButton;
