import { observer } from "mobx-react-lite";

const textWidget = {
	id: 'text',
	label: "Text",
	schema: [
		{
			"label": "Text",
			"id": "text",
			"type": "text",
			"default": "Text"
		},
		{
			"label": "Style",
			"id": "style",
			"type": "select",
			"options": [
				{
					"label": "Heading",
					"value": "h1"
				},
				{
					"label": "Subheading",
					"value": "h4"
				},
				{
					"label": "Normal",
					"value": ""
				}
			],
			"default": ""
		}
	],
	component: observer(({widgetData}) => {
		let className = widgetData.props?.text ? widgetData?.props?.style ?? '' : '';
		className += ' my-0';
		return (
			<div className={ className }>{ widgetData.props?.text }</div>
		);
	})
};

export { textWidget };