import { Metadata } from "next";
import { ProfileContent } from "@/components/profile/profile-content";

export const metadata: Metadata = {
    title: "Profile",
};

export default function Profile() {
    return <ProfileContent />;
}