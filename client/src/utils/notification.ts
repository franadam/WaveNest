import { toast } from 'react-toastify';
import { ToastType } from 'interfaces/ToastType.enum';

export const showToast = (type: string, message: string) => {
  switch (type) {
    case ToastType.AUTH_SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    case ToastType.CREATE_SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    case ToastType.READ_SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    case ToastType.UPDATE_SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    case ToastType.DELETE_SUCCESS:
      toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    case ToastType.ERROR:
      toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
      break;
    default:
      return false;
  }
};
