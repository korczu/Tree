export function tabSwitcher(tabSection){
    const tabs = tabSection.querySelectorAll('[role="tab"]');
    const tabpanels = tabSection.querySelectorAll('[role=tabpanel');
    
    function handleTabClick(){
        //Hide all tabpanels
        tabpanels.forEach(panel => panel.classList.add('hidden'));
        
        //change aria-selected to false on evry tab
        tabs.forEach(panel => panel.setAttribute("aria-selected", "false"));
        
        //change aria-selected state on clicked tab
        const isSelected = this.getAttribute("aria-selected") === "true" ? true : false;
        this.setAttribute("aria-selected",!isSelected);
        
        //display corresponding panel to clicked tab
        [...tabpanels].find(panel => panel.id === this.getAttribute("aria-controls")).classList.remove('hidden');
    }
    
    //Add event listener handler to each tab
    tabs.forEach(tab => tab.addEventListener("click", handleTabClick))
}

 // add data into local Storage
 export function addToLocalStorage(key,data){
    if(!(typeof key === "string") || (key === '')){
         throw Error('Key must contain a string')
    }
    const dataJSON = JSON.stringify(data)
    localStorage.setItem(key,dataJSON)
 }

 //load from local Storage
 export function loadFromLocalStorage(key){
  const data = localStorage.getItem(key);
  if(!key) throw Error('There is no ' + key + ' in localStorage')
    return JSON.parse(data);
 }