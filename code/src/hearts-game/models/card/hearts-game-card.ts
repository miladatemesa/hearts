import { Card } from '~/card-game/models/card/card';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { CardRank } from '~/card-game/contracts/enums/card-rank.enum';
import { LazyInitMap } from '~/libs/lazy-init-map/lazy-init-map';

export abstract class HeartsGameCard
  extends Card<
    HeartsGameCard,
    IHeartsGameTrick,
    IHeartsGameTable,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  >
  implements IHeartsGameCard
{
  private static readonly pool: Map<
    typeof HeartsGameCard,
    Map<CardRank, IHeartsGameCard>
  > = new LazyInitMap<typeof HeartsGameCard, Map<CardRank, IHeartsGameCard>>(
    (key) =>
      new LazyInitMap<CardRank, IHeartsGameCard>((rank) => key.create(rank)),
  );

  public static withRank(rank: CardRank): IHeartsGameCard {
    console.log(this, this.pool);
    return this.pool.get(this).get(rank);
  }

  private static create(rank: CardRank): IHeartsGameCard {
    return new (this as unknown as new (cardRank: CardRank) => IHeartsGameCard)(
      rank,
    );
  }

  public get score(): number {
    return 0;
  }
}
