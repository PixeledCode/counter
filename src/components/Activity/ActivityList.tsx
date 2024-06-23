import { ListProps, useStore } from '@/lib/store'
import { ArrowRightCircleIcon } from 'lucide-react'

export const ActivityList = ({
	setActiveCounter,
}: {
	setActiveCounter: (value: ListProps[0]) => void
}) => {
	const list = useStore((state) => state.list)

	return (
		<section className="overflow-auto pb-6">
			{list.length === 0 ? (
				<div className="flex flex-col gap-6 mt-4 px-6">
					<h2 className="text-xl font-semibold tracking-tight text-center">
						No items found
					</h2>
					<p className="text-center">Add a new item to get started</p>
				</div>
			) : (
				<>
					<div className="flex flex-col gap-4 mt-4 px-6">
						{list.map((item, index) => (
							<button
								key={index}
								className="flex items-center justify-between gap-2 border border-solid border-theme-grey rounded-lg p-2 px-4"
								onClick={() => setActiveCounter(item)}
							>
								<div className="flex flex-col gap-1">
									<p className="font-semibold text-start">{item.name}</p>
									<p className="text-sm text-slate-600">
										<span>Last Updated: </span>
										{new Date(item.meta.last_update).toDateString()}
									</p>
								</div>
								<ArrowRightCircleIcon color="var(--theme-icon)" />
							</button>
						))}
					</div>
				</>
			)}
		</section>
	)
}
