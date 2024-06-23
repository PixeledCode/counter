import React from 'react'
import { ActivityCalendar } from './ActivityCalendar'
import { ListProps } from '@/lib/store'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '../ui/drawer'
import { ActivityList } from './ActivityList'

export const Activity = ({
	logMode,
	setLogMode,
}: {
	logMode: boolean
	setLogMode: (value: boolean) => void
}) => {
	const [activeCounter, setActiveCounter] = React.useState<ListProps[0] | null>(
		null
	)

	return (
		<Drawer
			open={logMode}
			onOpenChange={(e) => {
				if (e === false) {
					setLogMode(false)
					setActiveCounter(null)
				}
			}}
		>
			<DrawerContent className="h-[90dvh]">
				<DrawerHeader className="flex items-center justify-between gap-2 px-6">
					<DrawerTitle className="font-semibold">Activity</DrawerTitle>
					<DrawerClose className="bg-theme-bg-seconday text-theme-text-on-secondary py-1 px-2 rounded-[8px] active:scale-95">
						Cancel
					</DrawerClose>
				</DrawerHeader>

				{activeCounter === null ? (
					<ActivityList setActiveCounter={setActiveCounter} />
				) : (
					<ActivityCalendar
						activeCounter={activeCounter}
						setActiveCounter={setActiveCounter}
					/>
				)}
			</DrawerContent>
		</Drawer>
	)
}
