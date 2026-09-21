export type AuthRole = 'pengguna' | 'petani' | 'penyuluh';

export type RoleProfile = {
  id: AuthRole;
  name: string;
  label: string;
  description: string;
  initials: string;
};

export const roleProfiles: RoleProfile[] = [
  {
    id: 'pengguna',
    name: 'Aruna Rahma',
    label: 'Pengguna',
    description: 'Jelajahi kopi, simpan favorit, dan kirim usulan dukungan.',
    initials: 'AR',
  },
  {
    id: 'petani',
    name: 'Asep Hidayat',
    label: 'Petani',
    description: 'Kelola verifikasi kebun, mutu lot, dan akses pasar.',
    initials: 'AH',
  },
  {
    id: 'penyuluh',
    name: 'Rani Permata',
    label: 'Penyuluh',
    description: 'Catat kunjungan lapangan dan tindak lanjut kebun.',
    initials: 'RP',
  },
];

export const protectedRouteRoles: Record<string, AuthRole[]> = {
  '/verification': ['petani'],
  '/standards': ['pengguna', 'petani', 'penyuluh'],
  '/quality-check': ['petani'],
  '/curation': ['petani'],
  '/group-dashboard': ['petani'],
  '/extension-dashboard': ['penyuluh'],
  '/reports': ['pengguna', 'petani', 'penyuluh'],
  '/notifications': ['pengguna', 'petani', 'penyuluh'],
  '/documents': ['pengguna', 'petani', 'penyuluh'],
};

export function canAccessRoute(route: string, role?: AuthRole | null) {
  const allowedRoles = protectedRouteRoles[route];
  return !allowedRoles || Boolean(role && allowedRoles.includes(role));
}

export function getRoleProfile(role: AuthRole) {
  return roleProfiles.find((profile) => profile.id === role) ?? roleProfiles[0];
}