
export class Offer{
  constructor(public id: string,
              public type: TypeOfOffer,
              public coinName: string,
              public quantity: number,
              public userId: string
  ) {}
}

export enum TypeOfOffer{
  buy,
  sell
}