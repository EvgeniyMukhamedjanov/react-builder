const textControl = {
	type: 'text',
	component: ({value, id, onControlChange}) => {
		const computedValue = value ?? '';
		return (
			<input 
				type="text" 
				className="form-control form-control-sm" 
				id={id} 
				value={computedValue} 
				onChange={e => onControlChange(e.target.value)} />
		);
	}
};

export { textControl };