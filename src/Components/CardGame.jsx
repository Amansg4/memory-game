import React from "react";
import { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import helmet from "../img/helmet-1.png";
import potion from "../img/potion-1.png";
import ring from "../img/ring-1.png";
import scroll from "../img/scroll-1.png";
import shield from "../img/shield-1.png";
import sword from "../img/sword-1.png";

const cardImages = [
	{ name: "Helmet", src: helmet, matched: false },
	{ name: "Potion", src: potion, matched: false },
	{ name: "Ring", src: ring, matched: false },
	{ name: "Scroll", src: scroll, matched: false },
	{ name: "Shield", src: shield, matched: false },
	{ name: "Sword", src: sword, matched: false },
];

const CardGame = () => {
	//
	//* Use-States */
	//
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	//
	//* Functions */
	//
	//shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	//handling the user card choice
	const handleChoice = (card) => {
		console.log("The card picked is a", card.name);
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	//resetting choices & increasing turn

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	//comparing 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			console.log(choiceOne.name, "And", choiceTwo.name);
			if (choiceOne.name === choiceTwo.name) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.name === choiceOne.name) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				console.log("Cards Match");
				resetTurn();
			} else {
				console.log("Sorry! Cards Don't Match");
				setTimeout(() => {
					resetTurn();
				}, 1500);
			}
			console.log("Turns:", turns, "CardState:", cards);
		}
	}, [choiceOne, choiceTwo, cards, turns]);

	//Start a New Game Automatically

	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<React.Fragment>
			<div className="card-table">
				<h1>Magic Match</h1>
				<button onClick={shuffleCards} className="button">
					New Game
				</button>
				<div className="grid grid-cols-4 gap-2 mt-4 card-grid">
					{cards.map((card) => (
						<SingleCard
							key={card.id}
							card={card}
							handleChoice={handleChoice}
							flipped={
								card === choiceOne || card === choiceTwo || card.matched === true
							}
							disabled={disabled}
						/>
					))}
				</div>
				<h2>Turns: {turns} !</h2>
			</div>
		</React.Fragment>
	);
};

export default CardGame;
