import { populateOption, toolbar } from './toolbar.js'
import { tabSwitcher } from "./utility.js"
import { populateTree } from "./itemList.js"
import { data } from "./data.js"
import  { loadFromLocalStorage } from './utility.js'

export const ITEMS = loadFromLocalStorage('items') ?? data;
populateTree(ITEMS)
populateOption(ITEMS);
tabSwitcher(toolbar);