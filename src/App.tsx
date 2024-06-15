import React from 'react'
import { Button } from './components/ui/button'
import { Menu } from './components/Menu'
import { List } from './components/List/List'
import { EditList } from './components/List/EditList'
import { ListProps, useStore } from './lib/store'
import { Activity } from './components/Activity/Activity'
import { Sync } from './components/Sync/Sync'
import { uploadData } from './lib/utils'
import { Profile } from './components/Profile/Profile'

function App() {
	const list = useStore((state) => state.list)
	const editList = useStore((state) => state.editList)

	const [editMode, setEditMode] = React.useState(false)
	const [logMode, setLogMode] = React.useState(false)
	const [syncOpen, setSyncOpen] = React.useState(false)
	const [profileOpen, setProfileOpen] = React.useState(false)

	return (
		<main className="max-w-[520px] mx-auto">
			<div className="grid grid-rows-[auto_1fr_auto] h-[100svh] relative">
				<Header
					list={list}
					profileOpen={profileOpen}
					editList={editList}
					editMode={editMode}
					setEditMode={setEditMode}
					setLogMode={setLogMode}
					setSyncOpen={setSyncOpen}
					setProfileOpen={setProfileOpen}
				/>

				{profileOpen ? (
					<Profile />
				) : editMode ? (
					<EditList setEditMode={setEditMode} list={list} editList={editList} />
				) : (
					<List list={list} editList={editList} />
				)}
			</div>

			<Activity logMode={logMode} setLogMode={setLogMode} />
			<Sync syncOpen={syncOpen} setSyncOpen={setSyncOpen} />
		</main>
	)
}

const Header = ({
	editMode,
	setEditMode,
	setLogMode,
	setSyncOpen,
	list,
	profileOpen,
	editList,
	setProfileOpen,
}: {
	editMode: boolean
	list: ListProps
	profileOpen: boolean
	setEditMode: (value: boolean) => void
	setLogMode: (value: boolean) => void
	setSyncOpen: (value: boolean) => void
	editList: (list: ListProps) => void
	setProfileOpen: (value: boolean) => void
}) => {
	const profile = useStore((state) => state.profile)

	const profileName = `${profile.name}${
		profile.counterName ? "'s " + profile.counterName : ''
	}`

	React.useEffect(() => {
		const body = document.querySelector('body')

		if (profile.theme === 'red') {
			body?.classList.add('red')
			body?.classList.remove('blue')
		} else {
			body?.classList.add('blue')
			body?.classList.remove('red')
		}
	}, [profile])
	return (
		<div className="flex justify-between items-center gap-6 px-6 py-3 bg-theme-bg-primary text-theme-text-on-primary">
			<button
				onClick={() => {
					setProfileOpen(false)
				}}
			>
				<h1 className="font-extrabold truncate text-ellipsis max-w-56">
					{profileName}
				</h1>
			</button>
			{editMode || profileOpen ? (
				<Button
					variant="outline"
					size="sm"
					className="text-theme-text-on-primary bg-theme-bg-primary hover:bg-theme-bg-primary hover:text-theme-text-on-primary active:bg-theme-bg-primary h-10 active:scale-95"
					onClick={() => {
						setEditMode(false)
						setProfileOpen(false)
					}}
				>
					Cancel
				</Button>
			) : list.length > 0 ? (
				<Menu
					setEditMode={setEditMode}
					setLogMode={setLogMode}
					setSyncOpen={setSyncOpen}
					setProfileOpen={setProfileOpen}
					list={list}
				/>
			) : (
				<Button
					variant="ghost"
					onClick={() => uploadData(editList, setSyncOpen)}
				>
					Upload
				</Button>
			)}
		</div>
	)
}

export default App
