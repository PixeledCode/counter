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
import { Download } from '../icons/Download'
import { Upload } from '../icons/Upload'

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
		const dataObj = JSON.parse(data || '{}')

		if (data) {
			const blob = new Blob([JSON.stringify(dataObj.state.list)], {
				type: 'application/json',
			})
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
					<DrawerTitle className="font-semibold">Sync</DrawerTitle>
					<DrawerClose className="bg-theme-bg-seconday text-theme-text-on-secondary py-1 px-2 rounded-md active:scale-95">
						Cancel
					</DrawerClose>
				</DrawerHeader>

				<div className="flex flex-col gap-2 px-4">
					<button
						onClick={downloadData}
						className="flex items-center justify-between gap-2 border border-solid border-theme-grey rounded-lg p-2 px-4"
					>
						<span className="flex items-center gap-4">
							<Download width={18} />
							Download
						</span>
					</button>
					<button
						onClick={() => uploadData(editList, setSyncOpen)}
						className="flex items-center justify-between gap-2 border border-solid border-theme-grey rounded-lg p-2 px-4"
					>
						<span className="flex items-center gap-4">
							<Upload width={18} />
							Upload
						</span>
					</button>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
