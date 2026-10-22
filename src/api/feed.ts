import { apiClient } from './client';
import { FeedPost } from '../types/models';

export const feedApi = {
  list: (limit = 20, offset = 0) =>
    apiClient.get<FeedPost[]>('/feed', { params: { limit, offset } }).then((r) => r.data),
  create: (payload: { text?: string; hashtags?: string[] }) =>
    apiClient.post<FeedPost>('/feed', payload).then((r) => r.data),
  like: (postId: string) => apiClient.post(`/feed/${postId}/like`).then((r) => r.data),
  unlike: (postId: string) => apiClient.post(`/feed/${postId}/unlike`).then((r) => r.data),
  share: (postId: string, channel: 'afrivibe' | 'whatsapp' | 'facebook' | 'link') =>
    apiClient.post(`/feed/${postId}/share`, { channel }).then((r) => r.data),
};
