import { Box, List, ListItem, Typography, TextField } from "@mui/material";
import CheckboxList from "../components/Habbits/CheckboxList";

const HabbitOfTheDay = () => {
	return (
		<Box padding="4vw">
			<Box display="grid" gridTemplateColumns="1fr 2fr">
				<Box
					border="1px black solid"
					display="flex"
					justifyContent="space-between"
					padding="1vw"
					gridColumn="2/2"
				>
					{["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
						<Typography key={day}>{day}</Typography>
					))}
				</Box>
				<Box border="1px black solid">
					<List>
						<ListItem>
							<Typography>sport</Typography>
						</ListItem>
						<ListItem>
							<Typography>sleep at 10pm</Typography>
						</ListItem>
						<ListItem>
							<Typography>train my dog</Typography>
						</ListItem>
					</List>
				</Box>
				<Box border="1px black solid">
					<CheckboxList></CheckboxList>
					<CheckboxList></CheckboxList>
					<CheckboxList></CheckboxList>
				</Box>
			</Box>
			<Box paddingTop="4vw">
				<TextField placeholder="type new habbit..." fullWidth></TextField>
			</Box>
		</Box>
	);
};

export default HabbitOfTheDay;
