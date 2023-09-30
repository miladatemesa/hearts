import { HeartsGameCard } from '~/hearts-game/models/card/hearts-game-card';
import { CardType } from '~/card-game/contracts/enums/card-type.enum';
import { CardRank } from '~/card-game/contracts/enums/card-rank.enum';

export class HeartsGameSpade extends HeartsGameCard {
  public get score(): number {
    if (this.rank === CardRank.Queen) {
      return 13;
    }
    return super.score;
  }

  public getType(): CardType {
    return CardType.Spade;
  }
}
