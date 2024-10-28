import Login from "@/components/auth/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
// import Dashboard from "./components/Recipes";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import Recipes from "./components/pages/Recipes";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/recipes" element={<Recipes />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
