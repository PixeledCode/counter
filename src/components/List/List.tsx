import { CandyOff } from 'lucide-react'
import { Count } from './Count'
import { AddCount } from '../add-count'
import { ListProps } from '@/lib/store'

export const List = ({
	list,
	editList,
}: {
	list: ListProps
	editList: (list: ListProps) => void
}) => {
	return (
		<>
			{list.length === 0 ? (
				<section className="flex flex-col justify-center gap-6 mt-4">
					<CandyOff className=" mx-auto" size={64} />
					<h2 className="text-xl font-semibold tracking-tight text-center">
						No items found
					</h2>
					<p className="text-center">Add a new item to get started</p>
				</section>
			) : (
				<section className="flex flex-col gap-2 py-4 list-container px-4 overflow-y-auto h-[calc(100%_-_48px)]">
					{list.map(({ name, count }) => (
						<Count
							key={name}
							name={name}
							count={count}
							list={list}
							editList={editList}
						/>
					))}
				</section>
			)}

			<div className="absolute w-full bottom-3 px-3">
				<AddCount />
			</div>
		</>
	)
}
