import { observer } from "mobx-react-lite";

const buttonWidget = {
	id: 'button',
	label: "Button",
	schema: [
		{
			"label": "Text",
			"id": "text",
			"type": "text",
			"default": "Button"
		},
		{
			"label": "Text size",
			"id": "size",
			"type": "select",
			"options": [
				{
					"label": "Small",
					"value": "sm"
				},
				{
					"label": "Normal",
					"value": ""
				},
				{
					"label": "Large",
					"value": "lg"
				}
			],
			"default": ""
		},
		{
			"label": "Width (px)",
			"id": "width",
			"type": "number"
		},
		{
			"label": "Height (px)",
			"id": "height",
			"type": "number"
		}
	],
	component: observer(({widgetData}) => {
		const sizeClass = widgetData?.props?.size ? `btn-${ widgetData.props.size }` : '';
		const styles = {};
		const width = parseInt(widgetData?.props?.width);
		if (!isNaN(width)) {
			styles.width = width;
		}
		const height = parseInt(widgetData?.props?.height);
		if (!isNaN(height)) {
			styles.height = height;
		}
		return (
			<button style={ styles } className={`btn btn-secondary ${ sizeClass }`}>{ widgetData.props.text }</button>
		);
	})
};

export { buttonWidget };