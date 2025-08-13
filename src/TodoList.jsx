import { useState } from "react";
import "./first_func.css";
import { v4 as uuidv4 } from 'uuid'; //use to get unique id


export default function Todo() {

    let [todos, setTodos] = useState([{task: "sample Task", ID: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("");

    function addNewTask() {
        if (newTodo !== "" && newTodo.length>2) {
            console.log(`Adding => ${newTodo}`);
            console.log(todos);
            setTodos((prevTodo) => [
                ...prevTodo,
                { task: newTodo, ID: uuidv4() },
            ]);
            setNewTodo("");  // ✅ Clear input after adding
        } else {
            console.log("Please enter a task before adding.");
            alert("Enter valid task and Task size must be greater than 2. 😃");
        }
    }
    function updateTodoValue(event){
        setNewTodo(event.target.value);
    } 
    function deleteTodo(id){
        {todos.map((todo)=>{id===todo.ID? console.log(`Going to delete this task: ${todo.task}`):""})}

        setTodos(todos.filter((todo) => id!=todo.ID));
        setTimeout(()=>{todos.map((todo)=>{id===todo.ID? console.log(`Task: ${todo.task} is deleted.`):""})}, 1000)
    }

    function ToUpperCaseOne(id){
        setTodos((todos) => 
            todos.map((todo)=>{
                if(todo.ID==id){
                    return {
                        ...todo,
                        task: todo.task.toUpperCase(),
                    };
                }else{
                    return todo;
                }
            })
        );
    }

    let toUpper = () => {
        setTodos((todos) => (
            todos.map((todo)=>{
                return {
                    ...todo,
                    task: todo.task.toUpperCase(),
                };
            })
        ));
    };
    let toLower = () => {
        setTodos((todos) => 
            todos.map((todo)=>{
                return {
                    ...todo,
                    task: todo.task.toLowerCase(),
                };
            })
        );
    };

    let doneTask=(id)=>{
        setTodos((todos) => 
            todos.map((todo) => {
                if(todo.ID==id){
                    return {
                        ...todo,
                        isDone:true
                    }
                }else{
                    return todo;
                }
            })
        )
    };


    function markAsRead(id){
        setTodos((todos) => 
            todos.map((todo)=>{
                if(todo.ID==id){
                    return {
                        ...todo,
                        isDone: true,
                    };
                }else{
                    return todo;
                }
            })
        );
    }



    return (
        <div className="todo_div">
               
            <input 
                type="text"
                placeholder="Enter Task" 
                value={newTodo}
                className="input"
                onChange={updateTodoValue}
    
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addNewTask();  // Call the function when Enter btn is pressed
                    }
                }}
            ></input> 

            <br></br>
            
            <div className="add-task-container">
                <button onClick={addNewTask}>Add Task</button>
            </div>

            <br></br>
            <hr></hr>

            <h2>Tasks saved</h2>

            <ul>
                {
                    todos.map((todo)=>(

                        <li key={todo.ID}>                            
                            <span className={todo.isDone? "span_task":""}>
                                {todo.task}
                            </span>

                            &nbsp;&nbsp;&nbsp;
                            <div className="btns">
                                <button onClick={() => deleteTodo(todo.ID)}>delete</button>
                                &nbsp;
                                <div className="todo-buttons">
                                    <button onClick={() => ToUpperCaseOne(todo.ID)}>UpperCaseOne</button>
                                    <button onClick={() => markAsRead(todo.ID)}>Mark as Done</button>
                                </div>
                            </div>
                        </li>

                    ))
                }
            </ul>
            <br></br><br />

            
            <button onClick={() => toUpper()}>To UpperCase</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => toLower()}>To LowerCase</button>
            &nbsp;&nbsp;&nbsp;
            {/* <button onClick={() => doneTask(todo.is)}>Mark as Done</button> */}

        </div>
    );
}