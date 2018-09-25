import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, user, requiredType, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (user === null) {
        // eslint-disable-next-line react/prop-types
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }
      if (user.type !== requiredType) {
        return <Redirect to={{ pathname: `/${user.type}`, state: { from: props.location } }} />;
      }
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.defaultProps = { user: null };
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.shape(),
  requiredType: PropTypes.string.isRequired,
};

export default PrivateRoute;
