import { toast } from 'sonner';

export const toastSuccess = (message) => {
  toast.success(message, {
    style: {
      backgroundColor: '#1ab394',
      color: '#fff',
    },
  });
};

export const toastError = (message) => {
  toast.error(message, {
    style: {
      backgroundColor: '#ed5565',
      color: '#fff',
    },
  });
};