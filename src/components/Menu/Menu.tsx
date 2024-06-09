import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { shareScreenshot } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import React from 'react'

export const Menu = ({
	setEditMode,
	setLogMode,
	setSyncOpen,
}: {
	setEditMode: (value: boolean) => void
	setLogMode: (value: boolean) => void
	setSyncOpen: (value: boolean) => void
}) => {
	const [canShare, setCanShare] = React.useState(false)

	React.useEffect(() => {
		if ('share' in navigator) {
			setCanShare(true)
		}
	}, [])

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
				<DropdownMenuItem
					onClick={() => {
						setLogMode(true)
					}}
				>
					Logs
				</DropdownMenuItem>
				{canShare ? (
					<DropdownMenuItem
						onClick={() => {
							shareScreenshot(
								document.querySelector('.list-container') as HTMLElement
							)
						}}
					>
						Share
					</DropdownMenuItem>
				) : null}
				<DropdownMenuItem
					onClick={() => {
						setSyncOpen(true)
					}}
				>
					Sync
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
