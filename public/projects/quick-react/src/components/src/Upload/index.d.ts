export interface UploadProps {
  accept?: string;
  beforeUpload?: (file: any) => boolean;
  multiple?: boolean;
  onChange?: (info: any) => void;
}

export interface UploadState {}
