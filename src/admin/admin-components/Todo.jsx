import React, {useEffect} from "react";
import {useState} from "react";
import TodoInput from "./TodoInput";
import {arrayUnion, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";

const Todo = () => {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState(false);

	useEffect(() => {
		const onSub = onSnapshot(doc(db, "todo", "todos"), (doc) => {
			setTodos(doc.data().list);
		});

		return () => {
			onSub();
		};
	}, []);
	const newTaskMenu = () => {
		setTask(true);
	};
	const addedTask = async () => {
		await updateDoc(doc(db, "todo", "todos"), {
			list: arrayUnion({
				task: todo,
				state: false,
				time: new Date().toLocaleString(),
			}),
		});
		setTask(false);
	};
	const taskList = todos?.map((val, idx) => {
		return (
			<li
				key={idx}
				className={`w-full h-full p-3 text-start font-bold flex items-centerhover:rounded-md hover:bg-slate-200`}>
				<input id={idx} type="checkbox" className="w-5 h-5 mr-3 " />
				<div className="w-full h-full flex items-center justify-between">
					<h1>{val?.task}</h1>
					<p className="">{val?.time}</p>
				</div>
			</li>
		);
	});
	return (
		<>
			<div className="w-full h-full flex flex-col items-center justify-evenly">
				<div className="w-full h-[10%] text-start font-bold text-3xl">
					<h1 className="ml-4 mt-1 text-blue-500">Tasks</h1>
				</div>
				<div className="w-[95%] h-[80%] overflow-scroll">
					<ul>{taskList}</ul>
				</div>
				<div className="w-[95%] h-[15%] flex items-center justify-center">
					{task ? (
						<TodoInput addedTask={addedTask} setTodo={setTodo} todo={todo} />
					) : (
						<button
							className="bg-green-500 p-1 float-right rounded-md font-bold text-white"
							onClick={newTaskMenu}>
							Add Task
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Todo;
