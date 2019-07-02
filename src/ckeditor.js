/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

// The editor creator to use.
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import Link from '@ckeditor/ckeditor5-link/src/link';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

// Custom Plugins
import SimpleUpload from '../customPlugins/ckeditor5-simple-upload/src/simpleupload';
import PageBreak from '../customPlugins/pagebreak/src/pagebreak';
import Cardio from '../customPlugins/cardio/cardio';
import CardioComp from '../customPlugins/cardiocomp/cardiocomp';
import CardioStress from '../customPlugins/cardiostress/cardiostress';

export default class DecoupledEditor extends DecoupledEditorBase {}

// Plugins to include in the build.
DecoupledEditor.builtinPlugins = [
	Essentials,
	// Autoformat,
	Font,
	Bold,
	Italic,
	Underline,
	Subscript,
	Superscript,
	Strikethrough,
	Alignment,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	List,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	SimpleUpload,
	PageBreak,
	Autosave,
	Link,
	RemoveFormat,
	Cardio,
	CardioComp,
	CardioStress
];

// Editor configuration.
DecoupledEditor.defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'fontFamily',
			'fontSize',
			'fontColor',
			'fontBackgroundColor',
			'removeFormat',
			'|',
			'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',
			'|',
			'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
			'|',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'insertTable',
			'pageBreak',
			'link',
			'cardio',
			'cardiocomp',
			'cardioStress'
		]
	},
	image: {
		toolbar: [ 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],

		styles: [
			'full',
			'alignLeft',
			'alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	fontSize: {
		options: [
			8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 36, 48
		]
	},
	fontFamily: {
		options: [
			'Arial', 'Courier New', 'Lucida Sans Unicode', 'Tahoma', 'Times New Roman', 'Trebuchet', 'Verdana', 'Georgia'
		]
	},
	autosave: {
		save( editor ) {
			if ( editor.config.get( 'autosaveEnabled' ) ) {
				return saveData( editor.getData() );
			} else {
				return false;
			}
		}
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'pt-br'
};

// Criação da função  "insertHtml" em todas as instâncias criadas do editor.
DecoupledEditor.prototype.insertHtml = function( html ) {
	const viewFragment = this.data.processor.toView( html );
	const modelFragment = this.data.toModel( viewFragment );
	// eslint-disable-next-line consistent-this
	const editor = this;

	$( '.ck-editor__editable' ).focus();
	editor.model.change( writer => {
		writer.setSelectionFocus( editor.model.insertContent( modelFragment ).end, 'end' );
	} );

};

let sidebarReloaded = false;

// Autosave
function saveData( data ) {
	if (!workflowEditor.isReadOnly) {
		displayStatus();
		$( '#customfilledform-filled_form_content' ).val( workflowEditor.getData() );
		const form = $( '#step-form' ),
			circleLoader = $( '.circle-loader' ),
			checkMark = $( '.checkmark' ),
			statusIndicator = $( '.checkmark-wrapper' ),
			autosaveAlert = $( '.workflow-autosave' ),
			autosaveText = autosaveAlert.children( 'span' );

		return new Promise( resolve => {
			displayStatus();
			$.ajax( {
				url: form.attr( 'action' ),
				data: form.serialize(),
				type: 'post',
				success: function( data ) {
					circleLoader.addClass( 'load-complete' );
					checkMark.show();
					checkMark.fadeIn( 500 );
					autosaveAlert.removeClass( 'alert-warning' ).addClass( 'alert-success' );
					autosaveText.text( 'Todas as alterações foram salvas' );

					if (!sidebarReloaded) {
						$( '#treatment-health-professionals' ).load( $( '#treatment-health-professionals' ).data( 'url' ) );
					}
					sidebarReloaded = true;
				}
			} );
			resolve();
		} );
	}
}

// Atualização do status de salvamento
function displayStatus() {
	const pendingActions = workflowEditor.plugins.get( 'PendingActions' ),
		statusIndicator = $( '.checkmark-wrapper' ),
		circleLoader = $( '.circle-loader' ),
		checkMark = $( '.checkmark' ),
		autosaveAlert = $( '.workflow-autosave' ),
		autosaveText = autosaveAlert.children( 'span' );

	pendingActions.off( 'change:hasAny' );
	pendingActions.on( 'change:hasAny', ( evt, propertyName, newValue ) => {
		autosaveAlert.css( 'opacity', 1 );
		if ( newValue ) {
			if ( statusIndicator.is( ':animated' ) ) {
				statusIndicator.stop().show();
			}
			circleLoader.removeClass( 'load-complete' );
			checkMark.fadeOut( 500 );
			autosaveAlert.removeClass( 'alert-success' ).addClass( 'alert-warning' );
			autosaveText.text( 'Salvando...' );
		}
	} );
}
