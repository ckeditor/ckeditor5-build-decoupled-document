import PageBreakEditing from './pagebreakediting';
import PageBreakUI from './pagebreakui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class PageBreak extends Plugin {
    static get requires() {
        return [ PageBreakEditing, PageBreakUI ];
    }
}