import { isEqual } from "lodash";

export class BookId {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  equals(other: BookId): boolean {
    return isEqual(this._value, other._value);
  }

  get value(): string {
    return this._value;
  }
}

// 値オブジェクト同士の比較は===じゃなくequalsを使用する。new BookId('9784167158057').value===new BookId('9784167158057').valueとすると値の値を比較となってしまう。値オブジェクトは値なので