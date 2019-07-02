import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertCardioCommand from './insertcardiocommand';
import {
 toWidget,
 toWidgetEditable,
 viewToModelPositionOutsideModelElement
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

        this.editor.commands.add( 'insertCardio', new InsertCardioCommand( this.editor ) );

        // this.editor.editing.mapper.on(
        //     'viewToModelPosition',
        //     viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'cardio-editable-field' ) )
        // );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'cardio', {
            isObject: true,
            allowWhere: '$block'
        } );

        schema.register( 'cardioRow', {
            allowIn: 'cardio',
            allowContentOf: '$block'
        } );

        schema.register( 'cardioCell', {
            isLimit: true,
            allowIn: 'cardioRow',
            allowContentOf: '$block',
			allowAttributes: [ 'id' ]
        } );

        schema.register( 'cardioEditableField', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'cardioRow',
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
            model: 'cardio',
            view: {
                name: 'table',
                classes: 'cardio-wrapper'
            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardio',
            view: ( modelElement, viewWriter ) => {
                const table = viewWriter.createContainerElement( 'table', { class: 'cardio-wrapper' } );
                return toWidget( table, viewWriter, { label: 'cardio widget' } );
            }
        } );

        // <cardioRow> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioRow',
            view: {
                name: 'tr',
                classes: 'cardio-row',

            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioRow',
            view: ( modelElement, viewWriter ) => {
                return viewWriter.createContainerElement( 'tr', { class: 'cardio-row' } );
            }
        } );

        // <cardioCell> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCell',
            view: {
                name: 'td',
                classes: 'cardio-cell',
            }
        } );

        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioCell',
            view: ( modelElement, viewWriter ) => {
                return viewWriter.createContainerElement( 'td', { class: 'cardio-cell' } );
            }
        } );

        // <cardioEditableField> converters
        conversion.for( 'upcast' ).elementToElement( {
            converterPriority: 'highest',
            model: ( viewElement, modelWriter ) => {
                return modelWriter.createElement( 'cardioEditableField', { id: viewElement.getAttribute( 'id' ) } );
            },
            view: {
                name: 'td',
                // classes: 'cardio-editable-field'
            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            converterPriority: 'highest',
            model: 'cardioEditableField',
            view: ( modelElement, viewWriter ) => {
            	const id = modelElement.getAttribute('id');
                const td = viewWriter.createEditableElement( 'td', { class: 'cardio-editable-field', id: id } );
                if(id)
                	editableFields[id] = td;
                console.log(editableFields);
                return toWidgetEditable( td, viewWriter );
            }
        } );
    }

    _initializeEditorEvents(){
		this.editor.model.document.on( 'change:data', (evt, data) => {
			let editor = this.editor
		    let editableElement = editor.editing.view.document.selection.editableElement;
		    if(editableElement && editableElement.hasClass('cardio-editable-field')) {
	    		makeCalculations(editableElement.getAttribute('id'), editor);
		    }
		} );
    }
}

