import Icon from '@mdi/react';

export default ( {
	attributes: {
		path,
		textAlign,
		align,
		color,
		size,
		horizontal,
		vertical,
		spin,
		rotate,
	},
} ) => (
	<div
		style={ {
			textAlign,
			float: align,
		} }
	>
		<Icon
			path={ path }
			size={ size }
			color={ color }
			horizontal={ horizontal }
			vertical={ vertical }
			spin={ spin }
			rotate={ rotate }
			role="img"
			aria-hidden
			focusable={ false }
		/>
	</div>
);
