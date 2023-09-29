import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export interface IPlayers<
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
> extends Iterable<TPlayer> {
  readonly length: number;

  get firstPlayer(): TPlayer;

  addPlayer(
    player: TPlayer,
  ): IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>;
}
