import { useContext, useState } from "react";
import {AuthContext} from "./context/AuthContext";
import Login from "./pages/Login";
import MainLayout from "./Components/MainLayout";

const App = () => {
	const { isAuth } = useContext(AuthContext);
	return (
		<>
			{isAuth ? <MainLayout /> : <Login />}
		</>
	);
};

export default App;