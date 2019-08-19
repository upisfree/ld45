class Bitmap {
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(blob: Blob, width: number, height: number) {
    this.image = new Image();
    this.image.src = URL.createObjectURL(blob);
    this.width = width;
    this.height = height;
  }

  // public render(): void {
  //
  // }
}

export default Bitmap;