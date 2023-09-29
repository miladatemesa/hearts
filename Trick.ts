import Player from "./Player";
import {Card, Heart} from "./Cards";

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
        if (this.isAnyCardPlayed) {
            if (card.constructor !== this.lead.constructor) {
                if (card.player.hasCardTypeOf(card.constructor)) {
                    throw new Error('Wrong Move')
                }
            }
        }

        this.playedCards.push(card);
    }

    public isFinished(): boolean {
        return this.playedCards.length === 4;
    }

    public get lead(): Card {
        return this.playedCards.at(0)
    }

    public get highestCard() {
        const lead = this.lead;
        return this.playedCards
            .filter((playedCard) => playedCard.constructor === lead.constructor)
            .sort((a: Card, b: Card) => a.rank - b.rank)
            .at(-1)
    }

    public get winner(): Player {
        return this.highestCard.player;
    }

    public get isHeartPlayed(): boolean {
        return this.playedCards.some((card) => card instanceof Heart);
    }

    public get isAnyCardPlayed(): boolean {
        return this.playedCards.length !== 0;
    }
}