import { Download, Upload } from 'lucide-react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '../ui/drawer'
import { toast } from 'sonner'
import { useStore } from '@/lib/store'
import { uploadData } from '@/lib/utils'

export const Sync = ({
	syncOpen,
	setSyncOpen,
}: {
	syncOpen: boolean
	setSyncOpen: (value: boolean) => void
}) => {
	const editList = useStore((state) => state.editList)

	function downloadData() {
		const data = localStorage.getItem('count_store_px')

		if (data) {
			const blob = new Blob([data], { type: 'text/json' })
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'count_store_px.json'
			a.click()
			URL.revokeObjectURL(url)
			toast.success('Data downloaded successfully')
			setSyncOpen(false)
		} else {
			toast.error('No data to download')
			setSyncOpen(false)
		}
	}

	return (
		<Drawer
			open={syncOpen}
			onOpenChange={(e) => {
				if (e === false) {
					setSyncOpen(false)
				}
			}}
		>
			<DrawerContent className="min-h-[40dvh]">
				<DrawerHeader className="flex items-center justify-between gap-2 px-6">
					<DrawerTitle>Sync</DrawerTitle>
					<DrawerClose>Cancel</DrawerClose>
				</DrawerHeader>

				<div className="flex flex-col gap-2 px-4">
					<button
						onClick={downloadData}
						className="flex items-center justify-between gap-2 border border-solid border-slate-400 rounded-lg p-2 px-4"
					>
						<span className="flex items-center gap-4">
							<Download size={18} />
							Download
						</span>
					</button>
					<button
						onClick={() => uploadData(editList, setSyncOpen)}
						className="flex items-center justify-between gap-2 border border-solid border-slate-400 rounded-lg p-2 px-4"
					>
						<span className="flex items-center gap-4">
							<Upload size={18} />
							Upload
						</span>
					</button>
				</div>
			</DrawerContent>
		</Drawer>
	)
}