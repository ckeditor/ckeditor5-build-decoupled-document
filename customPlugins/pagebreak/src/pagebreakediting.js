import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertPageBreakCommand from './pagebreakcommand';


export default class PageBreakEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();
        this.editor.commands.add( 'insertPageBreak', new InsertPageBreakCommand( this.editor ) );
    }

    _defineSchema() {
      const schema = this.editor.model.schema;

        schema.register( 'pageBreakWrapper', {
            isObject: true,
            allowWhere: '$block'
        } );

        schema.register( 'pageBreakContent', {
            isLimit: true,
            allowIn: 'pageBreakWrapper',
            allowContentOf: '$block'
        } );
    }

    _defineConverters() {                                                   
        const conversion = this.editor.conversion;

        // <pageBreak> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'pageBreakWrapper',
            view: {
                name: 'section',
                classes: 'page-break-wrapper'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'pageBreakWrapper',
            view: {
                name: 'section',
                classes: 'page-break-wrapper'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'pageBreakWrapper',
            view: ( modelElement, viewWriter ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'page-break-wrapper' } );

                return toWidget( section, viewWriter );
            }
        } );

        // <pageBreakContent> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'pageBreakContent',
            view: {
                name: 'p',
                classes: 'page-break-content'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'pageBreakContent',
            view: {
                name: 'p',
                classes: 'page-break-content'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'pageBreakContent',
            view: ( modelElement, viewWriter ) => {

                return toWidget( viewWriter.createEditableElement( 'p', { class: 'page-break-content' } ), viewWriter );
            }
        } );
    }
}
