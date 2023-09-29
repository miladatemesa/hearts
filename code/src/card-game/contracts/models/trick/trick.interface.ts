import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';

export interface ITrick<
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> {
  get isFirst(): boolean;
  get isFinished(): boolean;
  get winner(): TPlayer;

  addCard(player: TPlayer, card: TCard): void;
}
