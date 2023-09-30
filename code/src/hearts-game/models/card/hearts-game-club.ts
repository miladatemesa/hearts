import { HeartsGameCard } from '~/hearts-game/models/card/hearts-game-card';
import { CardType } from '~/card-game/contracts/enums/card-type.enum';

export class HeartsGameClub extends HeartsGameCard {
  public getType(): CardType {
    return CardType.Club;
  }
}
