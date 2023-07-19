// React
import { useState } from "react";

// Supabase
import { SupabaseClient, Session } from "@supabase/supabase-js";

// Styles
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
