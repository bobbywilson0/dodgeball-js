export default class SelectComponent {
    name: string = 'SelectComponent';
    selected: boolean;


    constructor(selected: boolean) {
        this.selected = selected;
        return this;
    }
}