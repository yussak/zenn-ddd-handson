import { QuantityAvailable } from "./QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "./Status/Status";
import { Stock } from "./Stock";
import { StockId } from "./StockId/StockId";

jest.mock('nanoid', () => ({
  nanoid: () => 'testIdWithExactLength',
}));

describe('Stock', () => {
  const stockId = new StockId('abc');
  const quantityAvailable = new QuantityAvailable(100);
  const status = new Status(StatusEnum.InStock);

  describe('create', () => {
    it('デフォルトで在庫を作成する', () => {
      const stock = Stock.create();

      expect(
        stock.stockId.equals(new StockId('testIdWithExactLength'))
      ).toBeTruthy();

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();

      expect(
        stock.status.equals(new Status(StatusEnum.OutOfStock))
      ).toBeTruthy();
    })
  })

  describe('delete', () => {
    it('在庫有りの場合はエラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.delete()).toThrow('在庫がある場合削除できません');
    })

    it('在庫無しの場合はエラーを投げない', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, new Status(StatusEnum.OutOfStock));

      expect(() => stock.delete()).not.toThrow();
    })
  })

  describe('increaseQuantity', () => {
    it('在庫数を増やす', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.increaseQuantity(5)

      expect(stock.quantityAvailable.equals(new QuantityAvailable(105))).toBeTruthy();
    })

    it('増加数が負の数の場合エラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.increaseQuantity(-1)).toThrow('増加量は0以上でなければなりません');
    })
  })

  describe('decreaseQuantity', () => {
    it('在庫数を減らす', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(5)

      expect(stock.quantityAvailable.equals(new QuantityAvailable(95))).toBeTruthy();
    })

    it('減少数が負の数の場合エラーを投げる', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.decreaseQuantity(-1)).toThrow('減少量は0以上でなければなりません');
    })

    it('減少後の在庫数が０未満の場合ステータスを在庫切れにする', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(100);
      expect(stock.quantityAvailable.equals(new QuantityAvailable(0))).toBeTruthy();
      expect(stock.status.equals(new Status(StatusEnum.OutOfStock))).toBeTruthy();
    })

    it('在庫数が10以下の場合ステータスを残り僅かにする', () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(90);
      expect(stock.quantityAvailable.equals(new QuantityAvailable(10))).toBeTruthy();
      expect(stock.status.equals(new Status(StatusEnum.LowStock))).toBeTruthy();
    })
  })
});