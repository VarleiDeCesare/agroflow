import uploadConfig from '../../config/upload.config';
import DiskUploadProvider from './implementations/disk.provider';

const uploadProvider = {
  disk: DiskUploadProvider,
};
export default uploadProvider[uploadConfig.provider];
