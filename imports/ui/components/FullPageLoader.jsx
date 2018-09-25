import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';


const FullPageLoader = () => (
  <Dimmer active inverted>
    <Loader content="Betöltés" inverted />
  </Dimmer>);

export default FullPageLoader;
