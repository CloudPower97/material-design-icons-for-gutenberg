import * as mdi from '@mdi/js';
import Icon from '@mdi/react';
import { DebounceInput } from 'react-debounce-input';

const mdiIcons = Object.entries( mdi );

const { __ } = wp.i18n;
const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
} = wp.editor;
const {
	Button,
	Modal,
	Tooltip,
	ToggleControl,
	TextControl,
	PanelBody,
	PanelRow,
	BaseControl,
} = wp.components;
const { Component } = wp.element;

export default class extends Component {
	state = {
		icons: mdiIcons,
		showModal: false,
	};

	toggleModal = () => {
		this.setState( prevState => ( {
			showModal: ! prevState.showModal,
		} ) );
	};

	onSearchInputChange = ( { target } ) => {
		const value = target.value.trim().toLowerCase();

		if ( value !== 'mdi' ) {
			this.setState( {
				icons:
					value.length === 0 ?
						mdiIcons :
						mdiIcons.filter( ( [ iconName ] ) =>
							iconName.toLowerCase().includes( value )
						  ),
			} );
		}
	};

	onChangeAlignment = textAlign => {
		const { setAttributes } = this.props;

		setAttributes( {
			textAlign: textAlign === undefined ? 'unset' : textAlign,
		} );
	};

	render() {
		const {
			attributes: {
				textAlign,
				path,
				size,
				color,
				horizontal,
				vertical,
				rotate,
				spin,
			},
			setAttributes,
		} = this.props;

		const { icons, showModal } = this.state;

		return (
			<div
				style={ {
					textAlign,
				} }
			>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ this.onChangeAlignment }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody>
						<PanelRow>
							<TextControl
								label={ __( 'Size' ) }
								type="number"
								value={ size }
								min={ 1 }
								help={ __( '{size * 1.5}rem, 1em, 48px' ) }
								onChange={ size => {
									setAttributes( {
										size,
									} );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<BaseControl label={ __( 'Icon color' ) }>
								<ColorPalette
									value={ color }
									onChange={ newColor => {
										setAttributes( {
											color: newColor,
										} );
									} }
								/>
							</BaseControl>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Horizontal' ) }
								help={ __( 'Flip the icon horizontally' ) }
								checked={ horizontal }
								onChange={ horizontal => {
									setAttributes( {
										horizontal,
									} );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Vertical' ) }
								help={ __( 'Flip the icon vertically' ) }
								checked={ vertical }
								onChange={ vertical => {
									setAttributes( {
										vertical,
									} );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __( 'Rotate' ) }
								type="number"
								value={ rotate }
								min={ 0 }
								max={ 360 }
								help={ __( 'Rotate the icon in degrees, from 0 to 360' ) }
								onChange={ rotate => {
									setAttributes( {
										rotate,
									} );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Spin' ) }
								help={ __( 'Apply a spinning animation the icon' ) }
								checked={ spin }
								onChange={ spin => {
									setAttributes( {
										spin,
									} );
								} }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<Tooltip text={ __( 'Change Icon' ) }>
					<Button onClick={ this.toggleModal }>
						<Icon
							path={ path }
							size={ +size }
							color={ color }
							horizontal={ horizontal }
							vertical={ vertical }
							spin={ spin }
							rotate={ rotate }
							role="img"
							aria-hidden
							focusable={ false }
						/>
					</Button>
				</Tooltip>
				{ showModal && (
					<Modal title={ __( 'Icon Picker' ) } onRequestClose={ this.toggleModal }>
						<label htmlFor="search_input">{ __( 'Search an icon' ) }</label>
						<DebounceInput
							id="search_input"
							minLength={ 3 }
							debounceTimeout={ 625 }
							onChange={ this.onSearchInputChange }
							className="components-text-control__input"
						/>
						<div className="icons">
							{ icons.map( ( [ name, path ] ) => (
								<Button
									name={ name }
									type="button"
									key={ name }
									onClick={ () => {
										this.toggleModal();
										setAttributes( {
											path,
										} );
									} }
									className="icon-button"
								>
									<Icon path={ path } size={ 2 } />
									<p>{ name }</p>
								</Button>
							) ) }
						</div>
					</Modal>
				) }
			</div>
		);
	}
}
