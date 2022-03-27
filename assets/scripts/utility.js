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
