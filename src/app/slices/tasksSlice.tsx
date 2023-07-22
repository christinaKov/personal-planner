// Redux
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Supabase
import { supabase } from "./authSlice";
import { Session } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

// Define a type for the slice state
type QuickTask = Database["public"]["Tables"]["tasks"]["Row"];

interface QuickTasksState {
	tasks: QuickTask[];
}

// Define the initial state using that type
const initialState: QuickTasksState = {
	tasks: [],
};

export const fetchTasks = createAsyncThunk(
	"tasks/fetchTasks",
	async (userId: string, thunkAPI) => {
		const { data: tasks, error } = await supabase
			.from("tasks")
			.select("*")
			.eq("user_id", "3c08280b-d11f-4915-b314-3c0e9bb96400");
		return tasks;
	}
);

export const QuickTasksSlice = createSlice({
	name: "QuickTasks",
	initialState,
	reducers: {
		addToTasks: (state, action: PayloadAction<[QuickTask, Session | null]>) => {
			const newTask = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const data = await supabase
						.from("tasks")
						.insert([
							{
								user_id: session.user.id,
								task_title: newTask.task_title,
								id: newTask.id,
							},
						])
						.select();
				})();
			}
			state.tasks.push(newTask);
		},
		removeFromTasks: (
			state,
			action: PayloadAction<[QuickTask, Session | null]>
		) => {
			const newTask = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { error } = await supabase
						.from("tasks")
						.delete()
						.eq("id", newTask.id);
				})();
			}

			state.tasks = state.tasks.filter((task) => task.id !== newTask.id);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			if (action.payload) state.tasks = action.payload;
		});
	},
});

export const { addToTasks, removeFromTasks } = QuickTasksSlice.actions;

export default QuickTasksSlice.reducer;
