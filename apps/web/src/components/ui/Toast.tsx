import toast, { Toaster, ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading' | 'promise' | 'custom';

interface ToastConfig {
  success?: Partial<ToastOptions>;
  error?: Partial<ToastOptions>;
  loading?: Partial<ToastOptions>;
}

const defaultConfig: ToastConfig = {
  success: {
    duration: 4000,
    iconTheme: { primary: '#10b981', secondary: 'white' },
  },
  error: {
    duration: 5000,
    iconTheme: { primary: '#ef4444', secondary: 'white' },
  },
  loading: {
    duration: Infinity,
  },
};

export function useToast() {
  const showToast = (message: string, type: ToastType = 'success', options?: ToastOptions) => {
    const config = defaultConfig[type as keyof ToastConfig] || {};
    return toast[type](message, { ...config, ...options });
  };

  return {
    success: (message: string, options?: ToastOptions) => showToast(message, 'success', options),
    error: (message: string, options?: ToastOptions) => showToast(message, 'error', options),
    loading: (message: string, options?: ToastOptions) => showToast(message, 'loading', options),
    promise: <T,>(
      promise: Promise<T>,
      messages: { loading: string; success: string | ((data: T) => string); error: string | ((err: Error) => string) },
      options?: ToastOptions
    ) => toast.promise(promise, messages, { ...defaultConfig.success, ...defaultConfig.error, ...options }),
    dismiss: (id?: string) => toast.dismiss(id),
    remove: () => toast.remove(),
  };
}

export { Toaster };