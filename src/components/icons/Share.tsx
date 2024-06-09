export const Share = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 48 48"
			{...props}
		>
			<path
				fill="var(--theme-icon)"
				fillRule="evenodd"
				d="M38.683 10.658a3 3 0 0 1-1.341 4.025L18.708 24l18.634 9.317a3 3 0 0 1-2.684 5.366l-24-12a3 3 0 0 1 0-5.366l24-12a3 3 0 0 1 4.025 1.341Z"
				clipRule="evenodd"
			/>
			<path
				fill="var(--theme-icon-bg)"
				d="M11 14.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM37 27.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM37 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Z"
			/>
		</svg>
	)
}
