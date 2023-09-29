import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';

export interface IHeartsGameCard
  extends ICard<
    IHeartsGameCard,
    IHeartsGameTrick,
    IHeartsGameTable,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  > {
  get score(): number;
}
