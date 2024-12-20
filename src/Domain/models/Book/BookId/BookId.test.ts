import { BookId } from "./BookId";

describe('BookId', () => {
  // 正常系
  test('有効なフォーマットの場合正しい変換結果を期待', () => {
    expect(new BookId('9784167158057').value).toBe('9784167158057');
    expect(new BookId('4167158051').value).toBe('4167158051');
  });

  test('equals', () => {
    const bookId1 = new BookId('9784167158057');
    const bookId2 = new BookId('9784167158057');
    const bookId3 = new BookId('9781234567890');

    expect(bookId1.equals(bookId2)).toBeTruthy();
    expect(bookId1.equals(bookId3)).toBeFalsy();
  });

  test('toISBN() 13桁', () => {
    const bookId = new BookId('9784167158057');
    expect(bookId.toISBN()).toBe('ISBN978-4-16-715805-7');
  });

  test('toISBN() 10桁', () => {
    const bookId = new BookId('4167158051');
    expect(bookId.toISBN()).toBe('ISBN4-16-715805-1');
  });
});