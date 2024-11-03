import { Button } from "@/components/ui/button";

export function NewsRightSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold px-4">Возможно, вам будет интересно</h3>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" className="w-full justify-start text-lg font-medium">Сообщество 1</Button>
        <Button variant="ghost" className="w-full justify-start text-lg font-medium">Сообщество 2</Button>
        <Button variant="ghost" className="w-full justify-start text-lg font-medium">Сообщество 3</Button>
      </div>
    </div>
  );
}