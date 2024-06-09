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
				<section className="flex flex-col gap-6 py-4 px-4 mx-[-16px] list-container bg-background">
					{list.map(({ name, count, meta }) => (
						<Count
							key={meta.creation_date}
							name={name}
							count={count}
							list={list}
							editList={editList}
						/>
					))}
				</section>
			)}

			<div className="m-3">
				<AddCount />
			</div>
		</>
	)
}
