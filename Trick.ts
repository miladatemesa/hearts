import {Card} from "./Card";
import Player from "./Player";

export default class Trick {
    public playedCards: Card[] = [];
    private leader: Player;

    public constructor(leader: Player) {
        this.leader = leader;
    }


    public addCard(card: Card): void {
        if (this.playedCards.length > 4) {
            throw new Error();
        }
        this.playedCards.push(card);
    }

    public isFinished(): boolean {
        return this.playedCards.length === 4;
    }

    public get highestCard() {
        const lead = this.playedCards.at(0)
        return this.playedCards
            .filter((playedCard) => playedCard.constructor === lead.constructor)
            .sort((a: Card, b: Card) => a.rank - b.rank)
            .at(-1)
    }

    public get winner(): Player {
        return this.highestCard.player;
    }
}