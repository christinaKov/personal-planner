// React
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Styles
import { Box, TextField, Button } from "@mui/material";

// Auth
import { fetchSession, supabase } from "../../app/slices/authSlice";

const LogInComponent = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleEmailSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.error("Ошибка при регистрации по email:", error);
		} else {
			dispatch(fetchSession());
		}
	};

	const handleEmailSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Ошибка при входе по email:", error);
		} else {
			dispatch(fetchSession());
		}
	};
	return (
		<Box>
			<Box display="flex" gap="1vw">
				<TextField
					value={email}
					onInput={handleEmail}
					type="email"
					placeholder="email"
				/>
				<TextField
					value={password}
					onInput={handlePassword}
					type="text"
					placeholder="password"
				/>
			</Box>
			<Box>
				<Button onClick={handleEmailSignUp}>Sign Up</Button>
				<Button onClick={handleEmailSignIn}>Log In</Button>
			</Box>
		</Box>
	);
};

export default LogInComponent;
