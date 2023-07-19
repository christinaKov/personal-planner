import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { scheduler } from "timers/promises";

// Define a type for the slice state
interface ScheduleItem {
	title: string;
	time: string;
	id: string;
}

interface ScheduleState {
	schedule: ScheduleItem[];
}

// Define the initial state using that type
const initialState: ScheduleState = {
	schedule: [...Array(24).keys()].map((index) => {
		const time = index >= 9 ? `${index + 1}:00` : `0${index + 1}:00`;
		return {
			title: "",
			time,
			id: index.toString(),
		};
	}),
};

export const ScheduleSlice = createSlice({
	name: "Schedule",
	initialState,
	reducers: {
		addToSchedule: (state, action: PayloadAction<ScheduleItem>) => {
			state.schedule.map((scheduleItem) =>
				scheduleItem.time === action.payload.time
					? (scheduleItem.title = action.payload.title)
					: ""
			);
		},
		removeFromSchedule: (state, action: PayloadAction<ScheduleItem>) => {
			state.schedule.map((scheduleItem) =>
				scheduleItem.id === action.payload.id ? (scheduleItem.title = "") : ""
			);
		},
	},
});

export const { addToSchedule, removeFromSchedule } = ScheduleSlice.actions;

export default ScheduleSlice.reducer;
