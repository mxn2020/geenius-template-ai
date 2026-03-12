import { Button, Avatar, AvatarFallback } from '@geenius-ui/react';
import { Menu } from 'lucide-react';

interface TopBarProps {
    title: string;
    onMenuClick: () => void;
}

export function TopBar({ title, onMenuClick }: TopBarProps) {
    return (
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
                    <Menu size={20} />
                </Button>
                <h1 className="text-lg font-semibold text-surface-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <Avatar size="sm">
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
