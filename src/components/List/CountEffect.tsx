import { useState, useEffect } from 'react'

const CountEffect = ({ count }: { count: number }) => {
	const [displayedCount, setDisplayedCount] = useState(0)

	useEffect(() => {
		setDisplayedCount(count)
	}, [count])

	return (
		<div className="overflow-hidden text-center relative w-32 h-6">
			<div
				className="absolute w-full h-full flex items-center justify-center"
				style={{ transform: `translate(0, ${100 * displayedCount}%)` }}
			>
				<strong className="select-none top-[-24px]" aria-hidden="true">
					{Math.floor(displayedCount + 1)}
				</strong>
				<strong>{Math.floor(displayedCount)}</strong>
			</div>
			<span className="text-xl font-semibold sr-only"> {count} </span>
		</div>
	)
}

export default CountEffect
