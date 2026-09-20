declare module 'qrcode/lib/browser' {
  type QrColor = {
    dark?: string;
    light?: string;
  };

  type QrOptions = {
    type?: 'svg';
    margin?: number;
    color?: QrColor;
    width?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  };

  export function toString(text: string, options?: QrOptions): Promise<string>;
}