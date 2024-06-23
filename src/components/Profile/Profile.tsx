import { useStore } from '@/lib/store'
import { Check } from '../icons/Check'
import { Star } from '../icons/Star'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import React from 'react'
import { toast } from 'sonner'
import { ChonkyButton } from '../Button'

const themes: {
	name: 'red' | 'blue'
	color: string
}[] = [
	{
		name: 'red',
		color: '#b20b35',
	},
	{
		name: 'blue',
		color: '#0E0BB2',
	},
]

export const Profile = () => {
	const profile = useStore((state) => state.profile)
	const editProfile = useStore((state) => state.editProfile)

	const [name, setName] = React.useState(profile.name)
	const [counterName, setCounterName] = React.useState(profile.counterName)
	const [theme, setTheme] = React.useState<'red' | 'blue'>(profile.theme)

	return (
		<div className="py-4 px-4 overflow-y-auto h-[calc(100%_-_48px)]">
			<div className="w-full gradient rounded-md flex flex-col gap-2 p-2">
				<div className="bg-theme-bg-subtle py-3 px-4 flex gap-3 items-center rounded-md">
					<Star width={24} fill="var(--theme-bg-primary)" />
					<h1 className="font-bold text-xl">My Profile</h1>
				</div>

				<div className="bg-theme-bg-subtle py-3 px-4 flex flex-col gap-3 rounded-md">
					<div>
						<Label htmlFor="my-name" className="font-bold text-sm">
							My Name
						</Label>
						<Input
							id="my-name"
							className="mt-2"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div>
						<Label htmlFor="counter-name" className="font-bold text-sm">
							Counter Name
						</Label>
						<Input
							id="counter-name"
							className="mt-2"
							value={counterName}
							onChange={(e) => setCounterName(e.target.value)}
						/>
					</div>
				</div>

				<div className="bg-theme-bg-subtle py-3 px-4 flex flex-col gap-4 rounded-md">
					<h2 className="font-bold text-sm">Select Theme</h2>
					<div className="flex items-center gap-2">
						{themes.map((item) => (
							<button
								key={item.name}
								className="w-10 h-10 rounded-full flex items-center justify-center"
								data-theme-check={theme === item.name}
								onClick={() => {
									setTheme(item.name)
								}}
								style={{
									backgroundColor: item.color,
								}}
							>
								<Check width={20} fill="white" className="hidden" />
								<span className="sr-only">{item.name} theme</span>
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="absolute w-full bottom-3 px-3">
				<ChonkyButton
					onClick={() => {
						editProfile({
							name,
							counterName,
							theme,
						})
						toast.success('Profile updated')
					}}
				>
					Save
				</ChonkyButton>
			</div>
		</div>
	)
}
