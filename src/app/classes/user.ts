export class User {
  private username: string;
  private id: string;
  private profilePicture: string;

  constructor(id: string, username: string, profilePicture: string = '') {
    this.id = id;
    this.username = username;
    this.profilePicture = profilePicture;
  }

  get Username() {
    return this.username;
  }

  get Id() {
    return this.id;
  }
}
