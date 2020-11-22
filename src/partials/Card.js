import { Link } from 'react-router-dom';

const Card = (props) => {

	let cardTypeImageSrc = `/images/${props.cardType}.png`;

    return props.createMode ? (
		<Link to="/cards/add">
        <div className="card-wrapper create-card-wrapper">
			<span className="plus-icon">+</span>
		</div>
		</Link>
    ) : (
		<div className="card-wrapper">
			{
				props.cardType !== '' ? (<img className="card-name-img" alt="card name" src={cardTypeImageSrc}></img>) : ''
			}
			<img className="card-chip-img" alt="card chip" src="/images/chip.png"></img>
			<p className="card-number">
				<span onClick={props.onFocus ? props.onFocus.bind(props.editCard, 'numberChunk1') : undefined}>{props.cardNumber[1]}</span>
				<span onClick={props.onFocus ? props.onFocus.bind(props.editCard, 'numberChunk2') : undefined}>{props.cardNumber[2]}</span>
				<span onClick={props.onFocus ? props.onFocus.bind(props.editCard, 'numberChunk3') : undefined}>{props.cardNumber[3]}</span>
				<span onClick={props.onFocus ? props.onFocus.bind(props.editCard, 'numberChunk4') : undefined}>{props.cardNumber[4]}</span>
			</p>
			<div className="div-flex">
				<p className="card-holder" onClick={ props.onFocus ? props.onFocus.bind(props.editCard, 'name') : undefined}>{props.name}</p>
				<p className="card-expires" onClick={ props.onFocus ? props.onFocus.bind(props.editCard, 'cardDate') : undefined}>{props.cardDate}</p>
			</div>
		</div>
	)
};

export { Card };