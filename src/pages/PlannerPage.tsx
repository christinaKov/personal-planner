// Components
import QuickTasks from "../components/QuickTasks";
import Projects from "../components/Projects";
import Schedule from "../components/Schedule/Schedule";

//Styles
import { Box } from "@mui/material";

const MainPage = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			width="100%"
			padding="4rem"
		>
			<Box display="grid" width="100%" gridTemplateColumns="repeat(3, 1fr)">
				<QuickTasks></QuickTasks>
				<Projects></Projects>
				<Schedule></Schedule>
			</Box>
		</Box>
	);
};

export default MainPage;
