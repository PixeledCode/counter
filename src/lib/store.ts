import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
	list: ListProps
	editList: (list: ListProps) => void
	profile: ProfileProps
	editProfile: (profile: ProfileProps) => void
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

type ProfileProps = {
	name: string
	counterName: string
	theme: 'red' | 'blue'
}

export const useStore = create<State>()(
	persist(
		(set) => ({
			list: [],
			editList: (newList) => set(() => ({ list: newList })),
			profile: {
				name: 'Counter',
				counterName: '',
				theme: 'red',
			},
			editProfile: (newProfile) => set(() => ({ profile: newProfile })),
		}),
		{
			name: 'count_store_px',
		}
	)
)
