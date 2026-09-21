import { BrandIconName } from '@/components/BrandIcon';

export const FARM_ISSUES_STORAGE_KEY = '@kopi-garut/farm-issues';
export const EXTENSION_NOTIFICATIONS_STORAGE_KEY = '@kopi-garut/extension-notifications';
export const NOTIFICATION_READ_STORAGE_KEY = '@kopi-garut/notification-read';

export type FarmIssueStatus = 'Menunggu arahan' | 'Sudah ditinjau';
export type FollowUpStatus = 'Menunggu arahan' | 'Dijadwalkan' | 'Selesai';

export type FarmIssue = {
  id: string;
  farmerId?: string;
  farmerName?: string;
  assignedTo?: string;
  photoUri: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  createdAt: string;
  status: FarmIssueStatus;
  followUpStatus?: FollowUpStatus;
  recommendation?: string;
  followUpDate?: string;
  followUpNote?: string;
  reviewedAt?: string;
};

export type ExtensionNotification = {
  id: string;
  audience: 'petani' | 'penyuluh';
  farmerId?: string;
  issueId?: string;
  title: string;
  detail: string;
  type: 'Laporan masalah' | 'Arahan penyuluh' | 'Tindak lanjut' | 'Pesan petani';
  time: string;
  icon: BrandIconName;
  route: '/farm-issues' | '/extension-issues' | '/notifications';
  action: string;
  priority: 'urgent' | 'normal' | 'positive';
};

export function supportId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function notificationTime() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getFollowUpStatus(issue: FarmIssue): FollowUpStatus {
  return issue.followUpStatus ?? (issue.status === 'Sudah ditinjau' ? 'Dijadwalkan' : 'Menunggu arahan');
}

export function getIssueFarmerId(issue: FarmIssue) {
  return issue.farmerId ?? 'asep-rahmat';
}