import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export interface IDeck<
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> {
  get hasCard(): boolean;

  pop(): TCard;
}
