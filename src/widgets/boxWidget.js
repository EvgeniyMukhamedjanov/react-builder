import { observer } from "mobx-react-lite";
import { CanvasNode } from '../components';

const boxWidget = {
	id: 'box',
	label: "Container",
	schema: [
		{
			"id": "direction",
			"type": "select",
			"label": "Direction",
			"options": [
				{
					"label": "Vertical",
					"value": ""
				},
				{
					"label": "Horizontal",
					"value": "horizontal"
				}
			],
			"default": ""
		}
	],
	manageChildren: true,
	component: observer(({widgetData}) => {
		let styles = {};
		if (widgetData.props?.direction === 'horizontal') {
			styles = {
				display: 'grid',
				gridAutoColumns: '1fr',
   				gridAutoFlow: 'column',
   				gridGap: '30px'
			}
		}
		return (
			<div style={ styles }>
				{ widgetData.children_list.map(element => {
					return ( 
						<CanvasNode key={ element.index } widgetIndex={ element.index } /> 
					)
				})}
			</div>
		);
	})
};

export { boxWidget };