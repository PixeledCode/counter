import { ListProps } from '@/lib/store'
import { CandyOff, Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import React from 'react'

export const EditList = ({
	setEditMode,
	list: defaultList,
	editList,
}: {
	setEditMode: (value: boolean) => void
	list: ListProps
	editList: (list: ListProps) => void
}) => {
	const [list, setList] = React.useState(defaultList)
	return (
		<>
			{list.length === 0 ? (
				<section className="flex flex-col justify-center gap-6 mt-4">
					<CandyOff className=" mx-auto" size={64} />
					<h2 className="text-xl font-semibold tracking-tight text-center">
						All items removed
					</h2>
				</section>
			) : (
				<section className="flex flex-col gap-6 mt-4 px-6">
					{list.map(({ name, count }) => (
						<Count
							key={name}
							name={name}
							count={count}
							list={list}
							setList={setList}
						/>
					))}
				</section>
			)}

			<div className="m-3">
				<Button
					onClick={() => {
						editList(list)
						setEditMode(false)
					}}
					className="w-full mx-auto rounded-lg font-extrabold bg-theme-bg-primary"
				>
					Save
				</Button>
			</div>
		</>
	)
}

const Count = ({
	name,
	count: defaultCount,
	list,
	setList,
}: {
	name: string
	count: number
	list: ListProps
	setList: (list: ListProps) => void
}) => {
	const [count, setCount] = React.useState(defaultCount)

	function updateCount(
		name: string,
		type: 'add' | 'reduce' | 'change',
		newCount?: number
	) {
		if (type === 'reduce' && count === 0) return

		let updatedCount = count
		if (type === 'reduce') {
			updatedCount = count - 1
		} else if (type === 'add') {
			updatedCount = count + 1
		} else {
			if (newCount && newCount >= 0) {
				updatedCount = newCount
			}
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
		setCount(updatedCount)
		setList(newArr)
	}

	function deleteItem(name: string) {
		const newArr = list.filter((item) => item.name !== name)
		setList(newArr)
	}
	return (
		<article className="flex flex-col gap-1">
			<div className="flex items-center justify-between gap-2 flex-wrap">
				<h2 className="text-xl font-semibold tracking-tight">{name}</h2>
				<button onClick={() => deleteItem(name)}>
					<p className="text-sm text-red-500">Delete</p>
				</button>
			</div>
			<div className="flex justify-between items-center gap-2">
				<Button
					variant="outline"
					size="icon"
					onClick={() => updateCount(name, 'reduce')}
				>
					<Minus />
				</Button>

				<Input
					type="number"
					className="text-center w-max font-semibold max-w-20"
					value={count}
					min="0"
					placeholder="0"
					onChange={(e) => {
						updateCount(name, 'change', Number(e.target.value))
					}}
				/>

				<Button
					variant="outline"
					size="icon"
					onClick={() => updateCount(name, 'add')}
				>
					<Plus />
				</Button>
			</div>
		</article>
	)
}
