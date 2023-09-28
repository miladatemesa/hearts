import Player from "./Player";
import Dealer from "./Dealer";
import {Card, Club, Deck} from "./Card";
import Trick from "./Trick";

export default class HeartsTable {
    private players: Player[] = [];
    private requiredPlayers: number = 4;
    private dealer: Dealer;
    private currentTrick: Trick;
    private tricks: Trick[];
    private currentPlayer: Player;

    public constructor(dealer: Dealer) {
        this.dealer = dealer;
    }

    public addPlayer(player: Player): void {
        if (this.players.length === this.requiredPlayers) {
            throw new Error('table is full');
        }
        this.players.unshift(player);
    }

    public start(): void {
        this.dealer.deal(this.players, new Deck)
        this.startNewTrick();
    }

    private startNewTrick() {
        if (this.currentTrick === undefined) {
            this.currentPlayer = this.players.find((player) => player.has(new Club(2)))
        } else {
            this.currentPlayer = this.currentTrick.winner;
        }
        this.currentTrick = new Trick(this.currentPlayer);
        this.tricks.push(this.currentTrick);
    }

    public place(card: Card): void {
        if (this.tricks.length === 1) {
            if (this.currentTrick.playedCards.length === 0) {
                if (!card.equals(new Club(2))) {
                    throw new Error('should start with clubs')
                }
            }
        }
        this.currentTrick.addCard(card);
        if (this.currentTrick.isFinished()) {
            const card = this.currentTrick.highestCard;
            card.player.takeTrick(this.currentTrick);
            this.startNewTrick();
        }
    }
}