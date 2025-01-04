export class Media {
  public title: string;
  public image: string;
  public releaseDate?: string;
  public author?: string;

  constructor(
    title: string,
    image: string,
    options?: { releaseDate?: string; author?: string }
  ) {
    this.title = title;
    this.image = image;
    this.releaseDate = options?.releaseDate;
    this.author = options?.author;
  }
}
