import { Price } from "./Price";

describe('Price', () => {
  // 正常系
  it('正しい値と通貨コードで有効なPriceを作成する', () => {
    const validAmount = 500;
    const price = new Price({ amount: validAmount, currency: 'JPY' });
    expect(price.amount).toBe(validAmount);
    expect(price.currency).toBe('JPY');
  });

  // 異常系
  it('無効な通貨コードの場合エラーを投げる', () => {
    const invalidCurrency = 'USD';
    expect(() => {
      // @ts-expect-error
      new Price({ amount: 500, currency: invalidCurrency });
    }).toThrow('現在は日本円のみを扱います。');
  });

  it('MIN未満の値でPriceを生成するとエラーを投げる', () => {
    const invalidAmount = 0;
    // const price = new Price({ amount: invalidAmount, currency: 'JPY' });
    expect(() => {
      new Price({ amount: invalidAmount, currency: 'JPY' });
    }).toThrow(`価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`);
  });

  it('MAX超えの値でPriceを生成するとエラーを投げる', () => {
    const invalidAmount = 10000001;
    // const price = new Price({ amount: invalidAmount, currency: 'JPY' });
    expect(() => {
      new Price({ amount: invalidAmount, currency: 'JPY' });
    }).toThrow(`価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`);
  });
});