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
			<MenuItem onClick={toggleMenu}>Today's Agenda</MenuItem>
			<MenuItem onClick={toggleMenu}>Calendar</MenuItem>
			<MenuItem onClick={toggleMenu}>Habit Tracker</MenuItem>
		</Menu>
	);
};

export default MenuComponent;
