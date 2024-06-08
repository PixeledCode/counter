import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'

export const Menu = ({
	setEditMode,
}: {
	setEditMode: (value: boolean) => void
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="inline-flex items-center justify-center rounded-md text-sm font-medium 
    whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50 active:bg-accent active:text-accent-foreground 
    h-10 w-10"
			>
				<MenuIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						setEditMode(true)
					}}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => {}}>Logs</DropdownMenuItem>
				{/* {#if canShare}
			<DropdownMenuItem on:click={handleShare}>Share</DropdownMenuItem>
		{/if} */}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
