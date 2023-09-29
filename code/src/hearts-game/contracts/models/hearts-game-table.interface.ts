import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';

export interface IHeartsGameTable
  extends ITable<
    IHeartsGameTable,
    IHeartsGameTrick,
    IHeartsGameCard,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  > {}
