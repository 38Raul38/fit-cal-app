import React, { createContext, useCallback, useContext, useState } from "react";

export type Goal = "lose" | "maintain" | "gain";
export type ActivityLevel = "not_active" | "light" | "active" | "very_active";

export type Gender = "male" | "female";

export interface ProfileData {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  goal: Goal;
  activityLevel: ActivityLevel;
  gender: Gender | null;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  avatarUri: string | null;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (patch: Partial<ProfileData>) => void;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "User",
  email: "user@fitcal.app",
  age: "25",
  height: "175",
  weight: "75",
  goal: "lose",
  activityLevel: "light",
  gender: null,
  birthDay: 15,
  birthMonth: 6,
  birthYear: 2000,
  avatarUri: null,
};

const ProfileContext = createContext<ProfileContextType>({
  profile: DEFAULT_PROFILE,
  updateProfile: () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);

  const updateProfile = useCallback((patch: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
