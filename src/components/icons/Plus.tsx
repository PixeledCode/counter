export const Plus = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
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
				d="M20.156 33.82c.045 1.021.671 1.89 1.683 2.038.556.081 1.27.142 2.161.142s1.605-.061 2.161-.142c1.012-.148 1.638-1.017 1.683-2.038.05-1.154.108-3.009.137-5.839 2.83-.029 4.685-.086 5.839-.137 1.021-.045 1.89-.671 2.038-1.683.081-.556.142-1.27.142-2.161s-.061-1.605-.142-2.161c-.148-1.012-1.017-1.638-2.038-1.683-1.154-.05-3.009-.108-5.839-.137-.029-2.83-.086-4.685-.137-5.839-.045-1.021-.671-1.89-1.683-2.038A15.01 15.01 0 0 0 24 12c-.891 0-1.605.061-2.161.142-1.012.148-1.638 1.017-1.683 2.038-.05 1.154-.108 3.009-.137 5.839-2.83.029-4.685.086-5.839.137-1.021.045-1.89.671-2.038 1.683A15.01 15.01 0 0 0 12 24c0 .891.061 1.605.142 2.161.148 1.012 1.017 1.638 2.038 1.683 1.154.05 3.009.108 5.839.137.029 2.83.086 4.685.137 5.839Z"
				clip-rule="evenodd"
			/>
		</svg>
	)
}