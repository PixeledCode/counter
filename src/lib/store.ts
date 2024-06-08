import { create } from 'zustand'

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

export const useStore = create<State>()((set) => ({
	list: [],
	editList: (newList) => set(() => ({ list: newList })),
}))
