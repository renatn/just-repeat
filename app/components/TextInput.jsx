import React from 'react';

const TextInput = ({ caption, onRef }) => {
	return (
		<div className="input">
			<label className="input__label">{caption}</label>
			<input 
				className="input__field" 
				ref={onRef} 
				type="text" 
			/>
		</div>
	);
};

export default TextInput;