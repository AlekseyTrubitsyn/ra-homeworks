'use strict';

const HexInput = props => {
  function onChange(e) {
    props.onChange(e.currentTarget.value);
  }

  return (
    <input
      value={props.value}
      onChange={onChange}
      type="text"
      className="hex-field js-hex-field"
      placeholder="#000000" />
  );
};
