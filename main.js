let taskInput = document.getElementById("task-input");

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTask);

let taskList = [];

filterList=[]
let mode="all"
let tabs=document.querySelectorAll(".task-tabs div")
console.log(tabs)



taskInput.addEventListener("keydown", function(event){
    if(event.keyCode ==13){
        addTask(event)
    }
})



for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)})
}

function addTask() {
  // console.log("클릭")
//   let taskContent = taskInput.value;

  let task={
    taskContent: taskInput.value,
    isComplete: false,
    id : randomIDGenerator(),
  }
  taskList.push(task);
  console.log(taskList);
  taskInput.value = "";
  render();
}

function render() {
    let resultHTML = "";
    
    let list=[];
    if(mode=="all"){
        list=taskList;
    } else if(mode=="ongoing" || mode=="done"){
        list=filterList;
    }



  for (let i = 0; i < list.length; i++)
    if(list[i].isComplete==true){
        resultHTML += `           
        <div class="task">
            <div class="task-done">
               ${list[i].taskContent}
            </div>
            <div>
                <button onClick="toggleComplete('${list[i].id}')">완료</button> 
                <button onClick="deleteTask('${list[i].id}')">삭제</button>
            </div> 
        </div>        
        `;

    } else{
    resultHTML += `           
        <div class="task">
            <div>
               ${list[i].taskContent}
            </div>
            <div>
                <button onClick="toggleComplete('${list[i].id}')">완료</button> 
                <button onClick="deleteTask('${list[i].id}')">삭제</button>
            </div> 
        </div>        
        `;
    }

  document.getElementById("task-board").innerHTML=resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length ; i++){
        if(taskList[i].id==id){
            taskList[i].isComplete = !taskList[i].isComplete      
            break;              }
    }
    console.log(taskList)
    render()
}

function deleteTask(id){
    for(let i=0; i<taskList.length ; i++){
        if(taskList[i].id==id){
            taskList.splice(i,1)  
            break;              }
    }
    
    render()
}

function filter(event){
    mode = event.target.id

    document.getElementById("under-line").style.width =    event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top =    event.target.offsetHeight + "px";
    document.getElementById("under-line").style.left =    event.target.offsetLeft + "px";

    filterList=[]
    if(mode=="all"){
        render()
    }else if(mode=="ongoing"){
        for(let i=0; i<taskList.length ; i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode=="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}


function randomIDGenerator(){
    return "_" + Math.random().toString(36).substr(2, 9);
}


