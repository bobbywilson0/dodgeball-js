import AthleteComponent from "./components/athlete-component";
import PositionComponent from "./components/position-component";

export default class Entity {
    id: string;
    entityCount: number = 0;
    components: {};
    
    AthleteComponent: undefined | AthleteComponent;
    PositionComponent: undefined | PositionComponent;
    InteractiveComponent: undefined | InteractiveComponent;


    constructor() {
        this.id = (+new Date()).toString(16) + 
        (Math.random() * 100000000 | 0).toString(16) +
        this.entityCount;
        return this;
    }

    addComponent(component) {
        this.components[component.name] = component;

        return this;
    }

    removeComponent(componentName) {
        let name = componentName;

        if(typeof componentName === 'function'){ 
            name = componentName.prototype.name;
        }

        delete this.components[name];
        return this;
    }

    print() {
        console.log(JSON.stringify(this, null, 4));
        return this;
    };
};