class Color {
  // TODO: get / set, чтобы держать цвет в 0-1
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public getRGBAString(): string {
    return `rgba(${ this.r * 255 }, ${ this.g * 255 }, ${ this.b * 255 }, ${ this.a })`;
  }
}

export default Color;