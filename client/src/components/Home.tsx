import Carousel from "./Carousel";
import HeroSection from "./HeroSection";
const Home = () => {
	return (
		<main>
			<section className="relative min-h-screen overflow-hidden">
				<Carousel />
				<section>
					<HeroSection />
				</section>
			</section>
		</main>
	);
};

export default Home;
