class Bitmap {
  blob: Blob;
  image: HTMLImageElement;
  width: number;
  height: number;
  imageData: ImageData;

  constructor(image: HTMLImageElement) {
    this.image = image;
    this.width = this.image.naturalWidth;
    this.height = this.image.naturalHeight;
    this.imageData = this.getImageData();
  }

  // public render(): void {
  //
  // }

  getImageData(): ImageData {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    canvas.width = this.width;
    canvas.height = this.height;

    console.log(this);

    context.drawImage(this.image, 0, 0);

    let imageData = context.getImageData(0, 0, this.width, this.height);

    // canvas.remove();

    return imageData;
  }
}

export default Bitmap;