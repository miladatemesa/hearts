import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import { HeartsGameClub } from '~/hearts-game/models/card/hearts-game-club';
import { HeartsGameDiamond } from '~/hearts-game/models/card/hearts-game-diamond';
import { HeartsGameHeart } from '~/hearts-game/models/card/hearts-game-heart';
import { HeartsGameSpade } from '~/hearts-game/models/card/hearts-game-spade';

export const HeartsGameCards: IHeartsGameCard[] = [
  ...new Array(13)
    .fill(undefined)
    .map((_, i) => HeartsGameClub.withRank(i + 2)),
  ...new Array(13)
    .fill(undefined)
    .map((_, i) => HeartsGameDiamond.withRank(i + 2)),
  ...new Array(13)
    .fill(undefined)
    .map((_, i) => HeartsGameHeart.withRank(i + 2)),
  ...new Array(13)
    .fill(undefined)
    .map((_, i) => HeartsGameSpade.withRank(i + 2)),
];
