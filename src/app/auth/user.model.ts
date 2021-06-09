export class User{
  constructor(public id: string, public name: string, public email: string, public location:string,
              public telephone: number, public points:number=0, private _token: string,
              private tokenExpirationDate: Date) {

  }

  get token(){
    if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()){
      return null;
    }
    return this._token;
  }
}
