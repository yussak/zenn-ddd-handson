import { isEqual } from "lodash";

export abstract class ValueObject<T, U> {
  // @ts-expect-error
  // 構造的には同じでも異なる型を区別するのに使用する
  private _type: U;
  protected readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = value;
  }

  // 継承側で必ず実装が必要
  protected abstract validate(value: T): void;

  get value(): T {
    return this._value;
  }

  equals(other: ValueObject<T, U>): boolean {
    return isEqual(this._value, other._value);
  }
}