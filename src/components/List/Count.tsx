import { Button } from '../ui/button'
import { ListProps } from '@/lib/store'
import React from 'react'
import { Minus } from '../icons/Minus'
import { Plus } from '../icons/Plus'

export const Count = ({
	name,
	count: defaultCount,
	list,
	editList,
}: {
	name: string
	count: number
	list: ListProps
	editList: (list: ListProps) => void
}) => {
	const [count, setCount] = React.useState(defaultCount)

	function changeCount(type: 'add' | 'reduce') {
		if (type === 'reduce' && count === 0) return

		let updatedCount = count
		if (type === 'reduce') {
			updatedCount = count - 1
		} else {
			updatedCount = count + 1
		}

		const newArr = [...list].map((item) => {
			if (item.name === name) {
				const date = new Date().toISOString().split('T')[0]
				return {
					...item,
					count: updatedCount,
					meta: {
						...item.meta,
						last_update: date,
						activity: {
							...item.meta.activity,
							[date]:
								(item.meta.activity[date] || 0) + (type === 'reduce' ? -1 : 1),
						},
					},
				}
			}
			return item
		})
		editList(newArr)
		setCount(updatedCount)
	}

	return (
		<article className="flex flex-col gap-3 p-3 bg-theme-bg-subtle rounded-md">
			<h2 className="text-xl font-bold tracking-tight text-start">{name}</h2>
			<div className="flex justify-between items-center gap-2 px-3">
				<Button
					variant="ghost"
					size="icon"
					className="p-0"
					onClick={() => changeCount('reduce')}
				>
					<Minus width={48} />
				</Button>
				<div className="overflow-hidden text-center relative w-32 h-6">
					<div className="w-full h-full flex items-center justify-center">
						<span className="font-bold">{count}</span>
					</div>
				</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => changeCount('add')}
					className="p-0"
				>
					<Plus width={48} />
				</Button>
			</div>
		</article>
	)
}
