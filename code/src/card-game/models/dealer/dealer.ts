import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { IDeck } from '~/card-game/contracts/models/deck/deck.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export class Dealer {
  public static instance = new this();

  private constructor() {}

  public deal<
    TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
    TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
    TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
    TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
    TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
  >(
    players: TPlayers,
    deck: IDeck<TCard, TTrick, TTable, TPlayers, TPlayer>,
  ): void {
    while (deck.hasCard) {
      for (const player of players) {
        player.receive(deck.pop());
      }
    }
  }
}
