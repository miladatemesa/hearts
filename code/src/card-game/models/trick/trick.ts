import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';

export abstract class Trick<
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> implements ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>
{
  private readonly _playedCards: TCard[];
  private highestCard: TCard;
  private _winner: TPlayer;

  public get isFirst(): boolean {
    return this._playedCards.length === 0;
  }

  public get isFinished(): boolean {
    return this._playedCards.length === this.table.playersCount;
  }

  public get winner(): TPlayer {
    return this._winner;
  }

  protected get playedCards(): readonly TCard[] {
    return this._playedCards;
  }

  public constructor(private readonly table: TTable) {
    this._playedCards = [];
  }

  public addCard(player: TPlayer, card: TCard): void {
    if (this.isFinished) {
      throw new Error();
    }
    if (
      this.highestCard &&
      !card.isTypeOf(this.highestCard) &&
      player.hasCardTypeOf(card.constructor)
    ) {
      throw new Error('Wrong Move');
    }
    if (!this.highestCard || card.isGreaterThan(this.highestCard, this.table)) {
      this.highestCard = card;
      this._winner = player;
    }
    this._playedCards.push(card);
    this.checkIsCompleted();
  }

  private checkIsCompleted(): void {
    if (this.isFinished) {
      this._winner.takeTrick(this as unknown as TTrick);
    }
  }
}
