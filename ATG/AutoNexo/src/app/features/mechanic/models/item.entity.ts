export class Item {
  id!: number;
  name!: string;
  description!: string;
  quantity!: number;
  inventoryId!: number;

  constructor(data: Partial<Item>) {
    this.id = data.id ?? 0;
    this.name = data.name || '';
    this.description = data.description || '';
    this.quantity = data.quantity ?? 0;
    this.inventoryId = data.inventoryId ?? 0;
  }
}
