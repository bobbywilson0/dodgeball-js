import { Container } from 'pixi.js'
export default class AthleteComponent {
    team: string;
    height: number;
    name: string = 'Athlete';
    number: string;

    constructor(team: string, number: string) {
        this.team = team;
        this.number = number;
        return this;
    }
}