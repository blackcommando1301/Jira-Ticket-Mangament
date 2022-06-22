let addBtn =document.querySelector(".add");
let ticketText=document.querySelector("#text-adder");
let ticketCont=document.querySelector(".ticket-container");
let deleteBtn=document.querySelector(".delete");

let ticketAdder=document.querySelector(".ticket-adder")
let toggleAdder=true;
let toggledelete=true;
let ticketcolors=document.querySelectorAll(".inital-color .color");
let colorArray=["red","black","pink","blue"]
var uid = new ShortUniqueId();
let priorityDiv=document.querySelectorAll(".priority-color .color");
let locktoggle=false;



let ticketArray=[];


if(localStorage.getItem("jira")){
  let str=localStorage.getItem("jira");
  let localArray=JSON.parse(str);
  ticketArray=localArray;
  for(let i=0;i<localArray.length;i++){
      let task=localArray[i].text;
      let id=localArray[i].id;
      let color=localArray[i].color;


      ticketMaker(task,id,color,-1);
  }

}



// add button functionality 
addBtn.addEventListener("click",function(){
    if(toggleAdder){
        ticketAdder.style.display="flex";

    }else{
        ticketAdder.style.display="none";

    }
    toggleAdder=!toggleAdder;

})

// delete button color chnage 
deleteBtn.addEventListener("click",function(){
    if(toggledelete){
        deleteBtn.style.backgroundColor ="red";
    }else{
        deleteBtn.style.backgroundColor="#A0D995" 
    }
    toggledelete=!toggledelete;
})

// enter function of ticket adder
ticketText.addEventListener("keydown",function(e){
    
    if(e.key=="Enter"){
        let id =uid();
        let task=ticketText.value;
        
        ticketText.value="";

        ticketAdder.style.display="none";
        toggleAdder=!toggleAdder;
       

     ticketMaker(task,id);
        
    }
})

// border functionality

for(let i=0;i<ticketcolors.length;i++){
ticketcolors[i].addEventListener("click",function(){

let borderclass=document.querySelector(".border");
borderclass.classList.remove("border");
ticketcolors[i].classList.add("border");

})
}
// priority color functionality

for(let i=0;i<priorityDiv.length;i++){
    priorityDiv[i].addEventListener("click",function(){
    ticketCont.innerHTML="";
     let color =priorityDiv[i].classList[1];
     let filteredArr=[];
     for(let i=0;i<ticketArray.length;i++){
         if(ticketArray[i].color==color){
            filteredArr.push(ticketArray[i]);
         }
     }

     for(let i=0;i<filteredArr.length;i++){
        let color= filteredArr[i].color;
        let task=filteredArr[i].text;
        let id=filteredArr[i].id;
        console.log("hello");
        ticketMaker(task,id,color,-1)

     }


        
    })
}

// main part ticket maker function



function ticketMaker(task,id,color,n){
    console.log()
    let colorClass=color;
    if(colorClass==undefined){
    let borderclass=document.querySelector(".border");
     colorClass=borderclass.classList[1];
    console.log(colorClass);
    }
 let ticketDiv=document.createElement("div");
 ticketDiv.classList.add("ticket");
 ticketDiv.innerHTML=` 
 <div class="current-color ${  colorClass}"></div>
  <div class="unique">#${id}</div>
  <div class="task-part">${task} </div>  
  <span class="material-symbols-outlined  lock">
                   lock
                  </span>   `

ticketCont.appendChild(ticketDiv);
if(n!=-1){
let ticketObj={
    color:colorClass,
    id:id,
    text:task,
}
ticketArray.push(ticketObj);
console.log(ticketArray);
updateStorgae();

}




ticketDiv.addEventListener("dblclick",function(){
    if(toggledelete==false){
     ticketDiv.remove();
     let idx=getidx(id);
     ticketArray.splice(idx,1);
     updateStorgae();
     
    }
})



// ticket color changer

let currentTicketColor=ticketDiv.querySelector(".current-color");

currentTicketColor.addEventListener("click",function(){
    console.log("clicked");
   let currentcolor=currentTicketColor.classList[1];
   currentTicketColor.classList.remove(currentcolor);
   let currentcolorIndex=-1;
   for(let i=0;i<colorArray.length;i++){
       if(colorArray[i]==currentcolor){
            currentcolorIndex=i;
       }
   }
   let nextColorIndex=(currentcolorIndex+1)%4;

   currentTicketColor.classList.add(colorArray[nextColorIndex]);
//  update ui 
   let idx=getidx(id);
   ticketArray[idx].color=colorArray[nextColorIndex];
   

   updateStorgae();


})
// lock functionality
let lockBtn=ticketDiv.querySelector(".lock")


lockBtn.addEventListener("click",function(){
    let taskarea=ticketDiv.querySelector(".task-part")
    if(locktoggle){
        lockBtn.innerText="lock";
        taskarea.setAttribute("contenteditable", "false");
        let idx=getidx(id);
        ticketArray[idx].text=taskarea.textContent;
        updateStorgae();
    }else{
        lockBtn.innerText="lock_open";
        taskarea.setAttribute("contenteditable", "true");
   
       
    }
   
    
    locktoggle=!locktoggle;

   



})






}

function getidx(id){
    for(let i=0;i<ticketArray.length;i++){
        if(ticketArray[i].id==id){
            return i;
        }
    }
}


function updateStorgae(){
    let stringArr=JSON.stringify(ticketArray);
localStorage.setItem("jira",stringArr);
}
