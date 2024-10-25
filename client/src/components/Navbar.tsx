import {
	Menu,
	Search,
	PlusCircle,
	UtensilsCrossed,
	X,
	LogOut,
} from "lucide-react";
// import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="">
			<div className="fixed top-0 w-full backdrop-blur-md bg-white/70 shadow-sm z-50 p-2">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center ">
						<div className="flex items-center space-x-2">
							<UtensilsCrossed
								className="h-8 w-8 text-slate-800/75"
								strokeWidth={2.5}
							/>
							<span className="text-2xl font-bold bg-gradient-to-b from-slate-900/70 to-slate-900/90 bg-clip-text text-transparent ">
								CulinaryShare
							</span>
						</div>
					</div>

					<div className="hidden md:flex items-center space-x-8">
						<a
							href="#"
							className="text-gray-700 hover:text-orange-500 transition-colors"
						>
							Discover
						</a>
						<a
							href="#"
							className="text-gray-700 hover:text-orange-500 transition-colors"
						>
							Categories
						</a>
						<a
							href="#"
							className="text-gray-700 hover:text-orange-500 transition-colors"
						>
							Popular
						</a>
					</div>

					<div className="flex items-center space-x-4 justify-between ">
						<div className="relative hidden md:block">
							<input
								type="text"
								placeholder="Search recipes..."
								className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 text-white focus:outline-none "
							/>
							<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
						</div>
						<button className="flex items-center space-x-1 secondary text-white px-4 py-2 rounded-full  sm:w-fit hover:bg-red-500  transition-colors bg-orange-500 ">
							<PlusCircle className="h-5 w-5" />
							<span>Share Recipe</span>
						</button>{" "}
						<div>
							<button
								className="md:hidden p-2 rounded-md hover:bg-gray-100"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								{isMobileMenuOpen ? (
									<X className="h-6 w-6 text-gray-600" />
								) : (
									<Menu className="h-6 w-6 text-gray-600" />
								)}
							</button>
						</div>
						<Link to="/login" className=" pr-5">
							<button className="p-2 rounded-full  md:flex hover:bg-gray-100 flex bg-white/25 ">
								<LogOut className="h-6 w-6 text-gray-600" />
								<h4 className=" text-red-500">Exit</h4>
							</button>
						</Link>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden ${
						isMobileMenuOpen ? "block" : "hidden"
					} fixed inset-x-0  z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-200 ease-in-out`}
				>
					<div className="px-4 pt-2 pb-4 space-y-4">
						<div className="relative mb-4">
							<input
								type="text"
								placeholder="Search recipes..."
								className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none text-secondary "
							/>
							<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
						</div>

						<button className="w-full flex items-center justify-center space-x-1 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
							<PlusCircle className="h-5 w-5" />
							<span>Share Recipe</span>
						</button>

						<div className="pt-4 border-t border-gray-200">
							<a
								href="#"
								className="block py-2 text-gray-700  transition-colors"
							>
								Discover
							</a>
							<a
								href="#"
								className="block py-2 text-gray-700  transition-colors"
							>
								Categories
							</a>
							<a
								href="#"
								className="block py-2 text-gray-700 transition-colors"
							>
								Popular
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
