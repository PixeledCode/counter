declare global {
	interface Window {
		__resource?: any[]
	}
}

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { domToPng } from 'modern-screenshot'
import { schema } from '@/components/Sync/validator'
import { toast } from 'sonner'
import { ListProps } from './store'
import { createIntlSegmenterPolyfill } from 'intl-segmenter-polyfill'
import satori from 'satori'

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

export async function shareImage(dataURI: string, runOnFinish?: () => void) {
	if (!('share' in navigator)) {
		console.error('Your browser does not support the Web Share API')
		return
	}

	const blob = await fetch(dataURI).then((res) => res.blob())
	const file = new File([blob], 'counter.png', { type: blob.type })
	const files = [file]

	const shareData = {
		files,
	}
	if (navigator.canShare(shareData)) {
		navigator.share(shareData)
		runOnFinish && runOnFinish()
	}
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
						editList(jsonData)
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

export const reactToSVG = async (
	Component: React.ReactElement,
	props: { width: number; height?: number }
): Promise<string> => {
	const fonts: any = await initFonts()
	const svg = await satori(Component, {
		width: props.width,
		height: props.height,
		fonts,
	})
	return svg
}

async function initFonts(): Promise<
	Array<{ name: string; style: string; weight: number; data: ArrayBuffer }>
> {
	if (typeof window === 'undefined') return []

	const [font1, font2, font3, font4, Segmenter] =
		window.__resource ||
		(window.__resource = await Promise.all([
			fetch('/Manrope-Medium.ttf').then((res) => res.arrayBuffer()),
			fetch('/Manrope-SemiBold.ttf').then((res) => res.arrayBuffer()),
			fetch('/Manrope-Bold.ttf').then((res) => res.arrayBuffer()),
			fetch('/Manrope-ExtraBold.ttf').then((res) => res.arrayBuffer()),
			!globalThis.Intl || !(globalThis.Intl as any).Segmenter
				? createIntlSegmenterPolyfill(
						fetch(
							new URL(
								'intl-segmenter-polyfill/dist/break_iterator.wasm',
								import.meta.url
							)
						)
				  )
				: null,
		]))

	if (Segmenter) {
		globalThis.Intl = globalThis.Intl || {}
		//@ts-expect-error - globalThis.Intl.Segmenter is not defined
		globalThis.Intl.Segmenter = Segmenter
	}

	return [
		{
			name: 'Manrope',
			style: 'medium',
			weight: 500,
			data: font1,
		},
		{
			name: 'Manrope',
			style: 'semi-bold',
			weight: 600,
			data: font2,
		},
		{
			name: 'Manrope',
			style: 'bold',
			weight: 700,
			data: font3,
		},
		{
			name: 'Manrope',
			style: 'extra-bold',
			weight: 800,
			data: font4,
		},
	]
}

export const svgToPngURI = (svg: string): Promise<string> =>
	new Promise<string>((resolve, reject) => {
		const img = new Image()

		img.onload = () => {
			const scaleFactor = 3

			const canvas = document.createElement('canvas')
			canvas.width = img.naturalWidth * scaleFactor
			canvas.height = img.naturalHeight * scaleFactor
			const ctx = canvas.getContext('2d')
			ctx!.scale(scaleFactor, scaleFactor)
			ctx!.drawImage(img, 0, 0)
			resolve(canvas.toDataURL('image/png'))
			URL.revokeObjectURL(img.src)
		}
		img.onerror = (e) => {
			reject(e)
			URL.revokeObjectURL(img.src)
		}
		img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
	})
