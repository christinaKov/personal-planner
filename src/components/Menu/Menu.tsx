// React
import { Link } from "react-router-dom";

// Styles
import { MenuItem, Menu } from "@mui/material";

const MenuComponent = ({
	anchorEl,
	isOpen,
	toggleMenu,
}: {
	anchorEl: null | HTMLElement;
	isOpen: boolean;
	toggleMenu: () => void;
}) => {
	return (
		<Menu
			anchorEl={anchorEl}
			open={isOpen}
			onClose={toggleMenu}
			MenuListProps={{
				"aria-labelledby": anchorEl?.id,
			}}
		>
			<Link to="/">
				<MenuItem onClick={toggleMenu}>Today's Agenda</MenuItem>
			</Link>

			<Link to="/calendar">
				<MenuItem onClick={toggleMenu}>Calendar</MenuItem>
			</Link>
			<Link to="/habbits">
				<MenuItem onClick={toggleMenu}>Habit Tracker</MenuItem>
			</Link>
		</Menu>
	);
};

export default MenuComponent;
