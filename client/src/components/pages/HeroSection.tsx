import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Carousel from "../Carousel";
import { features } from "../../Exports/featueres";
const HeroSection = () => {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<Carousel />
			<div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/90 backdrop-blur-sm" />

			{/* Content */}
			<div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-3xl mx-auto"
				>
					<h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
						Welcome to{" "}
						<span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/70">
							Nosh Navigator
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-200 mb-12">
						Discover, create, and share your favorite recipes with the world
					</p>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
						<Link to="/login">
							<Button
								size="lg"
								className="w-full sm:w-auto min-w-[150px] bg-primary hover:bg-primary/90 text-white font-semibold hover:text-gray-600 "
							>
								Login
							</Button>
						</Link>
						<Link to="/register">
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto min-w-[150px] border-2 hover:bg-white/10 text-black hover:text-gray-500"
							>
								Register
							</Button>
						</Link>
					</div>

					{/* Features Section */}
					<div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
								className="p-6 rounded-lg bg-white/5 backdrop-blur-sm"
							>
								<feature.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
								<h3 className="text-lg font-semibold text-white mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-300 text-sm">{feature.description}</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroSection;
