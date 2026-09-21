import AsyncStorage from '@react-native-async-storage/async-storage';
import { BrandIconName } from '@/components/BrandIcon';

export const FARM_ISSUES_STORAGE_KEY = '@kopi-garut/farm-issues';
export const SUPPORT_NOTIFICATIONS_STORAGE_KEY = '@kopi-garut/field-support-notifications';

export type FarmIssueStatus = 'Menunggu arahan' | 'Sudah ditinjau';
export type FollowUpStatus = 'Menunggu arahan' | 'Dijadwalkan' | 'Selesai';

export type FarmIssue = {
  id: string;
  photoUri?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  createdAt: string;
  status: FarmIssueStatus;
  followUpStatus?: FollowUpStatus;
  followUpDate?: string;
  followUpNote?: string;
  farmerId?: string;
  farmerName?: string;
  farmerGroup?: string;
  assignedTo?: string;
  updatedAt?: string;
};

export type SupportAudience = 'petani' | 'penyuluh';

export type SupportNotification = {
  id: string;
  audience: SupportAudience;
  title: string;
  detail: string;
  type: string;
  time: string;
  icon: BrandIconName;
  priority: 'urgent' | 'normal' | 'positive';
  route: string;
  issueId?: string;
};

export function getFollowUpStatus(issue: FarmIssue): FollowUpStatus {
  return issue.followUpStatus ?? (issue.status === 'Sudah ditinjau' ? 'Dijadwalkan' : 'Menunggu arahan');
}

export async function loadFarmIssues() {
  try {
    const value = await AsyncStorage.getItem(FARM_ISSUES_STORAGE_KEY);
    if (!value) return [] as FarmIssue[];
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [] as FarmIssue[];
    return parsed.filter((item): item is FarmIssue => Boolean(item && typeof item === 'object' && typeof (item as FarmIssue).id === 'string')).map((item) => ({
      ...item,
      status: item.status === 'Sudah ditinjau' ? 'Sudah ditinjau' : 'Menunggu arahan',
    }));
  } catch {
    return [] as FarmIssue[];
  }
}

export async function saveFarmIssues(issues: FarmIssue[]) {
  await AsyncStorage.setItem(FARM_ISSUES_STORAGE_KEY, JSON.stringify(issues));
}

export async function loadSupportNotifications(audience: SupportAudience) {
  try {
    const value = await AsyncStorage.getItem(SUPPORT_NOTIFICATIONS_STORAGE_KEY);
    if (!value) return [] as SupportNotification[];
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [] as SupportNotification[];
    return parsed.filter((item): item is SupportNotification => Boolean(item && typeof item === 'object' && (item as SupportNotification).audience === audience));
  } catch {
    return [] as SupportNotification[];
  }
}

export async function appendSupportNotification(notification: SupportNotification) {
  try {
    const value = await AsyncStorage.getItem(SUPPORT_NOTIFICATIONS_STORAGE_KEY);
    const existing = value ? JSON.parse(value) as SupportNotification[] : [];
    const next = [notification, ...(Array.isArray(existing) ? existing : [])].filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index).slice(0, 40);
    await AsyncStorage.setItem(SUPPORT_NOTIFICATIONS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // The originating action still remains visible locally when notification persistence fails.
  }
}

export function makeSupportNotification(input: Omit<SupportNotification, 'time'>): SupportNotification {
  return {
    ...input,
    time: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
}