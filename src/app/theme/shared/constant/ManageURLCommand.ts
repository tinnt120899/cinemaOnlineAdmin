import { environment } from 'src/environments/environment';
export class CommandURL {
  // Other category
    public static MANAGE_URL = environment.API_CINEMA_ONLINE + '/admin' ;

    public static TIN_TUC = CommandURL.MANAGE_URL + '/news';
    public static HE_THONG_RAP = CommandURL.MANAGE_URL + '/hethongrap';
    public static DANH_SACH_RAP = CommandURL.MANAGE_URL + '/danhsachrap';
    public static DS_RAP_THEO_TINH_THANH = CommandURL.HE_THONG_RAP + '/tinhthanh';

    public static DANH_SACH_PHIM = CommandURL.MANAGE_URL + '/danhsachphim';
    public static NGAY_CHIEU = CommandURL.DANH_SACH_PHIM + '/ngaychieu';
    public static SUAT_CHIEU = CommandURL.DANH_SACH_PHIM + '/suatchieu';
    public static SEAT_MAP = CommandURL.DANH_SACH_PHIM + '/seatmap';

    public static AUTH = CommandURL.MANAGE_URL + '/account';
    public static SIGN_IN = CommandURL.AUTH + '/signin';
    public static SIGN_UP = CommandURL.AUTH;


}
