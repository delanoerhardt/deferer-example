interface DiscardArguments<T> {
  keepDefering?: boolean;
  defaultObject?: T;
}

class Deferer {
  defer = true;
  delayedPromises: Array<[() => void, (def: unknown) => void]> = [];

  /**
   * Executa e limpa a lista de operações pendentes
   *
   * @param keepDefering Quando passado, impede o atraso das próximas operações feitas.
   */
  executeDefered(keepDefering?: boolean) {
    if (keepDefering !== undefined) {
      this.defer = keepDefering;
    }

    this.delayedPromises.forEach(([execute, _]) => execute());
    this.delayedPromises.splice(0);
  }

  /**
   * Descarta e limpa a lista de operações pendentes. O resultado das promisses
   * é
   *
   * @param keepDefering Quando passado, impede o atraso das próximas operações feitas.
   * @param defaultObject Objeto retornado no lugar do retorno da operação real.
   */
  discardDefered<T extends object | undefined>({
    keepDefering,
    defaultObject,
  }: DiscardArguments<T>) {
    if (keepDefering !== undefined) {
      this.defer = keepDefering;
    }

    this.delayedPromises.forEach(([_, discard]) => discard(defaultObject));
    this.delayedPromises.splice(0);
  }

  get<T extends object>(target: T, propName: PropertyKey, receiver?: unknown) {
    const prop = Reflect.get(target, propName, receiver);

    if (typeof prop !== "function") {
      return prop;
    }

    if (!this.defer) {
      return prop;
    }

    const decorated = (...args: unknown[]) => {
      return new Promise((execute, discard) => {
        this.delayedPromises.push([execute as () => void, discard]);
      }).then(
        () => (prop as Function)(args),
        (defaultObject) => defaultObject
      );
    };

    return decorated;
  }
}

export default Deferer;
