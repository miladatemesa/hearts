export class Shuffler {
  public static instance = new this();

  private constructor() {}

  public shuffle<T>(cards: T[]): T[] {
    return [...cards].sort(() => Math.random() - 0.5);
  }
}
