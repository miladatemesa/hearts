import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';

export interface IHeartsGamePlayers
  extends IPlayers<
    IHeartsGamePlayers,
    IHeartsGamePlayer,
    IHeartsGameTable,
    IHeartsGameTrick,
    IHeartsGameCard
  > {
  get loser(): IHeartsGamePlayer;
}
