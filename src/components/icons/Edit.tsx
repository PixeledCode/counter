export const Edit = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 48 48"
			{...props}
		>
			<path
				fill="var(--theme-icon)"
				d="M36.513 1.53C33.335-.5 29.64.66 27.307 2.994L2.233 28.065c-.769.768-1.342 1.787-1.479 2.971-.226 1.951-.495 6.089.028 12.898a3.567 3.567 0 0 0 3.281 3.28c6.81.524 10.95.254 12.9.028 1.185-.137 2.203-.71 2.971-1.477l25.074-25.069c2.335-2.334 3.497-6.03 1.465-9.208-.998-1.56-2.432-3.43-4.48-5.477-2.05-2.049-3.92-3.483-5.48-4.48Z"
			/>
			<path
				fill="var(--theme-bg-seconday)"
				d="M19.254 46.342c-1.785-2.483-4.547-6.012-8.071-9.537-3.52-3.519-7.045-6.278-9.528-8.062-.491.675-.801 1.464-.9 2.292-.227 1.951-.496 6.09.027 12.898a3.566 3.566 0 0 0 3.281 3.28c6.81.524 10.95.254 12.9.028.828-.1 1.616-.409 2.29-.9ZM44.04 21.664c-1.661-2.594-4.196-5.928-7.998-9.73-3.79-3.788-7.114-6.315-9.703-7.974L22.6 7.704c2.345 1.398 5.748 3.822 9.802 7.874 4.067 4.065 6.497 7.48 7.896 9.828l3.743-3.74Z"
			/>
		</svg>
	)
}
