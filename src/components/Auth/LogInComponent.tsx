import { SupabaseClient, Session } from "@supabase/supabase-js";
import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

const LogInComponent = ({
	supabase,
	session,
	setSession,
}: {
	supabase: SupabaseClient<any, "public", any>;
	session: Session | null;
	setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}) => {
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
			setSession(session);
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
			setSession(session);
		}
	};
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100%"
		>
			<Box>
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
			<Button onClick={handleEmailSignUp}>Sign Up</Button>
			<Button onClick={handleEmailSignIn}>Log In</Button>
		</Box>
	);
};

export default LogInComponent;
