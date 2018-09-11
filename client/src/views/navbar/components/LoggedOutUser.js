import React from 'react';
import Button from '@material-ui/core/Button';

const LoggedOutUser = ({auth}) => (
  <div onClick={() => auth.login()}>
    <Button color="inherit">Login / Sign up</Button>
  </div>
);

export default LoggedOutUser; // This binds the querty to the component
