import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';

export interface IHeartsGamePlayer
  extends IPlayer<
    IHeartsGamePlayer,
    IHeartsGamePlayers,
    IHeartsGameTable,
    IHeartsGameTrick,
    IHeartsGameCard
  > {
  get score(): number;
  get canPlayWithHeart(): boolean;
}
