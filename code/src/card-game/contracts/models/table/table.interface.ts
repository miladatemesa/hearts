import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export interface ITable<
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> {
  get playersCount(): number;

  place(player: TPlayer, card: TCard): void;
}
