import { HeartsGameCard } from '~/hearts-game/models/card/hearts-game-card';
import { CardType } from '~/card-game/contracts/enums/card-type.enum';

export class HeartsGameHeart extends HeartsGameCard {
  public get score(): number {
    return 1;
  }

  public getType(): CardType {
    return CardType.Heart;
  }
}
