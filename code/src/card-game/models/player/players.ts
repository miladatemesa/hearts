import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export abstract class Players<
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
> implements IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>
{
  private root: TPlayer;
  private count: number;

  public abstract get firstPlayer(): TPlayer;

  public constructor(public readonly length: number) {
    this.count = 0;
  }

  public addPlayer(player: TPlayer): this {
    if (this.count === this.length) {
      throw new Error('table is full');
    }
    this.count++;
    if (!this.root) {
      this.root = player;
    } else {
      this.root.setNextPlayer(player);
    }
    if (this.count === this.length) {
      player.setNextPlayer(this.root);
    }
    return this;
  }

  public *[Symbol.iterator](): Iterator<TPlayer> {
    let player = this.root;
    do {
      yield player;
      player = player.nextPlayer;
    } while (player !== this.root);
  }
}
