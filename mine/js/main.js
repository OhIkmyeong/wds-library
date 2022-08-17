import { CardMaker, fake_card_data_maker } from "./cardMaker.js";

const cardData = fake_card_data_maker(10);
const cardMaker = new CardMaker(cardData);