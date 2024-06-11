import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { reactToSVG, shareImage, svgToPngURI } from '@/lib/utils'
import { MenuIcon } from '@/components/icons/MenuIcon'
import React from 'react'
import { Cross } from '../icons/Cross'
import { Edit } from '../icons/Edit'
import { Calendar } from '../icons/Calendar'
import { Share } from '../icons/Share'
import { SyncIcon } from '../icons/SyncIcon'
import { Template } from '../Share/Template'
import { ListProps, useStore } from '@/lib/store'
import { Profile } from '../icons/Profile'

export const Menu = ({
	setEditMode,
	setLogMode,
	setSyncOpen,
	setProfileOpen,
	list,
}: {
	setEditMode: (value: boolean) => void
	setLogMode: (value: boolean) => void
	setSyncOpen: (value: boolean) => void
	setProfileOpen: (value: boolean) => void
	list: ListProps
}) => {
	const [canShare, setCanShare] = React.useState(false)
	const [isOpened, setIsOpened] = React.useState(false)
	const profile = useStore((state) => state.profile)

	React.useEffect(() => {
		if ('share' in navigator) {
			setCanShare(true)
		}
	}, [])

	return (
		<DropdownMenu
			open={isOpened}
			onOpenChange={(e) => {
				setIsOpened(e)
			}}
		>
			<DropdownMenuTrigger
				className="inline-flex items-center justify-center rounded-md text-sm font-medium 
    whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none
    disabled:pointer-events-none disabled:opacity-50 h-10 w-10"
			>
				{isOpened ? (
					<Cross fill="white" width={24} />
				) : (
					<MenuIcon fill="white" width={24} />
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="font-bold">
				<DropdownMenuItem
					onClick={() => {
						setEditMode(true)
					}}
				>
					<span className="flex items-center gap-3">
						<Edit width={16} />
						Edit
					</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setLogMode(true)
					}}
				>
					<span className="flex items-center gap-3">
						<Calendar width={16} />
						Logs
					</span>
				</DropdownMenuItem>
				{canShare ? (
					<DropdownMenuItem
						onClick={async () => {
							const pngURI = await reactToSVG(
								<Template list={list} profile={profile} />,
								{
									width: 320,
								}
							).then((res) => svgToPngURI(res))
							shareImage(pngURI)
						}}
					>
						<span className="flex items-center gap-3">
							<Share width={16} />
							Share
						</span>
					</DropdownMenuItem>
				) : null}
				<DropdownMenuItem
					onClick={() => {
						setSyncOpen(true)
					}}
				>
					<span className="flex items-center gap-3">
						<SyncIcon width={16} fill="var(--theme-icon)" />
						Sync
					</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setProfileOpen(true)
					}}
				>
					<span className="flex items-center gap-3">
						<Profile width={16} fill="var(--theme-icon)" />
						Profile
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
