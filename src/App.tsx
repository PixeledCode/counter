import React from 'react'
import { Button } from './components/ui/button'
import { Menu } from './components/Menu'
import { List } from './components/List/List'
import { EditList } from './components/List/EditList'
import { useStore } from './lib/store'

function App() {
	const list = useStore((state) => state.list)
	const editList = useStore((state) => state.editList)
	const [editMode, setEditMode] = React.useState(false)

	return (
		<>
			<div className="container max-w-[480px]">
				<div className="p-2 grid grid-rows-[auto_1fr_auto] gap-2 h-[100svh]">
					<h1 className="sr-only">Counter App</h1>
					<div className="flex justify-end">
						{editMode ? (
							<Button variant="ghost" onClick={() => setEditMode(false)}>
								Cancel
							</Button>
						) : list.length > 0 ? (
							<Menu setEditMode={setEditMode} />
						) : null}
					</div>
					{editMode ? (
						<EditList
							setEditMode={setEditMode}
							list={list}
							editList={editList}
						/>
					) : (
						<List list={list} editList={editList} />
					)}
				</div>
			</div>
		</>
	)
}

export default App
