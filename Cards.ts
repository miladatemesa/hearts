import Player from "./Player";

export abstract class Card {
    readonly rank: number;
    player: Player;

    public constructor(rank: number) {
        if (rank < 2 || rank > 14) {
            throw new Error('Invalid rank')
        }

        this.rank = rank;
    }

    public assign(player: Player) {
        this.player = player;
    }

    public equals(card: Card): boolean {
        return card.constructor == this.constructor && this.rank == card.rank;
    }
}

export class Club extends Card {

}

class Diamond extends Card {

}

export class Heart extends Card {

}

export class Spade extends Card {
    static queen(): Spade {
        return new Spade(12);
    }
}

interface SuiteFactory<T> {
    create(): T[];
}

abstract class GenericSuiteFactory<T> implements SuiteFactory<T> {
    protected abstract instantiate(rank: number): T;

    public create(): T[] {
        const cards: T[] = [];
        for (let rank = 2; rank <= 14; rank++) {
            cards.unshift(this.instantiate(rank))
        }
        return cards;
    }
}

class HeartsSuiteFactory extends GenericSuiteFactory<Heart> {
    protected instantiate(rank: number): Heart {
        return new Heart(rank);
    }
}

class SpadesSuiteFactory extends GenericSuiteFactory<Spade> {
    protected instantiate(rank: number): Spade {
        return new Spade(rank);
    }
}

class DiamondsSuiteFactory extends GenericSuiteFactory<Diamond> {
    protected instantiate(rank: number): Diamond {
        return new Diamond(rank);
    }
}

class ClubsSuiteFactory extends GenericSuiteFactory<Club> {
    protected instantiate(rank: number): Club {
        return new Club(rank);
    }
}

export class Deck {
    public readonly cards: Card[] = [];

    constructor() {
        this.cards = [
            ...new SpadesSuiteFactory().create(),
            ...new ClubsSuiteFactory().create(),
            ...new DiamondsSuiteFactory().create(),
            ...new HeartsSuiteFactory().create(),
        ];
    }

    public pop(): Card {
        return this.cards.pop()!;
    }
}