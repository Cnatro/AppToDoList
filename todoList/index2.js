const key_localStorage = "task";
//save data
const saveData = (data) =>{
    localStorage.setItem(key_localStorage,JSON.stringify(data));
}
//loadData
const loadData = () =>{
    return JSON.parse(localStorage.getItem(key_localStorage)) || [];
    // hoặc cũng có thể làm như vậy
    /* 
    let data ;
    data = JSON.parse(localStorage.getItem(key_localStorage));
    data = data ? data : []; // nếu data có dữ liệu != null thì trả về data còn không thì mảng rỗng
    return data;
    */
}

const addTask = (new_task)=>{
    let data = loadData();
    data = [...data,new_task]; // = data.push(new_task)
    saveData(data);
}
//CreateTaskItem
const CreateTaskItem = (task,is_complete,index) =>{
    return `
    <li class="task-item" is-complete = ${is_complete} index = ${index}>
        <span onclick ="markTaskComplete(${index})">${task}</span>
        <div class="task-action">
            <i class="fa fa-pencil" aria-hidden="true" onclick = "pushEditTask(${index})"></i>
            <i class="fa fa-trash" aria-hidden="true" onclick = "deleteTask(this,${index})"  ></i>
        </div>
    </li>
    `;
}
// render data
const renderTask = function (){
    let list_data = loadData();

    countTaskComplete(list_data);
    //tạo item 
    let ulTaskHTML = list_data.map((element,index) =>{
        return CreateTaskItem(element.task ,element.is_complete ,index);
    })
    let ulTask = document.querySelector('.tasks');
    ulTask.innerHTML = ulTaskHTML.join('');
}
const countTaskComplete = (list_data) =>{
    let result_root = document.getElementById("task-result");
    let count = 0;
    list_data.forEach(element => {
        if(element.is_complete === true){
            ++count;
        }
    });
    result_root.innerHTML = `yeah,${count} task completed`;
}
// markTaskComplete
const markTaskComplete = (index) =>{
    let data = loadData();
    data[index].is_complete = data[index].is_complete == true ? false : true;
    saveData(data);
    renderTask();
}
//delete task
const deleteTask = (element,index)=> {
    let delete_comfirm = confirm("Bạn chắc chắn muốn xóa ?");
    if( !delete_comfirm ) return false;
    let data = loadData();
    data.splice(index,1);
    saveData(data);
    element.closest(".task-item").remove();
    //renderTask(); // thay vì dùng render ta có thể xóa ngay phần tử ta đang tương tác
}
const pushEditTask = (index) =>{
    let search = document.getElementById('task');
    let list_data  = loadData();
    search.value = list_data[index].task;
    search.setAttribute("index",index);

    const btn = document.querySelector('#add_task button');
    btn.innerHTML = btn.innerHTML ="EDIT TASK";
}


const editTask = (update_task,index) =>{
    const btn = document.querySelector('#add_task button');
    let list_data = loadData();

    list_data[index].task = update_task;
    btn.innerHTML = btn.innerHTML ="ADD TASK";
    saveData(list_data);
}


///===========================================
const fromAddTask = document.forms.add_task;
//ưu tiên sử dụng submit hơn click
//click phải lick đúng phần tử
fromAddTask.addEventListener('submit',(ele)=>{
    let index = task.getAttribute('index');

    if(task.value.length < 2) {
        alert("Enter your task ! Cần phải có 2 kí tự");
        return false;
    }
    if(index) {
        editTask(task.value,index);
        task.removeAttribute("index");
    }else{
        let new_task = {
            task : task.value,
            is_complete : false
        }
        addTask(new_task);   
    }
    renderTask();
    task.value = null;
    ele.preventDefault();
})
renderTask();
///=============================
// tạo phím esc
document.addEventListener("keyup",(e) =>{
    let search = document.getElementById('task');
    let btn = document.querySelector('#add_task button');
    if(e.which == 27){
        search.value = "";
        search.removeAttribute("index");
        btn.innerHTML = "ADD TASK";
    }
})






// const addTask = ()=>{
//     let btn = document.querySelector(".task-head button");
//     let inputSearch = document.getElementById("task");

//     let listData = loadData();
//     btn.addEventListener('click',(ele)=>{
//         if(inputSearch.value != ""){
//             let task = {
//                 task : inputSearch.value,
//                 is_complete : false
//             }
//             listData.push(task);
//             saveData(listData);
//             inputSearch.value = null;
//         }
//         ele.preventDefault();
//     });
// }
// window.onload = ()=>{
//     addTask();
//     console.log(loadData());
// }