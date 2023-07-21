// React
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Components
import MenuComponent from "./Menu";

// Auth
import { fetchSession, supabase } from "../../app/slices/authSlice";

// Styles
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = () => {
	const dispatch = useAppDispatch();

	const session = useAppSelector((state) => state.authInfo.session);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Ошибка при выходе:", error);
		} else {
			dispatch(fetchSession());
		}
	};

	const menuIconRef = useRef<HTMLButtonElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const location = useLocation();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleMenu}
						ref={menuIconRef}
						id="nav__menu-tbn"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{location.pathname === "/"
							? "Today's Agenda"
							: location.pathname === "/habbits"
							? "Habbit Tracker"
							: ""}
					</Typography>

					{session ? (
						<Button onClick={handleSignOut} color="inherit">
							Log Out
						</Button>
					) : (
						<Link to="/log-in">
							<Button color="inherit">Log In</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
			<MenuComponent
				anchorEl={menuIconRef.current}
				isOpen={isOpen}
				toggleMenu={toggleMenu}
			></MenuComponent>
		</Box>
	);
};

export default Nav;
