// Components
import QuickTasks from "../components/Tasks/QuickTasks";
import Projects from "../components/Projects/Projects";
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
			<Box
				display="grid"
				width="100%"
				gridTemplateColumns="repeat(3, minmax(0, 1fr) )"
				gridAutoFlow="row"
				gap="1vw"
			>
				<QuickTasks></QuickTasks>
				<Projects></Projects>
				<Schedule></Schedule>
			</Box>
		</Box>
	);
};

export default MainPage;
