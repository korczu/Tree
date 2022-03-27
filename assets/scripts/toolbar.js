import { tabSwitcher } from "./utility.js";
const toolbar = document.querySelector(".toolbar");
const parentSelector = toolbar.querySelector('#add_product-parent_select');
const itemSelect = toolbar.querySelector('#edit_product-item_select');
// const buttons = toolbar.querySelector('.submit-button')
const panels = toolbar.querySelectorAll('[role=tabpanel]')
// const addPanel = document.querySelector('#panel-add')
// const editPanel = document.querySelector('#panel-edit')
// const addButton = addPanel.querySelector('.submit-button')
// const editButton = editPanel.querySelector('.submit-button')
const inputWarn = document.createElement('p');

function populateOption(items){
    const itemOptions = items.map(item => 
        `<option dataset-itemid=${item.id}>${item.title}</option>`).join('');
        parentSelector.innerHTML = itemOptions;
        itemSelect.innerHTML = itemOptions;
}

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
    populateTree(items)
    populateOption(items)
    document.querySelector('.add-todo-form').reset();

}
function addItem(title){
    const parent = items.find(el => el.title === parentSelector.value);
    const parentid = parent.id;
    const id = items.length;
    const itemObject = {
        parentid,
        id,
        title,
        childrens:[]
    }
    items.push(itemObject)
}

function editItem(title) {
    const item = items.find(el => el.title === itemSelect.value);
    items[item.id] = {...items[item.id],title}
}

panels.forEach(panel => {
    const button = panel.querySelector('button');
    button.addEventListener('click', (e) => itemsManage(e,panel))
});

populateOption(items);
tabSwitcher(toolbar);