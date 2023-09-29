export class LazyInitMap<K, V> extends Map<K, V> {
  public constructor(private readonly initializer?: (key: K) => V) {
    super();
  }

  public get(key: K, initializer?: (key: K) => V): V {
    if (!this.has(key)) {
      if (initializer) {
        this.set(key, initializer(key));
      } else if (this.initializer) {
        this.set(key, this.initializer(key));
      } else {
        throw new Error();
      }
    }
    return super.get(key);
  }
}
