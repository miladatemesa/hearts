import Player from "./Player";
import Shuffler from "./Shuffler";
import {Deck} from "./Cards";

export default class Dealer {
    public constructor(private shuffler: Shuffler) {
    }

    public deal(players: Player[], deck: Deck) {
        this.shuffler.shuffle(deck.cards);
        while (deck.cards.length > 0) {
            for (let player of players){
                player.receive(deck.pop())
            }
        }
    }
}