document.addEventListener('DOMContentLoaded',()=>{
    const tasckform = document.getElementById('task-form');
    const tasckinput = document.getElementById('task-input');
    const tascklist = document.getElementById('task-list');
    tasckform.addEventListener('submit',(e)=>{
        e.preventDefault();
        addTask(tasckinput.value);
        tasckinput.value='';
    });
    function addTask (task){
        const li = document.createElement("li");
        li.textContent=task;
        const deletebutton = document.createElement("button");
        deletebutton.textContent= 'Delete';
        deletebutton.addEventListener("click",()=>{
            tascklist.removeChild(li);
        });
        li.appendChild(deletebutton);
        tascklist.appendChild(li);

    }
});


