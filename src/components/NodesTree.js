import { useContext, useCallback, useState, useEffect } from "react";
import { StorageContext } from '../context.js';
import { observer } from "mobx-react-lite";
import { WidgetEditor } from './';

const AddWidgetMenu = observer(({ onOptionClick }) => {
    const storage = useContext(StorageContext);
    const items = [];
    for (let i in storage.library) {
        items.push(storage.library[i]);
    }
    return (
        <ul className="dropdown-menu" style={{ display: 'block', right: '10px'}}>
            { items.map(element => {
                return (
                    <li key={ element.id }>
                        <button 
                            className="dropdown-item" 
                            onClick={e => { e.stopPropagation(); onOptionClick( element.id )}}>
                            { element.label }
                        </button>
                    </li>
                )
            })}
        </ul>
    );
});

const NodesTreeItem = observer(({widgetIndex, level, removable, movableUp, movableDown, onRemoveClick}) => {
    const storage = useContext(StorageContext);
    if (!storage.tree[widgetIndex]) return false;
    const [ editorVisibility, setEditorVisibility ] = useState(false);

    const openAddWidgetMenu = e => {
        e.stopPropagation(); 
        storage.openAddWidgetMenu(widgetIndex);
    }

    const addWidget = (widgetId) => {
        const props = {};
        const widgetObject = storage.library[widgetId];
        if (widgetObject.schema?.length > 0) {
            for (let i in widgetObject.schema) {
                const field = widgetObject.schema[i];
                if ("default" in field) {
                    props[field.id] = field.default;
                }
            }
        }
        storage.addWidget(widgetId, props, widgetIndex);
        storage.closeAddWidgetMenu();
    }

    const removeWidget = e => {
        e.stopPropagation();
        storage.removeWidget(widgetIndex);
        storage.closeAddWidgetMenu();
    }

    const moveWidgetUp = e => {
        e.stopPropagation();
        storage.moveWidgetUp(widgetIndex);
        storage.closeAddWidgetMenu();
    }

    const moveWidgetDown = e => {
        e.stopPropagation();
        storage.moveWidgetDown(widgetIndex);
        storage.closeAddWidgetMenu();
    }

    const id = storage.tree[widgetIndex].id;
    const label = storage.library[id]?.label ?? '[No label]';
    const children_list = storage.tree[widgetIndex]?.children_list ?? [];
    const manageChildren = !!(storage.library[id]?.manageChildren);
    return (
        <>
            <li className="list-group-item" 
                onMouseEnter={() => { storage.setHighlight(widgetIndex) }}
                onMouseLeave={() => { storage.removeHighlight(widgetIndex) }}
            >   
                <div className="d-flex justify-content-between align-items-center"
                    onClick={() => setEditorVisibility(!editorVisibility)}
                >
                    <span style={{
                        textIndent: `${ level * 20 }px`,
                        display: 'block',
                        fontWeight: editorVisibility ? 'bold' : 'normal'
                    }}>{ label }</span>
                    <span>
                        { movableUp && (
                            <button className="btn btn-sm" onClick={ moveWidgetUp }>
                                <i className="bi bi-arrow-up"></i>
                            </button>
                        )}
                        { movableDown && (
                            <button className="btn btn-sm" onClick={ moveWidgetDown }>
                                <i className="bi bi-arrow-down"></i>
                            </button>
                        )}
                        { manageChildren && (
                            <>
                                <button className="btn btn-sm" onClick={openAddWidgetMenu}>
                                    <i className="bi bi-plus-circle"></i>
                                </button>
                                { storage.addWidgetMenu === widgetIndex && (
                                    <AddWidgetMenu onOptionClick={addWidget} />
                                ) }
                            </>
                        )}
                        { removable && (
                            <button className="btn btn-sm" onClick={ removeWidget }>
                                <i className="bi bi-trash"></i>
                            </button>
                        )}
                    </span>
                </div>
                { editorVisibility && (
                    <div className="bg-light border rounded-3 p-3 mt-2">
                        <WidgetEditor widgetIndex={ widgetIndex } />
                    </div>
                )}
            </li>
            { children_list.length > 0 && children_list.map((element, itemIndex) => (
                <NodesTreeItem 
                    key={element.index} 
                    widgetIndex={element.index} 
                    level={level + 1}
                    removable={ manageChildren }
                    movableUp={ manageChildren && itemIndex > 0 }
                    movableDown={ manageChildren && itemIndex < children_list.length - 1 } />
            ))}
        
        </>
    )
});

const NodesTree = observer(() => {
    const storage = useContext(StorageContext);

    const documentClick = useCallback(() => {
        storage.closeAddWidgetMenu();
    }, [ storage ]);

    useEffect(() => {
        document.addEventListener('click', documentClick);
        return () => {
            document.removeEventListener('click', documentClick);
        };
    });

    return (
        <ul className="list-group list-group-flush">
        	{ storage.tree.length > 0 && (
        		<NodesTreeItem widgetIndex={0} level={0} />
        	)}
    	</ul>
    )
});

export default NodesTree;