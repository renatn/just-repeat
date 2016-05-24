import React from 'react';

const TextInput = ({ caption, onRef, onEnter }) => {
  const handleKeyDown = (e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13 && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="input">
      <label className="input__label">{caption}</label>
      <input
        className="input__field"
        ref={onRef}
        type="text"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

TextInput.propTypes = {
  caption: React.PropTypes.string,
  onRef: React.PropTypes.func,
  onEnter: React.PropTypes.func,
};

export default TextInput;
