import { populateOption, toolbar } from './toolbar.js'
import { tabSwitcher } from "./utility.js"
import { populateTree } from "./itemList.js"
import { items } from "./itemsArray.js"

populateOption(items);
tabSwitcher(toolbar);
populateTree(items);