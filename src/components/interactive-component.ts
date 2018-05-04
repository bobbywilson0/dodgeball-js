class InteractiveComponent {
    interactive: boolean;
    name: string = 'Interactive';

    constructor(interactive: boolean) {
        this.interactive = interactive;
        return this;
    }
}