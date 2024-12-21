import { QuantityAvailable } from "./QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "./Status/Status";
import { StockId } from "./StockId/StockId";

// エンティティクラス
// 一意な識別子によって区別される、可変、ライフサイクルがある
export class Stock {
  // create, reconstructメソッドのみでエンティティ生成可能にするためprivateにしている
  private constructor(
    private readonly _stockId: StockId, // IDは変更不可にする
    private _quantityAvailable: QuantityAvailable,
    private _status: Status
  ) { }

  // ビジネスルールによって決まった初期値でエンティティを作成する
  static create(
  ) {
    const defaultStockId = new StockId();
    const defaultQuantityAvailable = new QuantityAvailable(0);
    const defaultStatus = new Status(StatusEnum.OutOfStock);;
    return new Stock(defaultStockId, defaultQuantityAvailable, defaultStatus);
  }

  public delete() {
    if (this.status.value !== StatusEnum.OutOfStock) {
      throw new Error(' 在庫がある場合削除できません');
    }
  }

  public changeStatus(newStatus: Status) {
    this._status = newStatus;
  }

  // 在庫数を増やす
  increaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('増加量は0以上でなければなりません');
    }

    const newQuantity = this.quantityAvailable.increment(amount).value;

    if (newQuantity <= 10) {
      this.changeStatus(new Status(StatusEnum.LowStock));;
    }

    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }

  // 在庫数を減らす
  decreaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('減少量は0以上でなければなりません');
    }

    const newQuantity = this.quantityAvailable.decrement(amount).value;
    if (newQuantity < 0) {
      throw new Error('減少後の在庫数が0未満になってしまいます');
    }

    if (newQuantity <= 10) {
      this.changeStatus(new Status(StatusEnum.LowStock));
    }

    if (newQuantity === 0) {
      this.changeStatus(new Status(StatusEnum.OutOfStock));
    }

    this._quantityAvailable = new QuantityAvailable(newQuantity);
  }

  // public changeQuantityAvailable(newQuantityAvailable: QuantityAvailable) {
  //   this._quantityAvailable = newQuantityAvailable;
  // }

  // エンティティの再構築
  static reconstruct(
    stockId: StockId,
    quantityAvailable: QuantityAvailable,
    status: Status
  ) {
    return new Stock(stockId, quantityAvailable, status);
  }

  get stockId(): StockId {
    return this._stockId;
  }

  get quantityAvailable(): QuantityAvailable {
    return this._quantityAvailable;
  }

  get status(): Status {
    return this._status;
  }
}
