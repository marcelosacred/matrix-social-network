"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface UserProfile {
  id: string;
  email: string;
  isProfileCompleted: boolean;
  profile: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    dateOfBirth: string | null;
  } | null;
}

export function ProfileContent() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const BASE_URL = 'http://localhost:3001'; // Добавим базовый URL

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get<UserProfile>('/users/profile');
                setUserProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError('Ошибка при загрузке профиля');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!userProfile || !userProfile.profile) {
        return <div>Профиль не заполнен</div>;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Профиль пользователя</h1>
            <div className="flex items-center gap-4">
                {userProfile.profile.avatar && (
                    <img 
                        src={`${BASE_URL}${userProfile.profile.avatar}`}
                        alt="Аватар" 
                        className="w-32 h-32 rounded-full object-cover"
                    />
                )}
                <div className="text-xl">
                    {userProfile.profile.firstName} {userProfile.profile.lastName}
                </div>
            </div>
            <div className="text-gray-600">
                {userProfile.email}
            </div>
        </div>
    );
} 