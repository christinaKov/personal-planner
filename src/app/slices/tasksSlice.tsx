import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface QuickTask {
	title: String;
	id: String;
}

interface QuickTasksState {
	tasks: QuickTask[];
}

// Define the initial state using that type
const initialState: QuickTasksState = {
	tasks: [],
};

export const QuickTasksSlice = createSlice({
	name: "QuickTasks",
	initialState,
	reducers: {
		addToTasks: (state, action: PayloadAction<QuickTask>) => {
			state.tasks.push(action.payload);
		},
		removeFromTasks: (state, action: PayloadAction<String>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
	},
});

export const { addToTasks, removeFromTasks } = QuickTasksSlice.actions;

export default QuickTasksSlice.reducer;
