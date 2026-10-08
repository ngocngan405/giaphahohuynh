export type Gender = 'male' | 'female';
export type BranchId = 'all' | 'chi1' | 'chi2' | 'chi3';
export type RolePermission = 'admin' | 'editor' | 'viewer';

export interface Member {
  id: string;
  fullName: string;
  aliasName?: string;
  gender: Gender;
  generation: number; // 1 to 7
  branchId: BranchId;
  birthYear: number | string;
  deathYear?: number | string;
  isDeceased: boolean;
  birthDate?: string;
  deathDate?: string;
  lunarDeathDate?: string;
  lunarBirthDate?: string;
  burialPlace?: string;
  hometown?: string;
  occupation?: string;
  biography?: string;
  avatarUrl: string;
  fatherId?: string;
  motherName?: string;
  spouseName?: string;
  spouseYears?: string;
  spouseAvatar?: string;
  roleTitle?: string;
  birthOrder?: string;
  descendantsCount?: number;
  phone?: string;
  email?: string;
  isPatriarch?: boolean;
}

export interface ClanEvent {
  id: string;
  title: string;
  type: 'ky-nhat' | 'hop-ho' | 'tao-mo' | 'khac';
  ancestorId?: string;
  ancestorName?: string;
  ancestorTitle?: string;
  solarDate: string; // YYYY-MM-DD or formatted
  lunarDate: string;
  lunarYearInfo?: string;
  timeRange: string;
  location: string;
  locationDetail?: string;
  attendeesCount: number;
  attendeesAvatars: string[];
  daysLeft?: number;
  isGrandRitual?: boolean;
  masterOfCeremony?: {
    name: string;
    title: string;
    phone: string;
    avatarUrl: string;
  };
  schedule: Array<{
    step: number;
    time: string;
    title: string;
    desc: string;
  }>;
  userRsvp?: 'attending' | 'declined' | 'none';
  guestCount?: number;
  comments: Array<{
    id: string;
    author: string;
    branchTag?: string;
    time: string;
    text: string;
    isNew?: boolean;
  }>;
}

export interface ClanNews {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  timeAgo: string;
  category: string;
  reverenceCount: number;
  discussionsCount: number;
  imageUrl: string;
}

export interface JoinRequest {
  id: string;
  fullName: string;
  birthYear: number;
  declaration: string;
  timeAgo: string;
  avatarUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ClanUser {
  id: string;
  name: string;
  role: RolePermission;
  roleName: string;
  branch: string;
  generation: number;
  phone: string;
  avatarUrl: string;
}
