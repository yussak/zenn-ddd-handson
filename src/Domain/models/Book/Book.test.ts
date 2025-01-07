import { Book } from "./Book";
import { BookId } from "./BookId/BookId";
import { Price } from "./Price/Price";
import { QuantityAvailable } from "./Stock/QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "./Stock/Status/Status";
import { Stock } from "./Stock/Stock";
import { StockId } from "./Stock/StockId/StockId";
import { Title } from "./Title/Title";

jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength',
}));

describe('Book', () => {
  const stockId = new StockId('abc');
  const quantityAvailable = new QuantityAvailable(100);
  const status = new Status(StatusEnum.InStock);
  const stock = Stock.reconstruct(stockId, quantityAvailable, status);

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
  });

  describe('delete', () => {
    it('在庫有りの場合はエラーを投げる', () => {
      const book = Book.reconstruct(bookId, title, price, stock);
      expect(() => book.delete()).toThrow('在庫がある場合削除できません');
    });
    it('在庫なしの場合はエラーを投げない', () => {
      const notOnSaleStatus = new Status(StatusEnum.OutOfStock);
      const notQuantityAvailable = new QuantityAvailable(0);
      const stock = Stock.reconstruct(
        stockId,
        notQuantityAvailable,
        notOnSaleStatus,
      )
      const book = Book.reconstruct(bookId, title, price, stock);
      expect(() => book.delete()).not.toThrow();
    });
  });

  describe('isSaleable', () => {
    it('在庫あり、在庫数が整数の場合はtrueを返す', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      const book = Book.reconstruct(bookId, title, price, stock);
      expect(book.isSaleable()).toBeTruthy();
    });

    it('在庫なし、在庫数が0の場合はfalseを返す', () => {
      const notQuantityAvailable = new QuantityAvailable(0);
      const notOnSaleStatus = new Status(StatusEnum.OutOfStock);
      const stock = Stock.reconstruct(
        stockId,
        notQuantityAvailable,
        notOnSaleStatus,
      );
      const book = Book.reconstruct(bookId, title, price, stock);
      expect(book.isSaleable()).toBeFalsy();
    });
  });
})