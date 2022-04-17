import { makeAutoObservable } from 'mobx';

class Storage {
	tree = [];
	library = {};
	controls = {};
	addWidgetMenu = -1;
	highlightedWidget = -1;

	constructor() {
		makeAutoObservable(this);
	}

	fromJson(jsonString) {
		this.cleanTree();
		let json = undefined;
		try {
			json = JSON.parse(jsonString);
		} catch(error) {
			console.error(error);
			console.error('JSON string:', jsonString);
		}
		if (json === undefined) return false;
		return this._fromJsonIteration(json, -1);
	}
	_fromJsonIteration(treeWidgetData, parentIndex) {
		const widgetIndex = this.addWidget(treeWidgetData.id, treeWidgetData.props, parentIndex);
		if (!(widgetIndex > -1)) return false;
		if (treeWidgetData.children_list?.length > 0) {
			for (let i = 0; i < treeWidgetData.children_list.length; i++) {
				let result = this._fromJsonIteration(treeWidgetData.children_list[i], widgetIndex);
				if (!result) return false;
			}
		}
		return true;
	}

	toJson() {
		let json = null;
		if (this.tree.length > 0) {
			json = this._toJsonIteration(0);
		}
		if (json === null) return '';
		return JSON.stringify(json);
	}
	_toJsonIteration(widgetIndex) {
		const widgetData = this.tree[widgetIndex];
		const result = {
			id: widgetData.id,
			props: widgetData.props
		}
		if (widgetData.children_list.length > 0) {
			result.children_list = [];
			for (let i = 0; i < widgetData.children_list.length; i++) {
				result.children_list.push(this._toJsonIteration(widgetData.children_list[i].index))
			}
		}
		return result;
	}

	addWidget(widgetId, props, parentIndex) {
		if (!(parentIndex > -2)) return -1;
		if (parentIndex === -1 && this.tree.length > 0) return -1;
		if (parentIndex !== -1 && !(this.tree[parentIndex])) return -1;
		if (typeof widgetId !== "string" || widgetId === '')  return -1;
		const widgetIndex = this.tree.push({
			id: widgetId,
			parent: parentIndex,
			children_list: [],
			props: props ?? {}
		}) - 1;
		if (parentIndex > -1) {
			this.tree[parentIndex].children_list.push({
				index: widgetIndex
			});
		}
		return widgetIndex;
	}

	removeWidget(widgetIndex) {
		if (!(this.tree[widgetIndex])) return;
		const parentIndex = this.tree[widgetIndex].parent;
		if (!(this.tree[parentIndex])) return;
		const childrenListIndex = this.tree[parentIndex].children_list.findIndex(element => element.index === widgetIndex);
		if (childrenListIndex > -1) {
			this.tree[parentIndex].children_list = [
		      ...this.tree[parentIndex].children_list.slice(0, childrenListIndex),
		      ...this.tree[parentIndex].children_list.slice(childrenListIndex + 1)
		    ]
		}
	}

	moveWidgetUp(widgetIndex) {
		if (!(this.tree[widgetIndex])) return;
		const parentIndex = this.tree[widgetIndex].parent;
		if (!(this.tree[parentIndex])) return;
		const childrenListIndex = this.tree[parentIndex].children_list.findIndex(element => element.index === widgetIndex);
		if (childrenListIndex > 0) {
			this.tree[parentIndex].children_list = [
		      ...this.tree[parentIndex].children_list.slice(0, childrenListIndex - 1),
		      this.tree[parentIndex].children_list[childrenListIndex],
		      this.tree[parentIndex].children_list[childrenListIndex - 1],
		      ...this.tree[parentIndex].children_list.slice(childrenListIndex + 1)
		    ]
		}
	}

	moveWidgetDown(widgetIndex) {
		if (!(this.tree[widgetIndex])) return;
		const parentIndex = this.tree[widgetIndex].parent;
		if (!(this.tree[parentIndex])) return;
		const childrenListIndex = this.tree[parentIndex].children_list.findIndex(element => element.index === widgetIndex);
		if (childrenListIndex > -1 && childrenListIndex < this.tree[parentIndex].children_list.length - 1) {
			this.tree[parentIndex].children_list = [
		      ...this.tree[parentIndex].children_list.slice(0, childrenListIndex),
		      this.tree[parentIndex].children_list[childrenListIndex + 1],
		      this.tree[parentIndex].children_list[childrenListIndex],
		      ...this.tree[parentIndex].children_list.slice(childrenListIndex + 2)
		    ]
		}
	}

	cleanTree() {
		this.tree = [];
	}

	registerWidget(widgetObject) {
		this.library[widgetObject.id] = widgetObject;
	}

	registerControl(controlObject) {
		this.controls[controlObject.type] = controlObject;
	}

	setField(widgetIndex, propKey, value) {
		if (!(this.tree[widgetIndex])) return;
		this.tree[widgetIndex].props[propKey] = value;
	}

	openAddWidgetMenu(widgetIndex) {
		if (!(this.tree[widgetIndex])) { 
			this.addWidgetMenu = -1;
			return;
		}
		this.addWidgetMenu = widgetIndex;
	}

	closeAddWidgetMenu() {
		this.addWidgetMenu = -1;
	}

	setHighlight(widgetIndex) {
		if (!(this.tree[widgetIndex])) return;
		this.highlightedWidget = widgetIndex;
	}

	removeHighlight(widgetIndex) {
		if (widgetIndex === this.highlightedWidget) {
			this.highlightedWidget = -1;
		}
	}
}

const storage = new Storage();

export { storage };