const tasksPanel = document.getElementsByClassName("tasks");

//Add the drop listener for tasks-panel
Array.from(tasksPanel).forEach((val) => {
  //Prevent default
  val.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  //Drop event
  val.addEventListener("drop", (e) => {
     
      const e_Id = e.dataTransfer.getData("source");
      const element = document.getElementById(e_Id);
      
      const location = e.dataTransfer.getData("tasks-panel");
      
       //No need to drop the card in the same container/location
      if(location === val.id)
      {
        return;
      }
      //e.target will appendChild where ther cursor is being dropped
      val.appendChild(element);
  });
});