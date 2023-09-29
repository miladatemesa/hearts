import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { IDeck } from '~/card-game/contracts/models/deck/deck.interface';
import { Shuffler } from '~/card-game/models/shuffler/shuffler';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export class Deck<
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> implements IDeck<TCard, TTrick, TTable, TPlayers, TPlayer>
{
  public static For<
    TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
    TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
    TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
    TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
    TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
  >(cards: TCard[]): IDeck<TCard, TTrick, TTable, TPlayers, TPlayer> {
    return new this(Shuffler.instance.shuffle(cards));
  }

  public get hasCard(): boolean {
    return this.cards.length > 0;
  }

  private constructor(private readonly cards: TCard[]) {}

  public pop(): TCard {
    return this.cards.pop()!;
  }
}
