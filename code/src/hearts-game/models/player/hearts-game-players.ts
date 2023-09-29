import { Players } from '~/card-game/models/player/players';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import { HeartsGameSpade } from '~/hearts-game/models/card/hearts-game-spade';
import { CardRank } from '~/card-game/contracts/enums/card-rank.enum';

export class HeartsGamePlayers
  extends Players<
    HeartsGamePlayers,
    IHeartsGamePlayer,
    IHeartsGameTable,
    IHeartsGameTrick,
    IHeartsGameCard
  >
  implements IHeartsGamePlayers
{
  public get loser(): IHeartsGamePlayer {
    let max = -1;
    let loser: IHeartsGamePlayer = null;
    for (const player of this) {
      if (player.score > max) {
        max = player.score;
        loser = player;
      }
    }
    return loser;
  }

  public get firstPlayer(): IHeartsGamePlayer {
    for (const player of this) {
      if (player.has(HeartsGameSpade.withRank(CardRank.Two))) {
        return player;
      }
    }
    throw new Error('');
  }
}
