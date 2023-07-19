import MenuComponent from "./Menu";

import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef } from "react";

import { Link } from "react-router-dom";

const Nav = () => {
	const menuIconRef = useRef<HTMLButtonElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

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
						Today's Agenda
					</Typography>
					<Link to="/log-in">
						<Button color="inherit">Login</Button>
					</Link>
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
