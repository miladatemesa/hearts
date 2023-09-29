import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';

export interface IHeartsGameTrick
  extends ITrick<
    IHeartsGameTrick,
    IHeartsGameTable,
    IHeartsGameCard,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  > {
  get totalScore(): number;
  get containHearts(): boolean;
}
