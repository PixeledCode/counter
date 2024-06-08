import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from './ui/button'
import React from 'react'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const AddCount = () => {
	const [name, setName] = React.useState('')
	const [count, setCount] = React.useState(0)
	const [drawerOpen, setDrawerOpen] = React.useState(false)

	const list = useStore((state) => state.list)
	const editList = useStore((state) => state.editList)
	return (
		<Drawer
			open={drawerOpen}
			onOpenChange={(e) => {
				setDrawerOpen(e)
				setName('')
				setCount(0)
			}}
		>
			<DrawerTrigger asChild>
				<Button className="w-full mx-auto">Add new count</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader className="flex items-center justify-between gap-2">
					<DrawerTitle>Add new count</DrawerTitle>
					<DrawerClose>Cancel</DrawerClose>
				</DrawerHeader>

				<div className="px-4 flex flex-col gap-4">
					<div className="flex flex-col w-full gap-1.5">
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							id="name"
							value={name}
							autoComplete="off"
							onChange={(e) => {
								setName(e.target.value)
							}}
						/>
					</div>
					<div className="flex flex-col w-full gap-1.5">
						<Label htmlFor="count">Start Count</Label>
						<Input
							type="number"
							id="count"
							value={count}
							placeholder="0"
							onChange={(e) => {
								setCount(Number(e.target.value))
							}}
						/>
					</div>
				</div>

				<DrawerFooter>
					<Button
						onClick={() => {
							if (name && Number(count) >= 0) {
								const alreadyExists = list.find((item) => item.name === name)
								if (alreadyExists) {
									toast.error('Name already exists', {
										action: {
											label: 'Dismiss',
											onClick: () => {},
										},
									})
									return
								}
								const date = new Date().toISOString().split('T')[0]
								editList([
									...list,
									{
										name,
										count: Number(count),
										meta: {
											creation_date: date,
											last_update: date,
											activity: {
												[date]: 0,
											},
										},
									},
								])
								setDrawerOpen(false)
								setCount(0)
								setName('')
							} else {
								toast.error('Name is required and minimum count is 0', {
									action: {
										label: 'Dismiss',
										onClick: () => {},
									},
								})
							}
						}}
					>
						Save
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}