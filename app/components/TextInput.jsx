import React from 'react';

const TextInput = ({ caption, onRef, onEnter, multiLine }) => {
  const handleKeyDown = (e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13 && onEnter) {
      onEnter();
    }
  };

  let input;
  if (multiLine) {
    input = <textarea
              className="input__field"
              ref={onRef}
              maxLength="512"
              rows="2"
            />
  } else {
    input = <input
        className="input__field"
        ref={onRef}
        type="text"
        onKeyDown={handleKeyDown}
      />
  }

  return (
    <div className="input">
      <label className="input__label">{caption}</label>
      {input}
    </div>
  );
};

TextInput.propTypes = {
  caption: React.PropTypes.string,
  multiLine: React.PropTypes.bool,
  onRef: React.PropTypes.func,
  onEnter: React.PropTypes.func,
};

export default TextInput;
