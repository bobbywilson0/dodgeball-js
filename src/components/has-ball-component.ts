export default class HasBallComponent {
    hasBall: boolean;
    name: string = 'HasBallComponent';

    constructor(hasBall: boolean) {
        this.hasBall = hasBall;
        return this;
    }
}