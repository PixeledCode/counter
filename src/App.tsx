import React from 'react'
import { Button } from './components/ui/button'
import { Menu } from './components/Menu'
import { List } from './components/List/List'
import { EditList } from './components/List/EditList'
import { useStore } from './lib/store'
import { Activity } from './components/Activity/Activity'
import { Sync } from './components/Sync/Sync'
import { uploadData } from './lib/utils'

function App() {
	const list = useStore((state) => state.list)
	const editList = useStore((state) => state.editList)

	const [editMode, setEditMode] = React.useState(false)
	const [logMode, setLogMode] = React.useState(false)
	const [syncOpen, setSyncOpen] = React.useState(false)

	return (
		<div className="max-w-[520px]">
			<div className="grid grid-rows-[auto_1fr_auto] gap-2 h-[100svh]">
				<h1 className="sr-only">Counter App</h1>
				<div className="flex justify-between items-center gap-6 font-extrabold px-6 py-3 bg-theme-bg-primary text-theme-text-on-primary">
					<span>Counter</span>
					{editMode ? (
						<Button variant="ghost" onClick={() => setEditMode(false)}>
							Cancel
						</Button>
					) : list.length > 0 ? (
						<Menu
							setEditMode={setEditMode}
							setLogMode={setLogMode}
							setSyncOpen={setSyncOpen}
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

				{editMode ? (
					<EditList setEditMode={setEditMode} list={list} editList={editList} />
				) : (
					<List list={list} editList={editList} />
				)}
			</div>

			<Activity logMode={logMode} setLogMode={setLogMode} />
			<Sync syncOpen={syncOpen} setSyncOpen={setSyncOpen} />
		</div>
	)
}

export default App
