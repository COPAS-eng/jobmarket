import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getEnv } from './env';
import type { RegisterInput, LoginInput, CreateJobInput, UpdateJobInput, CreateProposalInput, CreateContractInput, CreateMilestoneInput, UpdateProfileInput, JobQueryParams, ProfessionalQueryParams, UpdateContractInput, UpdateMilestoneInput, SubmitMilestoneInput, CreatePaymentIntentInput } from '@/shared';

const env = getEnv();

interface ExtendedAxiosInstance extends AxiosInstance {
  auth: typeof authApi;
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}) as ExtendedAxiosInstance;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token is sent via httpOnly cookie, no need to add Authorization header
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const response = await axios.post(
          `${env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        const accessToken = response.data.data?.accessToken;
        processQueue(null, accessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data: RegisterInput) => api.post('/auth/register', data),
  login: (data: LoginInput) => api.post('/auth/login', data),
  refresh: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const jobsApi = {
  list: (params?: JobQueryParams) => api.get('/jobs', { params }),
  get: (id: string) => api.get(`/jobs/${id}`),
  create: (data: CreateJobInput) => api.post('/jobs', data),
  update: (id: string, data: UpdateJobInput) => api.patch(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

export const proposalsApi = {
  create: (data: CreateProposalInput) => api.post('/proposals', data),
  get: (id: string) => api.get(`/proposals/${id}`),
  listMine: () => api.get('/proposals'),
  updateStatus: (id: string, status: 'ACCEPTED' | 'REJECTED') => api.patch(`/proposals/${id}/status`, { status }),
};

export const contractsApi = {
  create: (data: CreateContractInput) => api.post('/contracts', data),
  get: (id: string) => api.get(`/contracts/${id}`),
  list: () => api.get('/contracts'),
  update: (id: string, data: UpdateContractInput) => api.patch(`/contracts/${id}`, data),
  createMilestone: (contractId: string, data: CreateMilestoneInput) => api.post(`/contracts/${contractId}/milestones`, data),
  updateMilestone: (contractId: string, id: string, data: UpdateMilestoneInput) => api.patch(`/contracts/${contractId}/milestones/${id}`, data),
  submitMilestone: (contractId: string, id: string, data: SubmitMilestoneInput) => api.post(`/contracts/${contractId}/milestones/${id}/submit`, data),
  reviewMilestone: (contractId: string, id: string, action: 'approve' | 'reject', feedback?: string) => api.post(`/contracts/${contractId}/milestones/${id}/review`, { action, feedback }),
};

export const usersApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: UpdateProfileInput) => api.patch('/users/profile', data),
  listProfessionals: (params?: ProfessionalQueryParams) => api.get('/users/profissionais', { params }),
  getProfessional: (id: string) => api.get(`/users/profissionais/${id}`),
};

export const stripeApi = {
  authorizeConnect: () => api.get('/stripe/connect/authorize'),
  connectStatus: () => api.get('/stripe/connect/status'),
  disconnectConnect: () => api.post('/stripe/connect/disconnect'),
  createPaymentIntent: (data: CreatePaymentIntentInput) => api.post('/stripe/payment-intent', data),
  getSubscription: () => api.get('/stripe/subscription'),
  createCheckoutSession: (plan: string) => api.post('/stripe/subscription/checkout', { plan }),
  createPortalSession: () => api.post('/stripe/subscription/portal'),
};

Object.assign(api, { auth: authApi });