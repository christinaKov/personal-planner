// Redux
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Supabase
import { supabase } from "./authSlice";
import { Session } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

// Define a type for the slice state
type QuickTask = Database["public"]["Tables"]["tasks"]["Insert"];

interface QuickTasksState {
	tasks: QuickTask[];
}

// Define the initial state using that type
const initialState: QuickTasksState = {
	tasks: [],
};

const sortList = (list: QuickTask[]) =>
	list.sort(
		(task, nextTask) => Number(task.is_done) - Number(nextTask.is_done)
	);

export const fetchTasks = createAsyncThunk(
	"tasks/fetchTasks",
	async (userId: string | undefined, thunkAPI) => {
		const { data: tasks, error } = userId
			? await supabase.from("tasks").select("*").eq("user_id", userId)
			: { data: [], error: "" };
		return tasks ? sortList(tasks) : [];
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
			state.tasks.unshift(newTask);
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
		toggleTaskDone: (
			state,
			action: PayloadAction<[QuickTask, Session | null]>
		) => {
			const newTask = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { data, error } = await supabase
						.from("tasks")
						.update({ is_done: !newTask.is_done })
						.eq("id", newTask.id)
						.select();
				})();
			}

			state.tasks.map((task) =>
				task.id === newTask.id ? (task.is_done = !task.is_done) : ""
			);
			sortList(state.tasks);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			if (action.payload) state.tasks = action.payload;
		});
	},
});

export const { addToTasks, removeFromTasks, toggleTaskDone } =
	QuickTasksSlice.actions;

export default QuickTasksSlice.reducer;
