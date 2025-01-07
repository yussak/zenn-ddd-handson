import { Book } from "./Book";
import { BookId } from "./BookId/BookId";
import { Price } from "./Price/Price";
import { Status, StatusEnum } from "./Stock/Status/Status";
import { StockId } from "./Stock/StockId/StockId";
import { Title } from "./Title/Title";

jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength',
}));

describe('Book', () => {
  const bookId = new BookId('9784167158057');
  const title = new Title('吾輩は猫である');
  const price = new Price({
    amount: 770,
    currency: 'JPY',
  });

  describe('create', () => {
    it('デフォルト値で在庫を作成する', () => {
      const book = Book.create(bookId, title, price);

      expect(book.bookId.equals(bookId)).toBeTruthy();
      expect(book.title.equals(title)).toBeTruthy();
      expect(book.price.equals(price)).toBeTruthy();
      expect(book.stockId.equals(new StockId('testIdWithExactLength'))).toBeTruthy();
      expect(book.status.equals(new Status(StatusEnum.OutOfStock))).toBeTruthy();
    });
  })
})