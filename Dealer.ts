import Player from "./Player";
import Shuffler from "./Shuffler";
import {Card, Deck} from "./Card";

export default class Dealer {
    constructor(private shuffler: Shuffler) {
    }

    deal(players: Player[], deck: Deck) {
        this.shuffler.shuffle(deck.cards);
        while (deck.cards.length > 0) {
            for (let player of players){
                player.receive(deck.pop())
            }
        }
    }
}