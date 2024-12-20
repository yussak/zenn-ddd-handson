import { isEqual } from "lodash";

export class BookId {
  private readonly _value: string;

  constructor(value: string) {
    this.validate(value);
    this._value = value;
  }

  static MAX_LENGTH = 13;
  static MIN_LENGTH = 10;

  private validate(isbn: string): void {
    if (isbn.length < BookId.MIN_LENGTH || isbn.length > BookId.MAX_LENGTH) {
      throw new Error("ISBNの文字数が不正です");
    }

    if (!this.isValidIsbn10(isbn) && !this.isValidIsbn13(isbn)) {
      throw new Error("不正なISBNの形式です")
    }
  }

  private isValidIsbn10(isbn10: string): boolean {
    // 実際にはちゃんとロジックを書く
    return isbn10.length === 10;
  }

  private isValidIsbn13(isbn13: string): boolean {
    // 実際にはちゃんとロジックを書く
    return isbn13.length === 13;
  }

  equals(other: BookId): boolean {
    return isEqual(this._value, other._value);
  }

  get value(): string {
    return this._value;
  }
}

// 値オブジェクト同士の比較は===じゃなくequalsを使用する。new BookId('9784167158057').value===new BookId('9784167158057').valueとすると値の値を比較となってしまう。値オブジェクトは値なので