
export class Offer{
  constructor(public id: string,
              public type: TypeOfOffer,
              public coinName: string,
              public quantity: number,
              public userId: string,
              public location: string,
              public userName: string,
              public contact: number
  ) {}
}

export enum TypeOfOffer{
  buy,
  sell
}
