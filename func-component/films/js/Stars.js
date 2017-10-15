'use strict';

import shortid from 'shortid';

function Stars({ count }) {
  if ( isNaN(count) || count > 5 || count < 1 ) return null;

  let stars = createEmptyArray(count).map( (item, index) => {
    return <Star key={ shortid.generate() } />;
  });

  return (
    <ul className='card-body-stars u-clearfix'>
      { stars }
    </ul>
  )
}

Stars.defaultProps = {
  count: 0
}

function createEmptyArray(count) {
  return Array.apply(null, Array(count));
}
