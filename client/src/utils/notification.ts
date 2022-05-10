import { toast } from 'react-toastify';
import { ToastType } from 'interfaces/ToastType.enum';

export const showToast = (type: string, message: string) => {
  switch (type) {
    case ToastType.SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    case ToastType.ERROR:
      toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    default:
      return false;
  }
};
