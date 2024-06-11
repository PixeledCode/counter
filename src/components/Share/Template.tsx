import { ListProps, ProfileProps } from '@/lib/store'

const colors = {
	red: {
		background: '#b20b35',
		text: '#330813',
	},
	blue: {
		background: '#0e0bb2',
		text: '#090833',
	},
}

export const Template = ({
	list,
	profile,
}: {
	list: ListProps
	profile: ProfileProps
}) => {
	const date = new Date()

	const profileName = `${profile.name}${
		profile.counterName ? "'s " + profile.counterName : ''
	}`

	const color = colors[profile.theme]

	const formattedDate = date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '320px',
				minHeight: '568px',
				margin: '0 auto',
				backgroundColor: '#E5E5E5',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '12px 24px',
					backgroundColor: color.background,
					color: 'white',
				}}
			>
				<p
					style={{
						fontWeight: 'bold',
						lineHeight: '1',
					}}
				>
					{profileName}
				</p>
				<p
					style={{
						fontSize: '14px',
						lineHeight: '1',
					}}
				>
					{formattedDate}
				</p>
			</div>

			<div
				style={{
					marginTop: '16px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					padding: '0 16px 16px 16px',
				}}
			>
				{list.map((item) => (
					<div
						key={item.name}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '0 16px',
							backgroundColor: 'white',
							color: color.text,
							borderRadius: '8px',
							fontSize: '1.25rem',
							fontWeight: 'bold',
						}}
					>
						<p>{item.name}</p>
						<p
							style={{
								flexShrink: 0,
							}}
						>
							{Number(item.count).toLocaleString()}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
