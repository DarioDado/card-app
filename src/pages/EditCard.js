import { Card } from '../partials/Card';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { storageService } from '../services/storageService';

const EditCard = (props) => {
	const [name, setName] = useState('');
	const [cardType, setCardType] = useState('');
	const [cardNumber, setCardNumber] = useState(
		{
			1: '', 
			2: '',
			3: '',
			4: '',
		}
	);
	const [cardNumberChunk1Ref, setCardNumberChunk1Ref] = useState(null);
	const [cardNumberChunk2Ref, setCardNumberChunk2Ref] = useState(null);
	const [cardNumberChunk3Ref, setCardNumberChunk3Ref] = useState(null);
	const [cardNumberChunk4Ref, setCardNumberChunk4Ref] = useState(null);
	const [cardDateRef, setCardDateRef] = useState(null);
	const [nameRef, setNameRef] = useState(null);
	const [cardDate, setCardDate] = useState('');
	const [numberError, setNumberError] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [isNameEmpty, setIsNameEmpty] = useState(true);
	const [isCardNumberEmpty, setIsCardNumberEmpty] = useState(true);
	const [isCardDateEmpty, setIsCardDateEmpty] = useState(true);

	let history = useHistory();

	
	useEffect(() => {
		if(props.updateMode) {
			const { id } = props.match.params;
			let cardList = storageService.getData('cardList');
			let card = cardList[id];
			setName(card.name);
			setCardType(card.cardType);
			setCardNumber(card.cardNumber);
			setCardDate(card.cardDate);
			setIsNameEmpty(false);
			setIsCardNumberEmpty(false);
			setIsCardDateEmpty(false);
		} else {
			setName('');
			setCardType('');
			setCardNumber(
				{
					1: '', 
					2: '',
					3: '',
					4: '',
				}
			);
			setCardDate('');
			setIsNameEmpty(true);
			setIsCardNumberEmpty(true);
			setIsCardDateEmpty(true);
		}
	}, [props]);

	const onNameChangeHandler = (e) => {
		setName(e.target.value);
		if(e.target.value.length > 3) {
			setIsNameEmpty(false);
		} else {
			setIsNameEmpty(true);
		}
	}

	const onCardDateChangeHandler = (e) => {
		if (e.target.validity.valid) {
			if(e.target.value.length > 5) {
				return;
			}
			let lastChar = cardDate[cardDate.length - 1];
			let newDate = e.target.value;
			if(e.target.value.length === 2 && lastChar !== '/') {
				newDate = newDate + '/';
			}
			setCardDate(newDate);
			if(e.target.value.length === 5) {
				validateCardDate(newDate);
				setIsCardDateEmpty(false);
			} else {
				setIsCardDateEmpty(true);
			}
		}
	}

	const onCardNumberChunkChangeHandler = (number, e) => {
		if(number === 1) {
			checkAndSetCardType(e.target.value);
		}
		if (e.target.validity.valid) {
			if(e.target.value.length > 4) {
				changeCardNumberInputFocus(number);
				return;
			}
			let newCardNumber = {...cardNumber};
			newCardNumber[number] = e.target.value;
			setCardNumber(newCardNumber);
			let cardNumberLength = newCardNumber[1].length + newCardNumber[2].length + newCardNumber[3].length +newCardNumber[4].length;
			if (cardNumberLength === 16) {
				setIsCardNumberEmpty(false);
			} else {
				setIsCardNumberEmpty(true);
			}
			if(e.target.value.length === 4) {
				changeCardNumberInputFocus(number);
				return;
			}
		}
	}

	const onSaveCardHandler = (e) => {
		let cardList = storageService.getData('cardList') === null ? [] : storageService.getData('cardList');
		let card = {
			name,
			cardType,
			cardNumber,
			cardDate,
		}
		if(props.updateMode) {
			const { id } = props.match.params;
			card.id = id;
			cardList[id] = card;
		} else {
			card.id = cardList.length;
			cardList.push(card);
		}
		storageService.saveData('cardList', cardList);
		
		history.push('/cards', {to: '/cards'});
	}

	const changeCardNumberInputFocus = (chunkNumber) => {
		switch (chunkNumber) {
			case 1:
				focusInputHandler('numberChunk2');
			break;
			case 2:
				focusInputHandler('numberChunk3');
			break;
			case 3:
				focusInputHandler('numberChunk4');
			break;
			case 4:
				focusInputHandler('cardDate');
			break;
			default:
				return;
		}
	}

	const focusInputHandler = (inputname) => {
		switch (inputname) {
			case 'numberChunk1':
				cardNumberChunk1Ref.focus();
			break;
			case 'numberChunk2':
				cardNumberChunk2Ref.focus();
			break;
			case 'numberChunk3':
				cardNumberChunk3Ref.focus();
			break;
			case 'numberChunk4':
				cardNumberChunk4Ref.focus();
			break;
			case 'cardDate':
				cardDateRef.focus();
			break;
			case 'name':
				nameRef.focus();
			break;
			default:
				return;
		}
	}

	const checkAndSetCardType = (value) => {
		if (value !== '') {
			if (value[0] !== '4' && value[0] !== '5' && value[0] !== '6') {
				setNumberError(true);
				setCardType('')
				return;
			}
			setNumberError(false);
			switch (value) {
				case '4':
					setCardType('visa')
					break;
				case '5':
					setCardType('mastercard')
					break;
				case '6':
					setCardType('discover')
					break;
			
				default:
					break;
			}
		}
	}

	const validateCardDate = (value) => {
		let match = value.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
		if (!match){
			setDateError(true);
			return;
		}
		let exp = new Date(normalizeYear(1*match[2]),1*match[1]-1,1).valueOf();
		let now = new Date();
		let currMonth = new Date(now.getFullYear(),now.getMonth(),1).valueOf();
		if (exp<=currMonth){
			setDateError(true);
		} else {
			setDateError(false);
		};
	}

	const normalizeYear = (year) => {
		let YEARS_AHEAD = 20;
		if (year<100){
			let nowYear = new Date().getFullYear();
			year += Math.floor(nowYear/100)*100;
			if (year > nowYear + YEARS_AHEAD){
				year -= 100;
			} else if (year <= nowYear - 100 + YEARS_AHEAD) {
				year += 100;
			}
		}
    	return year;
	}

    return (
		<div className="page-wrapper">
			<h1 className="title">{props.updateMode ? 'Edit current card' : 'Add card to account'}</h1>
			<Card name={name} cardNumber={cardNumber} cardType={cardType} cardDate={cardDate} onFocus={focusInputHandler} editCard={this}/>

			<form>
				<label>Name</label>
				<div className="row">
					<div className="col">
						<input ref={(input) => { setNameRef(input) }} type="text" value={name}  onChange={onNameChangeHandler} className="form-control"></input>
					</div>
				</div>
				<label>Card number</label>
				<div className="row">
					<div className="col card-number-partial first">
						<input ref={(input) => { setCardNumberChunk1Ref(input) }} type="text" pattern="[0-9]*" value={cardNumber[1]}  onChange={onCardNumberChunkChangeHandler.bind(this, 1)} className="form-control"></input>
					</div>
					<div className="col card-number-partial">
						<input ref={(input) => { setCardNumberChunk2Ref(input) }}  type="text" pattern="[0-9]*" value={cardNumber[2]}  onChange={onCardNumberChunkChangeHandler.bind(this, 2)} className="form-control"></input>
					</div>
					<div className="col card-number-partial">
						<input ref={(input) => { setCardNumberChunk3Ref(input) }} type="text" pattern="[0-9]*" value={cardNumber[3]}  onChange={onCardNumberChunkChangeHandler.bind(this, 3)} className="form-control"></input>
					</div>
					<div className="col card-number-partial last">
						<input ref={(input) => { setCardNumberChunk4Ref(input) }} type="text" pattern="[0-9]*" value={cardNumber[4]}  onChange={onCardNumberChunkChangeHandler.bind(this, 4)} className="form-control"></input>
					</div>
				</div>
				<p className={numberError ? 'error' : 'error hide'}>Invalid card number</p>
				<label>Expires on</label>
				<div className="row">
					<div className="col">
						<input ref={(input) => { setCardDateRef(input) }} pattern="[0-9]*\/?[0-9]*" value={cardDate}  onChange={onCardDateChangeHandler} type="text" className="form-control"></input>
					</div>
				</div>
				<p className={dateError ? 'error' : 'error hide'}>Invalid date</p>
				<div className="row">
					<div className="col">
						<button onClick={onSaveCardHandler} type="button" className="btn btn-primary" disabled={numberError || dateError || isCardNumberEmpty || isCardDateEmpty || isNameEmpty} >Save</button>
					</div>
				</div>
				
			</form>
		</div>
    )
};

export { EditCard };