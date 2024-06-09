export const Minus = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 48 48"
			{...props}
		>
			<path
				fill="#8fbffa"
				d="M24 1.5C11.574 1.5 1.5 11.574 1.5 24S11.574 46.5 24 46.5 46.5 36.426 46.5 24 36.426 1.5 24 1.5Z"
			/>
			<path
				fill="#2859c5"
				fill-rule="evenodd"
				d="M12.142 21.839c.148-1.012 1.017-1.638 2.038-1.683C15.806 20.085 18.823 20 24 20c5.177 0 8.194.085 9.82.156 1.021.045 1.89.671 2.038 1.683.081.556.142 1.27.142 2.161s-.061 1.605-.142 2.161c-.148 1.012-1.017 1.638-2.038 1.683-1.626.071-4.643.156-9.82.156-5.177 0-8.194-.085-9.82-.156-1.021-.045-1.89-.671-2.038-1.683A15.01 15.01 0 0 1 12 24c0-.891.061-1.605.142-2.161Z"
				clip-rule="evenodd"
			/>
		</svg>
	)
}
