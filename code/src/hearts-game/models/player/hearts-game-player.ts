import { Player } from '~/card-game/models/player/player';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import { HeartsGameHeart } from '~/hearts-game/models/card/hearts-game-heart';

export class HeartsGamePlayer
  extends Player<
    IHeartsGamePlayer,
    IHeartsGamePlayers,
    IHeartsGameTable,
    IHeartsGameTrick,
    IHeartsGameCard
  >
  implements IHeartsGamePlayer
{
  public static Named(name: string): IHeartsGamePlayer {
    return new this(name);
  }

  public get score(): number {
    return this.tricks.reduce(
      (totalScore, trick) => totalScore + trick.totalScore,
      0,
    );
  }

  public get canPlayWithHeart(): boolean {
    return !this.hand.some((card) => !(card instanceof HeartsGameHeart));
  }
}
