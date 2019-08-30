class Color {
  // TODO: get / set, чтобы держать цвет в 0-255
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number, g: number, b: number, a: number = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public equals(c: Color): boolean {
    return this.r === c.r &&
           this.g === c.g &&
           this.b === c.b &&
           this.a === c.a;
  }

  public getRGBAString(): string {
    return `rgba(${ this.r }, ${ this.g }, ${ this.b }, ${ this.a / 255 })`;
  }
}

export default Color;