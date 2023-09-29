import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { Prototype } from '~/types/prototype/prototype.type';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';

export interface IPlayer<
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
> {
  readonly name: string;

  get nextPlayer(): TPlayer;

  takeTrick(trick: TTrick): void;

  receive(card: TCard): void;

  has(card: TCard): boolean;

  hasCardTypeOf<T extends TCard>(cardType: Prototype<T>): boolean;

  setNextPlayer(player: TPlayer): void;
}
