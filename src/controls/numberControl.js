const numberControl = {
	type: 'number',
	component: ({value, id, onControlChange}) => {
		let computedValue = parseInt(value);
		if (isNaN(computedValue)) {
			computedValue = '';
		}
		return (
			<input 
				type="number" 
				className="form-control form-control-sm" 
				id={id} 
				value={computedValue} 
				onChange={e => onControlChange(e.target.value)} />
		);
	}
};

export { numberControl };