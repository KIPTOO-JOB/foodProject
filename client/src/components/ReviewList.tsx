import React from "react";
import { Review } from "../types/recipe.types";
import { MessageSquareMore } from "lucide-react";

interface ReviewListProps {
	reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
	return (
		<div>
			<span className="font-semibold mb-2 flex ">
				{" "}
				<h4>Reviews:</h4>
				<MessageSquareMore />
			</span>
			{reviews.length > 0 ? (
				<ul className="space-y-2">
					{reviews.map((review, index) => (
						<li key={index} className="bg-gray-50 p-2 rounded">
							<strong className="italic">
								{review.user.username || "Anonymous"}:
							</strong>{" "}
							{review.comment}
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500 italic">No reviews yet.</p>
			)}
		</div>
	);
};

export default ReviewList;
