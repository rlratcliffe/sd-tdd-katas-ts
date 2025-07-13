import { Commands, execute, MissionExecution, Rover } from "./MarsRover";

describe('Mars Rover', () => {

    it('should face north and be located at origin', () => {
        verify(execute)()
        ([])({ direction: 'N', position: { x: 0, y: 0 } });
    });

    it('should move north and wrap around the board', () => {
        verify(execute)()
        (['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M',])({ direction: 'N', position: { x: 0, y: 1 } });
    });

    it('should move east and wrap around the board', () => {
        verify(execute)()
        (['R', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M',])({ direction: 'E', position: { x: 1, y: 0 } });
    });

    it('should move south and wrap around the board', () => {
        verify(execute)()
        (['R', 'R', 'M', 'M', 'M'])({ direction: 'S', position: { x: 0, y: 7 } });
    });

    it('should move west and wrap around the board', () => {
        verify(execute)()
        (['L', 'M', 'M', 'M', 'M'])({ direction: 'W', position: { x: 6, y: 0 } });
    });
});

const verify = (executeFn: MissionExecution) =>
    (rover?: Rover) =>
    (commands: Commands) =>
        (expectedRover: Rover): void => {
            expect(executeFn(rover)(commands)).toStrictEqual(expectedRover);
        };
