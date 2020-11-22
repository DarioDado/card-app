import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Card } from '../partials/Card';

const MyCards = (props) => {

	const results = storageService.getData('cardList') === null ? [] : storageService.getData('cardList');
	const [cardList, setCardList] = useState(results);

	const cards = cardList.map((card) =>
		<Link key={card.id} to={`/cards/${card.id}/edit`}>
			<Card name={card.name} cardNumber={card.cardNumber} cardType={card.cardType} cardDate={card.cardDate}/>
		</Link>
	);

    return (
		<div className="page-wrapper">
			<div className="card-list-wrapper">
				{cards}
				<Card createMode={true}/>
			</div>
		</div>
    )
};

export { MyCards };