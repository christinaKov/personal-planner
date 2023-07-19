import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ff88b0",
			dark: "#ff4885",
		},
		secondary: {
			main: "#D1FFA6",
		},
	},
});

export default function Palette(props: { children: React.ReactNode }) {
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
