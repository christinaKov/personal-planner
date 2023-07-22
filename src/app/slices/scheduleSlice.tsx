// Redux
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Supabase
import { supabase } from "./authSlice";
import { Session } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

// UUID
import { v4 as uuidv4 } from "uuid";

// Define a type for the slice state
type ScheduleItem = Database["public"]["Tables"]["schedule_items"]["Insert"];

interface ScheduleState {
	schedule: ScheduleItem[];
}

// Define the initial state using that type
const initialState: ScheduleState = {
	schedule: [],
};

export const fetchSchedule = createAsyncThunk(
	"schedule/fetchSchedule",
	async (userId: string, thunkAPI) => {
		const scheduleList = [...Array(24).keys()].map((index) => {
			const schedule_time = index >= 9 ? `${index + 1}:00` : `0${index + 1}:00`;
			return {
				schedule_item_title: "",
				schedule_time,
				id: uuidv4(),
			};
		});

		const { data: scheduleItems, error } = await supabase
			.from("schedule_items")
			.select("*")
			.eq("user_id", userId);

		scheduleList.map((scheduleItem) => {
			scheduleItems?.forEach((supabaseItem) =>
				scheduleItem.schedule_time === supabaseItem.schedule_time
					? (scheduleItem.schedule_item_title =
							supabaseItem.schedule_item_title)
					: ""
			);
		});

		return scheduleList;
	}
);

export const ScheduleSlice = createSlice({
	name: "Schedule",
	initialState,
	reducers: {
		addToSchedule: (
			state,
			action: PayloadAction<[ScheduleItem, Session | null]>
		) => {
			const newScheduleItem = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { data, error } = await supabase
						.from("schedule_items")
						.insert([
							{
								user_id: session.user.id,
								schedule_item_title: newScheduleItem.schedule_item_title,
								id: newScheduleItem.id,
								schedule_time: newScheduleItem.schedule_time,
							},
						])
						.select();
				})();
			}

			state.schedule.map((scheduleItem) =>
				scheduleItem.schedule_time === newScheduleItem.schedule_time
					? (scheduleItem.schedule_item_title =
							newScheduleItem.schedule_item_title)
					: ""
			);
		},
		removeFromSchedule: (
			state,
			action: PayloadAction<[ScheduleItem, Session | null]>
		) => {
			const newScheduleItem = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { error } = await supabase
						.from("schedule_items")
						.delete()
						.eq("id", newScheduleItem.id);
				})();
			}

			state.schedule.map((scheduleItem) =>
				scheduleItem.id === newScheduleItem.id
					? (scheduleItem.schedule_item_title = "")
					: ""
			);
		},
		toggleScheduleDone: (
			state,
			action: PayloadAction<[ScheduleItem, Session | null]>
		) => {
			const newScheduleItem = action.payload[0];
			const session = action.payload[1];

			if (session) {
				(async () => {
					const { data, error } = await supabase
						.from("tasks")
						.update({ is_done: !newScheduleItem.is_done })
						.eq("id", newScheduleItem.id)
						.select();
				})();
			}

			state.schedule.map((schedule) =>
				schedule.id === newScheduleItem.id
					? (schedule.is_done = !schedule.is_done)
					: ""
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSchedule.fulfilled, (state, action) => {
			if (action.payload) state.schedule = action.payload;
		});
	},
});

export const { addToSchedule, removeFromSchedule, toggleScheduleDone } =
	ScheduleSlice.actions;

export default ScheduleSlice.reducer;
