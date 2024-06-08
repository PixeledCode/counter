import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { ListProps } from '@/lib/store'
import React from 'react'

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
		<article className="flex flex-col gap-1">
			<h2 className="text-xl font-semibold tracking-tight text-start">
				{name}
			</h2>
			<div className="flex justify-between items-center gap-2">
				<Button
					variant="outline"
					size="icon"
					onClick={() => changeCount('reduce')}
				>
					<Minus />
				</Button>
				<div className="overflow-hidden text-center relative w-32 h-6">
					<div className="w-full h-full flex items-center justify-center">
						<strong>{count}</strong>
					</div>
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={() => changeCount('add')}
				>
					<Plus />
				</Button>
			</div>
		</article>
	)
}
