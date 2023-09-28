import {Clubs, Diamonds, Hearts, Spades} from "./Suite";
import Player from "./Player";

export abstract class Card {
    readonly rank: number;
    player: Player;

    constructor(rank: number) {
        if (rank < 2 || rank > 14) {
            throw new Error('Invalid rank')
        }

        this.rank = rank;
    }

    assign(player: Player) {
        this.player = player;
    }

    equals(card: Card): boolean {
        return card.constructor == this.constructor && this.rank == card.rank;
    }
}

export class Club extends Card {

}

export class Diamond extends Card {

}

export class Heart extends Card {

}

export class Spade extends Card {

}

export class Deck {
    public readonly cards: Card[] = [];

    constructor() {
        this.cards = [
            ...new Spades().getCards(),
            ...new Clubs().getCards(),
            ...new Diamonds().getCards(),
            ...new Hearts().getCards(),
        ];
    }

    pop(): Card {
        return this.cards.pop()!;
    }
}