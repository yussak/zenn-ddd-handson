import { ValueObject } from "Domain/models/shared/ValueObject";

type TitleValue = string;
export class Title extends ValueObject<string, 'TitleValue'> {
  static MAX_LENGTH = 1000;
  static MIN_LENGTH = 1;

  constructor(value: TitleValue) {
    super(value);
  }

  protected validate(value: TitleValue) {
    if (value.length < Title.MIN_LENGTH || value.length > Title.MAX_LENGTH) {
      throw new Error(`タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`)
    }
  }
}