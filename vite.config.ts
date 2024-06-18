import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*'],
				cleanupOutdatedCaches: false,
			},
			includeAssets: ['**/*'],
			manifest: {
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/index.html',
				short_name: 'Counter',
				description:
					'A basic counter app which ability to add new counters, update or delete them',
				name: 'Counter',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/maskable_icon.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
