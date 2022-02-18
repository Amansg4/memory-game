import React from "react";
import cover from "../img/cover.png";

const SingleCard = ({ card, flipped, disabled, handleChoice }) => {
	//
	//Choosing a card after clicking on it
	//
	const handleClick = (card) => {
		if (!disabled) {
			handleChoice(card);
		} else console.log("Wait pushy pushy!");
	};

	return (
		<React.Fragment>
			<div className="relative card">
				<div className={`${flipped ? "flipped" : ""}`}>
					<img
						className={`${
							flipped ? "flipped" : ""
						} block w-full border-2 border-white rounded-lg card-front`}
						name={card.name}
						src={card.src}
						alt="card front"
					/>
					<img
						className={`${
							flipped ? "flipped" : ""
						} block w-full border-2 border-white rounded-lg card-back`}
						alt="card back"
						src={cover}
						onClick={() => handleClick(card)}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SingleCard;
