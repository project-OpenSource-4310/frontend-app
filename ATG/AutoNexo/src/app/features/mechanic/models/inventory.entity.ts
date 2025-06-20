export class Inventory {
  id!: number;
  title!: string;
  mechanicId!: number;
  items: number[];

  constructor(data: Partial<Inventory>) {
    this.id = data.id ?? 0;
    this.title = data.title ?? '';
    this.mechanicId = data.mechanicId ?? 0;
    this.items = data.items || [];
  }
}
