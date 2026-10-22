import { apiClient } from './client';
import { GiftCatalogItem, Wallet, WalletTransaction } from '../types/models';

export const walletApi = {
  me: () => apiClient.get<Wallet>('/wallet/me').then((r) => r.data),
  transactions: (limit = 30) =>
    apiClient.get<WalletTransaction[]>('/wallet/transactions', { params: { limit } }).then((r) => r.data),
  recharge: (amount: number, provider: string) =>
    apiClient.post('/wallet/recharge', { amount, provider }).then((r) => r.data),
};

export const giftsApi = {
  catalog: () => apiClient.get<GiftCatalogItem[]>('/gifts/catalog').then((r) => r.data),
  send: (payload: { giftCode: string; context: 'feed' | 'vibes' | 'live'; postId?: string; vibeId?: string }) =>
    apiClient.post('/gifts/send', payload).then((r) => r.data),
};
