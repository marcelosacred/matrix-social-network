import { MessageCircle, Rss, Settings, User, Users, Boxes} from "lucide-react";

export const sidebarData = [
    {
        name: "My profile",
        icon: User,
        href: "/profile",
    },
    {
        name: "News",
        icon: Rss,
        href: "/news",
    },
    {
        name: "Messages",
        icon: MessageCircle,
        href: "/messages",
    },
    {
        name: "Friends",
        icon: Users,
        href: "/friends",
    },
    {
        name: "Groups",
        icon: Boxes,
        href: "/groups",
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/settings",
    },
]