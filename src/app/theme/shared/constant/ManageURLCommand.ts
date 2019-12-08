import { environment } from 'src/environments/environment';
export class CommandURL {
  // Other category
    public static MANAGE_URL = environment.API_CINEMA_ONLINE + '/admin' ;

    public static TIN_TUC = CommandURL.MANAGE_URL + '/news';
    public static HE_THONG_RAP = CommandURL.MANAGE_URL + '/heThongRap';

}
