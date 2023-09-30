import { CardRank } from '~/card-game/contracts/enums/card-rank.enum';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';
import type { CardType } from '~/card-game/contracts/enums/card-type.enum';

export abstract class Card<
  TCard extends Card<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> implements ICard<TCard, TTrick, TTable, TPlayers, TPlayer>
{
  protected readonly rank: CardRank;

  protected constructor(rank: CardRank) {
    if (rank < CardRank.Two || rank > CardRank.Ace) {
      throw new Error('Invalid rank');
    }
    this.rank = rank;
  }

  public isTypeOf(card: TCard): boolean {
    return card && card.constructor === this.constructor;
  }

  public equals(this: TCard, card: TCard): boolean {
    return this.isTypeOf(card) && this.rank === card.rank;
  }

  public isGreaterThan(card: TCard): boolean {
    return this.isTypeOf(card) && card.rank > this.rank;
  }

  public abstract getType(): CardType;
}
