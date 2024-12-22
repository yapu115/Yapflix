export class User {
  private username: string;
  private id: string;
  private avatar: string;

  constructor(id: string, username: string, avatar: string = '') {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
  }

  get Username() {
    return this.username;
  }

  get Id() {
    return this.id;
  }
}
