import CardioStressEditing from './cardiostressediting';
import CardioStressUI from './cardiostressui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class CardioStress extends Plugin {
    static get requires() {
        return [ CardioStressEditing, CardioStressUI ];
    }
}