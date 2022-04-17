import { useContext } from "react";
import { StorageContext } from '../context.js';
import { observer } from "mobx-react-lite";
import { ErrorNode } from './';

const CanvasNode = observer(({widgetIndex}) => {
    const storage = useContext(StorageContext);
    if (!storage.tree[widgetIndex]) return false;
    const widgetId = storage.tree[widgetIndex].id;

    let Widget = storage.library[widgetId]?.component ?? ErrorNode;

    return (
        <div className="my-2" style={{
            outline: storage.highlightedWidget === widgetIndex ? '1px dotted red' : 'none'
        }}>
            <Widget widgetData={ storage.tree[widgetIndex] } />
        </div>
    )
});

export default CanvasNode;