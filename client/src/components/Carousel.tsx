import React, { useState, useEffect } from "react";
import { images } from "../Exports/images";

const Carousel: React.FC = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000);

		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<div>
			{images.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						index === currentImageIndex ? "opacity-100" : "opacity-0"
					}`}
				>
					<img
						src={image}
						alt={`Image ${index + 1}`}
						className="object-cover w-full h-full"
					/>
				</div>
			))}
		</div>
	);
};

export default Carousel;
