class Color {
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

  public getHex(): number {
    return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;
  }

  public getHexString(): string {
    return '#' + ('000000' + this.getHex().toString(16)).slice(-6);
  }
}

export default Color;