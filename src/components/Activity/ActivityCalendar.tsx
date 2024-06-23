import { ChevronLeft } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { Button } from '../ui/button'
import { ListProps } from '@/lib/store'

export const ActivityCalendar = ({
	activeCounter,
	setActiveCounter,
}: {
	activeCounter: ListProps[0] | null
	setActiveCounter: (value: ListProps[0] | null) => void
}) => {
	const selectedDates = Object.keys(activeCounter?.meta.activity || {})
		.map((item: string) => {
			if (!Number.isNaN(Number(item))) {
				return
			}
			if (Number(activeCounter?.meta.activity[item]) !== 0)
				return new Date(item)
			return
		})
		.filter(Boolean)

	return (
		<div className="px-4 mt-4 w-full">
			<Button
				variant="ghost"
				size="sm"
				className="gap-2 pr-4"
				onClick={() => setActiveCounter(null)}
			>
				<ChevronLeft size={18} /> Go back
			</Button>
			{activeCounter ? (
				<div className="my-2">
					<h2 className="text-xl font-semibold text-center">
						{activeCounter.name}{' '}
						<span className="text-sm text-slate-600">
							({activeCounter.count})
						</span>
					</h2>
				</div>
			) : null}

			{selectedDates ? (
				<Calendar
					selected={selectedDates as Date[]}
					className="border rounded-md w-[300px] mx-auto"
				/>
			) : null}
		</div>
	)
}
