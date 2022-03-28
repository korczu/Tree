import { items } from "./itemsArray.js";
const itemList = document.querySelector(".nav__treeList");

export function populateTree(itemsArray){
    const itemsWithChildrenID = itemsArray.reduce(countParents, []).map(parent => parent.parentid);
    const itemsWithChildrenAmount = itemsArray.reduce(countParents, []).length;
    const grupedChildrens = createChildrensArray();
    const nestedItemsArray = appenChildrensToParent();
    const tree = generateTreeStructure(nestedItemsArray).outerHTML;
    
    // Count how many objects in items(array of objects) have children. 
    // Objects with parentid === 0 have no parent 
    // if there is no element in accumulator, push first object wchich ID is bigger then 0
    function countParents(accumulator, current) {
        if (accumulator.length === 0 ) {
            accumulator.push(items.find(component => component.parentid > 0));
        }
        else {
            if (!(accumulator.find(component => (component.parentid  === current.parentid)))&& current.parentid > 0){
                accumulator.push(current);
            }
        }
        return accumulator;
    }
    
    // Create Array which will contains array witch children for every parent
    // Main Array length determinated by itemsWithChildrenAmount
    function createChildrensArray() {
        let  childrensArray = [];
        for (let i = 0; i < itemsWithChildrenAmount; i++) {
            childrensArray[i] = items.filter(component => {
                const currentId = component.parentid;
                return currentId === itemsWithChildrenID[i];
            })
        }
        return childrensArray;
    }
    
    // append children (object) to parent (object), and remove from rawComponent array
    function appenChildrensToParent(){
        return items
        .map(component => {
            if (itemsWithChildrenID
            .find(parentID => parentID === component.id)){
                const index = grupedChildrens.findIndex(childrenArray => childrenArray[0].parentid === component.id);
                component.childrens = grupedChildrens[index];
            }  
            return component;
        })
        .filter(component =>{
            if(component.parentid === 0) return component;
        })
    }
    
    // Generete nested list node 
    function generateTreeStructure(itemsArray) {
        const nestedNode = document.createElement('ul');
        const htmlNode = itemsArray.map(element => {
            const node = document.createElement('li');
            if (itemsWithChildrenID.includes(element.parentid)){
                nestedNode.dataset.parentid = element.parentid;
                nestedNode.classList.add('hide');
            } 
            node.innerHTML = 
            `<span class="item_label">
                ${itemsWithChildrenID.includes(element.id) 
                    ? `<input
                    class="item_label-expand"
                    data-itemid="${element.id}" 
                    ${element.expanded && 'checked'} 
                    type='checkbox'/>`
                    : ''
                }
            <button class='item_label-button' value="${element.id}">${element.title}</button>
            </span>`;
            nestedNode.appendChild(node);
            if(element.childrens.length > 0){
                node.append(generateTreeStructure(element.childrens));
            } 
            if(element.expanded){
                nestedNode.querySelector(`[data-parentid='${element.id}']`).classList.remove('hide');
            }
            return;
        })
        return nestedNode;
    }
    
    itemList.innerHTML = tree;
}
    
// Listen for a click on tree item (for showing details about that item on detailsSection)
itemList.addEventListener('click', e => {
    e.target.matches('input[type="checkbox"]') && expandItem(e.target);
});

// Toggle expand checkbox 
function expandItem(item){
    items
    .map( component =>  component.id === parseInt(item.dataset.itemid) && (component.expanded = !component.expanded));
    populateTree(items);
}

