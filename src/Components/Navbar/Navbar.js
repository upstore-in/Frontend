//library
import React from 'react';

//custom
import Mobile from './Mobile';
import Desktop from './Desktop';
import useWindowDimensions from '../../customapis/useWindowDimensions';

function Navbar() {
  const style = {
    fontFamily: 'MuseoModerno',
    top: '0',
    width: '92vw',
    height: '9vh',
  };

  const { width } = useWindowDimensions();
  return <div style={style}>{width < 991 ? <Mobile /> : <Desktop />}</div>;
}

export default Navbar;
