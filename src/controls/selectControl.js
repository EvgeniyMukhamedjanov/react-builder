const selectControl = {
	type: 'select',
	component: ({value, id, schema, onControlChange}) => {
		let computedValue = value ?? '';
		const valueExists = schema.options?.find(element => element.value === value);
		if (!valueExists) {
			computedValue = '';
		}
		return (
			<select
				className="form-select form-select-sm" 
				id={id} 
				value={computedValue} 
				onChange={e => onControlChange(e.target.value)}
			>
				{ !valueExists && (
					<option value=""></option>
				)}
				{ schema.options?.map(element => {
					return (
						<option key={ element.value } value={ element.value }>{ element.label }</option>
					)
				})}
			</select>
		);
	}
};

export { selectControl };