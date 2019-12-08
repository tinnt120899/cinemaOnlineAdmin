export class NewsCreate {
    maTinTuc: string;
    tieuDe: string;
    tieuDePhu: string;
    srcImage: string;
    ngayDang: string;
    noiDung: string;


  constructor(maTinTuc: string, tieuDe: string, tieuDePhu: string, srcImage: string, ngayDang: string, noiDung: string) {
    this.maTinTuc = maTinTuc;
    this.tieuDe = tieuDe;
    this.tieuDePhu = tieuDePhu;
    this.srcImage = srcImage;
    this.ngayDang = ngayDang;
    this.noiDung = noiDung;
  }
}


