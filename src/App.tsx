// Redux
import { store } from "./app/store";
import { Provider } from "react-redux";

// Components
import MainPage from "./pages/PlannerPage";
import Nav from "./components/Menu/Nav";
import LogInPage from "./pages/AuthPage";
import HabbitOfTheDay from "./components/HabbitOfTheDay";

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Nav></Nav>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/log-in" element={<LogInPage />} />
					<Route path="/habbits" element={<HabbitOfTheDay />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
