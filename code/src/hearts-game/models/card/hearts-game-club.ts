import { Club } from '~/card-game/models/card/club';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { CardRank } from '~/card-game/contracts/enums/card-rank.enum';
import { LazyInitMap } from '~/libs/lazy-init-map/lazy-init-map';

export class HeartsGameClub
  extends Club<
    HeartsGameClub,
    IHeartsGameTrick,
    IHeartsGameTable,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  >
  implements IHeartsGameCard
{
  static readonly #pool: Map<CardRank, IHeartsGameCard> = new LazyInitMap<
    CardRank,
    IHeartsGameCard
  >((key) => new this(key));

  public static withRank(rank: CardRank): IHeartsGameCard {
    return this.#pool.get(rank);
  }

  public get score(): number {
    return 0;
  }
}
