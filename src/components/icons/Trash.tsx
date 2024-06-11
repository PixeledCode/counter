export const Trash = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 48 48"
			{...props}
		>
			<path
				fill="var(--warning-mid)"
				d="M43.318 15.934a1.5 1.5 0 0 0-1.618-1.591c-3.016.246-8.46.52-17.721.52-9.215 0-14.65-.271-17.675-.516a1.5 1.5 0 0 0-1.618 1.59c.888 13.84 1.74 21.07 2.253 24.547.332 2.252 1.85 4.217 4.226 4.788 2.445.588 6.55 1.227 12.837 1.227 6.286 0 10.392-.64 12.837-1.227 2.375-.57 3.894-2.536 4.226-4.788.513-3.477 1.365-10.708 2.253-24.55Z"
			/>
			<path
				fill="var(--warning-dark)"
				d="M23.37 1a8 8 0 0 0-7.034 4.188c-3.411.072-6 .182-7.814.282-2.312.127-4.692 1.242-5.7 3.605-.244.57-.475 1.212-.663 1.919-.68 2.548 1.302 4.622 3.657 4.822 3.057.258 8.614.548 18.161.548 9.549 0 15.106-.29 18.162-.549 2.374-.2 4.291-2.261 3.751-4.785a16.68 16.68 0 0 0-.294-1.167c-.824-2.831-3.517-4.277-6.188-4.411a260.66 260.66 0 0 0-7.744-.264A8 8 0 0 0 24.631 1H23.37Z"
			/>
			<path
				fill="var(--warning-dark)"
				fillRule="evenodd"
				d="M17.8 23.01a2 2 0 0 1 2.19 1.791l1 10a2 2 0 0 1-3.98.398l-1-10a2 2 0 0 1 1.79-2.189ZM30.2 23.01a2 2 0 0 0-2.19 1.791l-1 10a2 2 0 0 0 3.98.398l1-10a2 2 0 0 0-1.79-2.189Z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
