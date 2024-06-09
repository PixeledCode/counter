import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
	list: ListProps
	editList: (list: ListProps) => void
}

export type ListProps = {
	name: string
	count: number
	meta: {
		creation_date: string
		last_update: string
		activity: {
			[isoDate: string]: number
		}
	}
}[]

export const useStore = create<State>()(
	persist(
		(set) => ({
			list: [],
			editList: (newList) => set(() => ({ list: newList })),
		}),
		{
			name: 'count_store_px',
		}
	)
)
