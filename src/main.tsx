import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/sonner'
import { Star } from './components/icons/Star.tsx'
import { Cross } from './components/icons/Cross.tsx'

const ErrorIconCircle = () => {
	return (
		<div className="rounded-full bg-warning-dark w-5 h-5 flex items-center justify-center">
			<Cross width={10} fill="var(--theme-bg-light)" />
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<App />
		<Toaster
			toastOptions={{
				duration: 2000,
				unstyled: true,
				classNames: {
					toast:
						'rounded-full flex items-center gap-2 px-3 py-2 text-xs border border-[1px] font-semibold',
					error:
						'bg-warning-secondary-bg text-warning-dark border-warning-dark',
					success: 'bg-theme-bg-seconday text-theme-icon border-text-icon',
				},
			}}
			icons={{
				success: <Star width={20} fill="var(--theme-bg-primary)" />,
				error: <ErrorIconCircle />,
			}}
		/>
	</>
)
