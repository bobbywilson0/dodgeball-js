class PickupBallComponent {
    pickupBallX: number;
    pickupBallY: number;
    name: string = 'PickupBall';

    constructor(pickupBallX: number, pickupBallY: number) {
        this.pickupBallX = pickupBallX;
        this.pickupBallY = pickupBallY;
        return this;
    }
}