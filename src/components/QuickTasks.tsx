import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToTasks, removeFromTasks } from "../app/slices/tasksSlice";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const QuickTasks = () => {
	const QuickTasks = useAppSelector((state) => state.quickTasks.tasks);
	const dispatch = useAppDispatch();

	const [newTick, setNewTick] = useState("");

	const handleInput = (value: string) => {
		setNewTick(value);
	};

	const handleAdding = () => {
		dispatch(addToTasks({ title: newTick, id: uuidv4() }));
		setNewTick("");
	};

	const handleRemoving = (id: String) => {
		dispatch(removeFromTasks(id));
	};

	return (
		<StyledPlannerItem>
			<h1>Quick Tasks</h1>
			<input
				type="text"
				name=""
				id=""
				value={newTick}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleInput(e.target.value)
				}
			/>
			<button onClick={handleAdding}>Add Item</button>
			<ol>
				{QuickTasks.map((task) => (
					<div key={task.id.toString()}>
						<li>{task.title}</li>
						<button onClick={() => handleRemoving(task.id)}>Remove Item</button>
					</div>
				))}
			</ol>
		</StyledPlannerItem>
	);
};

export default QuickTasks;

const StyledPlannerItem = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	input {
		height: 2rem;
		padding: 0.5rem;
		outline: none;
	}
	ol {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
`;
