import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowBigDown, ArrowDown01Icon, ArrowLeft } from "lucide-react";

const HeroSection = () => {
	return (
		<div>
			<div className="absolute inset-0  bg-slate-950 bg-opacity-25 mix-blend-multiply" />
			<div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-4">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg  ">
						Welcome to Nosh Navigator
					</h1>
					<p className="text-xl md:text-2xl text-shadow ">
						Please choose an option below:{" "}
					</p>
				</div>
				<div className=" mt-2 space-x-4">
					<Link to="/login">
						<Button>Login</Button>
					</Link>
					<Link to="/register">
						<Button>Register</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
