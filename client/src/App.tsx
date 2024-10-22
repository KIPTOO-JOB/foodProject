import Login from "@/components/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
