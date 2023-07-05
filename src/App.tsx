// Redux
import { store } from "./app/store";
import { Provider } from "react-redux";

// Styles
import styled from "styled-components";

// Components
import MainPage from "./pages/PlannerPage";
import Menu from "./components/Menu";

function App() {
	return (
		<Provider store={store}>
			<StyledApp className="App">
				<Menu></Menu>
				<MainPage></MainPage>
			</StyledApp>
		</Provider>
	);
}

export default App;

const StyledApp = styled.div`
	display: flex;
`;
