
export class Cryptocurrency{
  constructor(
    public name: string,
    public id: string,
    public price: number,
    // tslint:disable-next-line:variable-name
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public log_url: string,
    public priceDate: Date,
    public rank: number,
  ) {}
}
