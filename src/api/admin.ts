import { apiClient } from './client';
import { AdminDashboard } from '../types/models';

export const adminApi = {
  dashboard: () => apiClient.get<AdminDashboard>('/admin/dashboard').then((r) => r.data),
  users: (search?: string) => apiClient.get('/admin/users', { params: { search } }).then((r) => r.data),
  withdrawals: (status = 'pending') => apiClient.get('/admin/withdrawals', { params: { status } }).then((r) => r.data),
  approveWithdrawal: (id: string, externalReference: string) =>
    apiClient.post(`/admin/withdrawals/${id}/approve`, { externalReference }).then((r) => r.data),
  rejectWithdrawal: (id: string, reason: string) =>
    apiClient.post(`/admin/withdrawals/${id}/reject`, { reason }).then((r) => r.data),
  reports: (status = 'open') => apiClient.get('/admin/reports', { params: { status } }).then((r) => r.data),
  resolveReport: (id: string, status: 'resolved' | 'dismissed') =>
    apiClient.patch(`/admin/reports/${id}`, { status }).then((r) => r.data),
};
