import { ListProps } from '@/lib/store'
import { CandyOff } from 'lucide-react'
import React from 'react'
import { Trash } from '../icons/Trash'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

	function onDragEnd(result: any) {
		console.log(result)

		if (!result.destination) return
		const items = Array.from(list)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)
		setList(items)
	}

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
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="editList">
						{(provided) => (
							<ul
								className="flex flex-col gap-2 py-4 list-container px-4 overflow-y-auto h-[calc(100%_-_48px)]"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{list.map(({ name, count }, index) => (
									<Draggable draggableId={name} index={index} key={name}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.dragHandleProps}
												{...provided.draggableProps}
											>
												<Count
													name={name}
													count={count}
													list={list}
													setList={setList}
													index={index}
												/>
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			)}

			<div className="absolute w-full bottom-3 px-3">
				<Button
					onClick={() => {
						editList(list)
						setEditMode(false)
					}}
					className="w-full mx-auto rounded-lg font-extrabold bg-theme-bg-primary active:bg-theme-bg-primary hover:bg-theme-bg-primary active:scale-[98%] h-12"
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
	index: number
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
		<article className="flex flex-col gap-3 p-3 bg-theme-bg-subtle rounded-md">
			<h2 className="text-xl font-semibold tracking-tight">{name}</h2>
			<div className="flex justify-between items-center gap-2">
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
					size="sm"
					onClick={() => deleteItem(name)}
					className="bg-warning-secondary-bg text-warning-dark hover:bg-warning-secondary-bg hover:text-warning-dark border-none text-sm font-bold active:scale-95"
				>
					<span className="flex items-center gap-2">
						<Trash width={20} />
						Delete
					</span>
				</Button>
			</div>
		</article>
	)
}
