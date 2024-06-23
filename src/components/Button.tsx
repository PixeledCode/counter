import React from 'react'
import { Button } from './ui/button'

export const ChonkyButton = ({
	children,
	...props
}: React.ComponentProps<typeof Button> & { children: React.ReactNode }) => {
	return (
		<Button
			className="w-full mx-auto rounded-lg font-extrabold bg-theme-bg-primary active:bg-theme-bg-primary hover:bg-theme-bg-primary active:scale-[98%] h-12"
			{...props}
		>
			{children}
		</Button>
	)
}
