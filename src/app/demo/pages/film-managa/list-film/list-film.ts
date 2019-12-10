export class ListFilm {
  idPhim: string;
  tenPhim: string;
  thoiLuongChieu: string;
  srcImageSm: string;
  srcImageMd: string;
  srcImageLg: string;
  trangThai: string;


  constructor(idPhim: string, tenPhim: string, thoiLuongChieu: string, srcImageSm: string, srcImageMd: string, srcImageLg: string, trangThai: string) {
    this.idPhim = idPhim;
    this.tenPhim = tenPhim;
    this.thoiLuongChieu = thoiLuongChieu;
    this.srcImageSm = srcImageSm;
    this.srcImageMd = srcImageMd;
    this.srcImageLg = srcImageLg;
    this.trangThai = trangThai;
  }
}


