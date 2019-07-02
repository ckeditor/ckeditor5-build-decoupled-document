import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertCardioCompCommand from './insertcardiocompcommand';
import {
 toWidget,
 toWidgetEditable,
} from '@ckeditor/ckeditor5-widget/src/utils';

import { makeCalculations } from './utils';


export default class CardioEditing extends Plugin {

    static get requires() {
        return [ Widget ];
    }

    init() {
    	this._defineSchema();
    	this._defineConverters();
    	this._initializeEditorEvents();

        this.editor.commands.add( 'insertCardioComp', new InsertCardioCompCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'cardioComp', {
            isObject: true,
            allowWhere: '$block'
        } );

        schema.register( 'cardioCompRow', {
            allowIn: 'cardioComp',
            allowContentOf: '$block'
        } );

        schema.register( 'cardioCompCell', {
            isLimit: true,
            allowIn: 'cardioCompRow',
            allowContentOf: '$block',
			allowAttributes: [ 'id' ]
        } );

        schema.register( 'cardioCompEditableField', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'cardioCompRow',
			allowAttributes: [ 'id' ],
            allowContentOf: '$block'
        } );

        // schema.addChildCheck( ( context, childDefinition ) => {
        //     if ( context.endsWith( 'simpleBoxDescription' ) && childDefinition.name == 'simpleBox' ) {
        //         return false;
        //     }
        // } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
       	var editableFields = [];


        // <cardio> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioComp',
            view: {
                name: 'table',
                classes: 'cardiocomp-wrapper'
            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioComp',
            view: ( modelElement, viewWriter ) => {
                const table = viewWriter.createContainerElement( 'table', { class: 'cardiocomp-wrapper' } );
                return toWidget( table, viewWriter, { label: 'cardio comp widget' } );
            }
        } );

        // <cardioRow> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCompRow',
            view: {
                name: 'tr',
                classes: 'cardiocomp-row',

            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCompRow',
            view: ( modelElement, viewWriter ) => {
                return viewWriter.createContainerElement( 'tr', { class: 'cardiocomp-row' } );
            }
        } );

        // <cardioCell> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCompCell',
            view: {
                name: 'td',
                classes: 'cardiocomp-cell',
            }
        } );

        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCompCell',
            view: ( modelElement, viewWriter ) => {
                return viewWriter.createContainerElement( 'td', { class: 'cardiocomp-cell' } );
            }
        } );

        // <cardioEditableField> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: ( viewElement, modelWriter ) => {
                return modelWriter.createElement( 'cardioCompEditableField', { id: viewElement.getAttribute( 'id' ) } );
            },
            view: {
                name: 'td',
                // classes: 'cardio-editable-field'
            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCompEditableField',
            view: ( modelElement, viewWriter ) => {
            	const id = modelElement.getAttribute('id');
                const td = viewWriter.createEditableElement( 'td', { class: 'cardiocomp-editable-field', id: id } );
                if(id)
                	editableFields[id] = td;

                return toWidgetEditable( td, viewWriter );
            }
        } );
    }

    _initializeEditorEvents(){
		this.editor.model.document.on( 'change:data', (evt, data) => {
			let editor = this.editor
		    let editableElement = editor.editing.view.document.selection.editableElement;
		    if(editableElement && editableElement.hasClass('cardiocomp-editable-field')) {
	    		makeCalculations(editableElement.getAttribute('id'), editor);
		    }
		} );
    }
}

