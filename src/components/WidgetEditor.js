import { useContext } from "react";
import { StorageContext } from '../context.js';
import { observer } from "mobx-react-lite";

const DefaultControl = ({value, id}) => {
	return (<input className="form-control" type="text" id={id} disabled/>)
}

const WidgetEditor = observer(({widgetIndex}) => {
	const storage = useContext(StorageContext);
	const widgetId = storage.tree[widgetIndex]?.id;
    if (typeof widgetId !== 'string' || widgetId === '') return false;
    const widgetFields = storage.library[widgetId]?.schema ?? [];
    if (widgetFields.length === 0) {
    	return (<p>No settings</p>);
    }

    const setField = (value, propKey) => {
    	storage.setField(widgetIndex, propKey, value);
    }

    return (
    	<div>
	    	{ widgetFields.map(element => {
	    		const id = `control_${ widgetIndex }_${ element.id }`;
	    		const Control = storage.controls[element.type]?.component ?? DefaultControl;
	    		return (
	    			<div className="mb-3" key={ id }>
						<label htmlFor={ id } className="form-label small">{ element.label }</label>
						<Control 
							value={ storage.tree[widgetIndex]?.props?.[element.id] } 
							id={ id } 
							schema={ element }
							onControlChange={value => setField(value, element.id)}/>
					</div>
	    		)
	    	})}
    	</div>
    );
});

export default WidgetEditor;