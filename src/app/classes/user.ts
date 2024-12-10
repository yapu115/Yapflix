export class User {
  private username: string;
  private profilePicture: string;

  constructor(username: string, profilePicture: string) {
    this.username = username;
    this.profilePicture = profilePicture;
  }

  get Username() {
    return this.username;
  }
}
