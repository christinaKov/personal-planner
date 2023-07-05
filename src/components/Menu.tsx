import styled from "styled-components";

const Menu = () => {
	return (
		<StyledMenu>
			<ul>
				<li>Today's Agenda</li>
				<li>Calendar</li>
				<li>Habit Tracker</li>
			</ul>
		</StyledMenu>
	);
};

export default Menu;

const StyledMenu = styled.nav`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 15rem;
	background: rgb(255, 154, 193);
	padding: 4rem 2rem;
	color: #282727;
	box-shadow: 3px 4px 5px 4px rgba(0, 0, 0, 0.18);
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
`;
