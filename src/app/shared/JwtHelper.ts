export class JwtHelper {

  private static urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  private static decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {

      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  public static getUserId(token: string = '') {
    token = token.replace('Bearer ', '');
    const value = this.decodeToken(token);
    return value['sub'];
  }

  /**
   * Check weather token expired or not.
   * return true if it is expired else returns false
   * @param token
   */
  public static isTokenExpired(token: string) {
    token = token.replace('Bearer ', '');
    token = this.decodeToken(token);
    const tokenExp = token['exp'];
    const currentTime = new Date().getTime() / 1000;
    // return not expired if no expiry exist in token
    if (!tokenExp) {
      return false;
    }

    // compare expiry time with current time
    if (currentTime > tokenExp) {
      return true;
    }

    return false;
  }
}
