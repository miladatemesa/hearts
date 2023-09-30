import { Trick } from '~/card-game/models/trick/trick';
import type { IHeartsGameCard } from '~/hearts-game/contracts/models/hearts-game-card.interface';
import type { IHeartsGameTrick } from '~/hearts-game/contracts/models/hearts-game-trick.interface';
import type { IHeartsGameTable } from '~/hearts-game/contracts/models/hearts-game-table.interface';
import type { IHeartsGamePlayers } from '~/hearts-game/contracts/models/hearts-game-players.interface';
import type { IHeartsGamePlayer } from '~/hearts-game/contracts/models/hearts-game-player.interface';
import { HeartsGameHeart } from '~/hearts-game/models/card/hearts-game-heart';

export class HeartsGameTrick
  extends Trick<
    HeartsGameTrick,
    IHeartsGameTable,
    IHeartsGameCard,
    IHeartsGamePlayers,
    IHeartsGamePlayer
  >
  implements IHeartsGameTrick
{
  public get totalScore(): number {
    return this.playedCards.reduce(
      (totalScore: number, card: IHeartsGameCard) => totalScore + card.score,
      0,
    );
  }

  public get containHearts(): boolean {
    return this.playedCards.some((card) => card instanceof HeartsGameHeart);
  }

  protected checkCanAddCard(
    player: IHeartsGamePlayer,
    card: IHeartsGameCard,
  ): void {
    if (
      this.highestCard &&
      !card.isTypeOf(this.highestCard) &&
      player.hasCardTypeOf(card)
    ) {
      throw new Error('Wrong Move');
    }
  }

  protected isHighestCard(card: IHeartsGameCard): boolean {
    return card.isGreaterThan(this.highestCard);
  }
}
