import { ITEMS } from "./index.js";

import { populateTree } from "./itemList.js";

export const toolbar = document.querySelector(".toolbar");
const parentSelector = toolbar.querySelector('#add_product-parent_select');
const itemSelect = toolbar.querySelector('#edit_product-item_select');

const panels = toolbar.querySelectorAll('[role=tabpanel]')
const inputWarn = document.createElement('p');

// populate <options> for select element
export function populateOption(ITEMS){

    const itemOptions = ITEMS.map(item => 

        `<option style="background-color:rgba(0,0,0,0.8)"dataset-itemid=${item.id}>${item.title}</option>`).join('');
        parentSelector.innerHTML = itemOptions;
        itemSelect.innerHTML = itemOptions;

}

// handler for add/edit button
function itemsManage(e,panel){

    e.preventDefault()
    const nameInput = panel.querySelector('#title')
    const title = nameInput.value
    inputWarn.innerText = 'Set name';
    nameInput.insertAdjacentElement("afterend",inputWarn)
    if(title === ""){
        inputWarn.style = 'display:block;color:red'
        return;        
    } 
    inputWarn.style= 'display:none'
    
    if(e.target.id === 'addItem') addItem(title)
    if(e.target.id === 'editItem') editItem(title)
    populateTree(ITEMS)

    populateOption(ITEMS)

    document.querySelector('.add-todo-form').reset();

}

//adding new item to items

function addItem(title){
    const parent = ITEMS.find(el => el.title === parentSelector.value);

    const parentid = parent.id;
    const id = ITEMS.length;

    const itemObject = {
        parentid,
        id,
        title,
        childrens:[]
    }
    ITEMS.push(itemObject)

}

// editing selected item title from items

function editItem(title) {
    const item = ITEMS.find(el => el.title === itemSelect.value);


    ITEMS[item.id] = {...ITEMS[item.id],title}


}

// add EventListener for 'submit' buttons on each panel 
panels.forEach(panel => {
    const button = panel.querySelector('button');
    button.addEventListener('click', (e) => itemsManage(e,panel))

});
