import { observer } from "mobx-react-lite";

const spaceWidget = {
	id: 'space',
	label: "Space",
	schema: [
		{
			"label": "Height (px)",
			"id": "height",
			"type": "number",
			"default": 40
		},
		{
			"label": "Type",
			"id": "type",
			"type": "select",
			"options": [
				{
					"label": "Empty space",
					"value": "" 
				},
				{
					"label": "Separator",
					"value": "separator"
				}
			],
			"default": ""
		}
	],
	component: observer(({widgetData}) => {
		const styles = {
			position: 'relative'
		};
		const height = parseInt(widgetData?.props?.height);
		if (!isNaN(height)) {
			styles.height = height;
		}

		const separatorStyles = {
			position: 'absolute',
			height: '1px',
			width: '100%',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			margin: 'auto',
			backgroundColor: '#cccccc'
		}

		return (
			<div style={ styles }>
				{ widgetData?.props?.type === 'separator' && (
					<span style={ separatorStyles }></span>
				) }
			</div>
		);
	})
};

export { spaceWidget };