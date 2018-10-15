export interface DialogOptions {
  height?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface AlertData extends DialogOptions {
  title?: string;
  content: string;
  ok?: string;
}

export interface ConfirmData extends DialogOptions {
  title?: string;
  content: string;
  yes?: string;
  no?: string;
}

export interface PreviewImage extends DialogOptions {
  title?: string;
  content: string;
  no?: string;
}

