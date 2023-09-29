import Player from "./Player";
import Dealer from "./Dealer";
import {Card, Club, Deck, Heart, Spade} from "./Cards";
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

    private get isHeartBroken(): boolean {
        return this.tricks.some((trick) => trick.isHeartPlayed)
    }

    private get isFirstTrick(): boolean {
        return this.tricks.length === 1;
    }

    public addPlayer(player: Player): void {
        if (this.players.length === this.requiredPlayers) {
            throw new Error('table is full');
        }
        if (this.players.length >= 1) {
            this.players.at(-1).nextPlayer = player;
        }
        this.players.unshift(player);
    }

    public start(): void {
        this.dealer.deal(this.players, new Deck)
        this.startNewTrick();
    }

    private startNewTrick(): void {
        if (this.currentTrick === undefined) {
            this.currentPlayer = this.players.find((player) => player.has(new Club(2)))
        } else {
            this.currentPlayer = this.currentTrick.winner;
        }
        this.currentTrick = new Trick(this.currentPlayer);
        this.tricks.push(this.currentTrick);
    }

    public place(card: Card): void {
        // first trick
        if (this.isFirstTrick) {
            // start with 2 clubs
            if (!this.currentTrick.isAnyCardPlayed) {
                if (!card.equals(new Club(2))) {
                    throw new Error('should start with clubs')
                }
            }

            // heart is forbidden in first trick
            if (card instanceof Heart) {
                throw new Error("you can't play hearts in the first trick")
            }
            // heart is forbidden in first trick
            if (card.equals(Spade.queen())) {
                throw new Error("you can't play queen of spade in the first trick")
            }
        } else {
            if (this.currentPlayer !== card.player) {
                throw new Error("it not you're turn")
            }
            if (!this.currentTrick.isAnyCardPlayed) {
                // heart can't lead as long as it's not broken
                if (card instanceof Heart && !this.isHeartBroken) {
                    throw new Error("heart is not broken yet")
                }
            }
        }
        this.currentTrick.addCard(card);
        if (this.currentTrick.isFinished()) {
            this.currentTrick.highestCard.player.takeTrick(this.currentTrick);
            this.startNewTrick();
        } else {
            this.currentPlayer = this.currentPlayer.nextPlayer;
        }
    }
}