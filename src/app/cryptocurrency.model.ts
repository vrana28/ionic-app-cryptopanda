
export class Cryptocurrency{
  constructor(public id: string, public name: string,
    public price: number,
    // tslint:disable-next-line:variable-name
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public log_url: string,
    public boughtDate: Date,
    public rank: number,
    public quantity: number,
    public userId: string
  ) {}
}
