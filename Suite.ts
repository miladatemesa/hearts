import {Club, Diamond, Heart, Spade} from "./Card";

abstract class Suite<T> {
    private cards: T[] = []

    constructor() {
        for (let rank = 2; rank <= 14; rank++) {
            this.cards.unshift(this.instantiate(rank))
        }
    }

    protected abstract instantiate(rank: number): T;

    getCards(): T[] {
        return this.cards;
    }
}

export class Spades extends Suite<Spade> {
    protected instantiate(rank: number): Spade {
        return new Spade(rank);
    }
}

export class Hearts extends Suite<Heart> {
    protected instantiate(rank: number): Heart {
        return new Heart(rank);
    }
}

export class Clubs extends Suite<Club> {
    protected instantiate(rank: number): Club {
        return new Club(rank);
    }
}

export class Diamonds extends Suite<Diamond> {
    protected instantiate(rank: number): Diamond {
        return new Diamond(rank);
    }
}