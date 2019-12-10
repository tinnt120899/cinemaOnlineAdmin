export class FilmInfo {
  idPhim: string;
  tenPhim: string;
  thoiLuongChieu: string;
  srcImageSm: string;
  srcImageMd: string;
  srcImageLg: string;
  trangThai: string;

    ngayPhatHanh: string;
    daoDien: string;
    dienVien: string;
    theLoai: string;
    quocGiaSx: string;
    noiDung: string;
    linkTrailer: string;


  constructor(idPhim: string, tenPhim: string, thoiLuongChieu: string, srcImageSm: string, srcImageMd: string, srcImageLg: string, trangThai: string, ngayPhatHanh: string, daoDien: string, dienVien: string, theLoai: string, quocGiaSx: string, noiDung: string, linkTrailer: string) {
    this.idPhim = idPhim;
    this.tenPhim = tenPhim;
    this.thoiLuongChieu = thoiLuongChieu;
    this.srcImageSm = srcImageSm;
    this.srcImageMd = srcImageMd;
    this.srcImageLg = srcImageLg;
    this.trangThai = trangThai;
    this.ngayPhatHanh = ngayPhatHanh;
    this.daoDien = daoDien;
    this.dienVien = dienVien;
    this.theLoai = theLoai;
    this.quocGiaSx = quocGiaSx;
    this.noiDung = noiDung;
    this.linkTrailer = linkTrailer;
  }
}


