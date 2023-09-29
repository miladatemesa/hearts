import type { ITable } from '~/card-game/contracts/models/table/table.interface';
import type { ITrick } from '~/card-game/contracts/models/trick/trick.interface';
import type { ICard } from '~/card-game/contracts/models/card/card.interface';
import type { IPlayers } from '~/card-game/contracts/models/player/players.interface';
import type { IPlayer } from '~/card-game/contracts/models/player/player.interface';

export abstract class Table<
  TTable extends ITable<TTable, TTrick, TCard, TPlayers, TPlayer>,
  TTrick extends ITrick<TTrick, TTable, TCard, TPlayers, TPlayer>,
  TCard extends ICard<TCard, TTrick, TTable, TPlayers, TPlayer>,
  TPlayers extends IPlayers<TPlayers, TPlayer, TTable, TTrick, TCard>,
  TPlayer extends IPlayer<TPlayer, TPlayers, TTable, TTrick, TCard>,
> implements ITable<TTable, TTrick, TCard, TPlayers, TPlayer>
{
  private readonly _tricks: TTrick[];
  private _currentTrick?: TTrick;
  private currentPlayer?: TPlayer;

  public get playersCount(): number {
    return this.players.length;
  }

  protected get tricks(): readonly TTrick[] {
    return this._tricks;
  }

  protected get currentTrick(): TTrick {
    return this._currentTrick;
  }

  protected constructor(private readonly players: TPlayers) {
    this._tricks = [];
    this.startNewTrick();
  }

  public place(player: TPlayer, card: TCard): void {
    if (this.currentPlayer !== player) {
      throw new Error('نوبت شما نیست');
    }

    this.checkCanPlace(player, card);

    this._currentTrick.addCard(player, card);
    if (this._currentTrick.isFinished) {
      this.startNewTrick();
    }
  }

  protected abstract checkCanPlace(player: TPlayer, card: TCard): void;

  protected abstract createTrick(): TTrick;

  private startNewTrick(): void {
    if (this._currentTrick) {
      this.currentPlayer = this._currentTrick.winner;
    } else {
      this.currentPlayer = this.players.firstPlayer;
    }
    this._currentTrick = this.createTrick();
    this._tricks.push(this._currentTrick);
  }
}
