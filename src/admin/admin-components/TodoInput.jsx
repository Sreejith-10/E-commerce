import React from "react";

const TodoInput = ({addedTask,setTodo}) => {
	
	return (
		<>
			<div className="w-[80%] h-[85%] md:w-full rounded-md shadow-md bg-slate-300 flex items-center justify-evenly">
				<div className="w-[85%] h-[85%]">
					<input
						type="Enter new task . . . "
						className="w-full h-full p-3 md:w-[95%] font-bold rounded-md text-slate-700 outline-none"
						onChange={(e)=>setTodo(e.target.value)}
					/>
				</div>
				<div>
					<button
						className="w-auto h-[30px] md:mr-2  px-2 rounded-md text-white font-bold bg-green-500 hover:bg-white hover:text-green-500 "
						onClick={addedTask}>
						Add
					</button>
				</div>
			</div>
		</>
	);
};

export default TodoInput;
