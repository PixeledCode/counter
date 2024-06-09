import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { domToPng } from 'modern-screenshot'
import { schema } from '@/components/Sync/validator'
import { toast } from 'sonner'
import { ListProps } from './store'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const shareScreenshot = async (element: HTMLElement) => {
	domToPng(element, {
		scale: 3,
		style: {
			borderRadius: '14px',
		},
	}).then(async (dataUrl) => {
		const blob = await fetch(dataUrl).then((res) => res.blob())
		const file = new File([blob], 'counter.png', { type: blob.type })
		const files = [file]

		const shareData = {
			files,
		}
		if (navigator.canShare(shareData)) {
			navigator.share(shareData)
		}
	})
}

export function uploadData(
	editList: (list: ListProps) => void,
	setSyncOpen: (value: boolean) => void
) {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = '.json'
	input.onchange = (e) => {
		const file = (e.target as HTMLInputElement).files?.[0]

		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				const data = e.target?.result

				if (data) {
					const jsonData = JSON.parse(data as string)
					const validationResult = schema.validate(jsonData)
					if (validationResult.error) {
						toast.error('Invalid data')
						setSyncOpen(false)
					} else {
						editList(jsonData.state.list)
						toast.success('Data uploaded successfully')
						setSyncOpen(false)
					}
				}
			}

			reader.readAsText(file)
		}
	}

	input.click()
}
