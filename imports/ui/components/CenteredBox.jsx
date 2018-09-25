import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';


const CenteredBox = ({ children, width }) => (
  <div className="cb">
    <style>{'body > div, body > div > div, body > div > div > div.cb { height: 100%; }'}</style>
    <Grid textAlign="center" verticalAlign="middle" style={{ height: '100%' }}>
      <Grid.Column textAlign="left" style={{ maxWidth: width }}>{children}</Grid.Column>
    </Grid>
  </div>
);

CenteredBox.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
};

export default CenteredBox;
