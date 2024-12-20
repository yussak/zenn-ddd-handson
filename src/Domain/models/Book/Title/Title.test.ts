import { Title } from "./Title";

describe('Title', () => {
  // 正常系
  it('Titleが1文字で作成できる', () => {
    expect(new Title('a').value).toBe('a');
  });

  it('Titleが1000文字で作成できる', () => {
    expect(new Title('a'.repeat(1000)).value).toBe('a'.repeat(1000));
  });

  // 異常系
  it('最小長未満の値でTitleを生成するとエラーを投げる', () => {
    expect(() => new Title('')).toThrow(`タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`);
  });

  it('最大長を超過した値でTitleを生成するとエラーを投げる', () => {
    expect(() => new Title('a'.repeat(1001))).toThrow(`タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`);
  });
});