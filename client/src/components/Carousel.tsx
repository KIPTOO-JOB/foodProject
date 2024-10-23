import React, { useState, useEffect } from "react";

const Carousel: React.FC = () => {
	const images: string[] = [
		// "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
		// "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
		// "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",

		"https://files.oaiusercontent.com/file-rX3x6q7J4Wljht8lRbd9nF8l?se=2024-10-21T15%3A11%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D2a186045-fb03-481c-aacc-ef6b014879c9.webp&sig=WGr2AjFt/I7h5pQ8%2BdjzaxYju1fWzQS%2B8mI6XkyvsUw%3D",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ElNenxoF5tAdRzcXzCLEtAHaEK%26pid%3DApi&f=1&ipt=ed2caa4f317efe60781d2b0016110c7f6fd0523079d61a521bc2606f5bd7cefa&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Mztid6FlMAWrvbPwrKjGEQHaFC%26pid%3DApi&f=1&ipt=d30a8705e501bda6babe158aad12f91decbbad872c35675f1f414ea4d8744bfb&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.UuX7IBx50qkl_E_lL2DGegHaE8%26pid%3DApi&f=1&ipt=556d0ec96291bbcaa4f59f7c8b3e93a00334740fecdb0a00e8d0fbbda6dcaf46&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.988Z21dnU0AGWDc1LTncCAHaFj%26pid%3DApi&f=1&ipt=e7557635cc077eb7e799b4b1cf7ae0682e6e5b952524464a0465d8fc3d3813f6&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.VmNNKSOf8UORYm3vB4ZNmwHaEJ%26pid%3DApi&f=1&ipt=39801d318588338f472a60d700347a59ce0be20741548527a351f72d028004f5&ipo=images",
	];

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
