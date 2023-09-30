import { Table } from '~/card-game/models/table/table';
import { HeartsGameTrick } from '~/hearts-game/models/trick/hearts-game-trick';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import { HeartsGameHeart } from '~/hearts-game/models/card/hearts-game-heart';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import { HeartsGameSpade } from '~/hearts-game/models/card/hearts-game-spade';
import { CardRank } from '~/card-game/contracts/enums/card-rank.enum';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';

export class HeartsGameTable
  extends Table<
    HeartsGameTable,
    IHeartsGameTrick,
    IHeartsGameCard,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  >
  implements IHeartsGameTable
{
  public static For(players: IHeartsGamePlayers): IHeartsGameTable {
    return new this(players);
  }

  private get isFirst(): boolean {
    return this.tricks.length === 1;
  }

  protected checkCanPlace(
    player: IHeartsGamePlayer,
    card: IHeartsGameCard,
  ): void {
    if (this.isFirst) {
      if (card.equals(HeartsGameSpade.withRank(CardRank.Queen))) {
        throw new Error('You can not use Queen of Spade at first!');
      }
      if (card instanceof HeartsGameHeart && !player.canPlayWithHeart) {
        throw new Error('You can not use Heart at first!');
      }
    }
    if (
      this.currentTrick.isFirst &&
      card instanceof HeartsGameHeart &&
      !this.tricks.some((trick) => trick.containHearts) &&
      !player.canPlayWithHeart
    ) {
      throw new Error('You can not start with heart!');
    }
  }

  protected createTrick(): IHeartsGameTrick {
    return new HeartsGameTrick(this);
  }
}
