import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';

export abstract class Player<
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
> implements IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>
{
  private readonly _hand: TCard[];
  private readonly _tricks: TTrick[];
  private _nextPlayer?: TPlayer;

  public get nextPlayer(): TPlayer {
    return this._nextPlayer;
  }

  protected get hand(): readonly TCard[] {
    return this._hand;
  }

  protected get tricks(): readonly TTrick[] {
    return this._tricks;
  }

  protected constructor(public readonly name: string) {
    this._hand = [];
    this._tricks = [];
  }

  public takeTrick(trick: TTrick): void {
    this._tricks.push(trick);
  }

  public receive(card: TCard): void {
    this._hand.push(card);
  }

  public has(card: TCard): boolean {
    return this._hand.some((cardAtHand: TCard) => cardAtHand.equals(card));
  }

  public hasCardTypeOf(card: TCard): boolean {
    return this._hand.some((cardAtHand) => cardAtHand.isTypeOf(card));
  }

  public setNextPlayer(player: TPlayer): void {
    if (this._nextPlayer) {
      this._nextPlayer.setNextPlayer(player);
    } else {
      this._nextPlayer = player;
    }
  }
}
