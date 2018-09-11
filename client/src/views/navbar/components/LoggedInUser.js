import React from 'react';
import {graphql} from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import LoggedInUserMenu from './LoggedInUserMenu';

import { getUserByAuthIdQuery } from '../../../queries/queries';

import { isDefined } from '../../../utils/js-helpers';

const LoggedInUser = (props) => {
  let { error, loading, userByAuthId } = props.data;
  let user = userByAuthId;

  if (error) return <div> An Error Occurred</div>;
  else if (loading) {
   return ( <div><CircularProgress /></div> )
  } else {

    let displayName = "No Display Name";

    if (isDefined(user.alias))
      { displayName =  user.alias;}

    if (isDefined(user.firstName))
      { displayName =  user.firstName;}

    if (isDefined(user.firstName)
        && isDefined(user.lastName)
      ){ displayName = user.firstName + " " + user.lastName;}

    return(
        <div>
            <p><LoggedInUserMenu menuLabel={ displayName } user={ user }/></p>
        </div>
    );
  }
};

export default graphql(getUserByAuthIdQuery)(LoggedInUser); // This binds the querty to the component
