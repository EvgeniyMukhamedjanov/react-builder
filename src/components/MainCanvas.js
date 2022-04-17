import { useContext } from "react";
import { StorageContext } from '../context.js';
import { observer } from "mobx-react-lite";
import { CanvasNode } from './';

const MainCanvas = observer(() => {
    const storage = useContext(StorageContext);
    return (
        <div className="bg-light border rounded-3 p-3" style={{ overflow: 'auto' }}>
        	{ storage.tree.length > 0 && (
        		<CanvasNode widgetIndex={0} />
        	)}
    	</div>
    )
});

export default MainCanvas;
