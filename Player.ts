import {Card} from "./Card";
import Trick from "./Trick";

export default class Player { // TODO chain
    private hand: Card[] = [];
    private tricks: Trick[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    takeTrick(trick: Trick): void {
        this.tricks.unshift(trick);
    }

    receive(card: Card): void {
        this.hand.unshift(card);
        card.assign(this);
    }

    has(card: Card): boolean {
        return this.hand.some((cardAtHand: Card) => cardAtHand.equals(card))
    }
}