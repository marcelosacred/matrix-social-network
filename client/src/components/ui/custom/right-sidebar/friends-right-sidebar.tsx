import { Button } from "@/components/ui/button";

export function FriendsRightSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold px-4">Возможно, вы знакомы</h3>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" className="w-full justify-start text-lg font-medium">Пользователь 1</Button>
        <Button variant="ghost" className="w-full justify-start text-lg font-medium">Пользователь 2</Button>
        <Button variant="ghost" className="w-full justify-start text-lg font-medium">Пользователь 3</Button>
      </div>
    </div>
  );
}