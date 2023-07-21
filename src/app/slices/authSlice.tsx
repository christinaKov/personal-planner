import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Session, createClient, SupabaseClient } from "@supabase/supabase-js";

// Define a type for the slice state
interface AuthInfoState {
	session: Session | null;
}

// Define the initial state using that type
const initialState: AuthInfoState = {
	session: null,
};

export const supabase = createClient(
	"https://ersihsrulpuwhyljhwnc.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyc2loc3J1bHB1d2h5bGpod25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NjM2ODMsImV4cCI6MjAwMzUzOTY4M30.uGjEAqvwQxxosa7u1vR6W9Loli_RHPks5TKTh_BN4TQ"
);

export const fetchSession = createAsyncThunk(
	"session/fetchSession",
	async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session;
	}
);

export const AuthInfoSlice = createSlice({
	name: "AuthInfo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSession.fulfilled, (state, action) => {
			state.session = action.payload;
		});
	},
});

export default AuthInfoSlice.reducer;
