import { Commands, execute, MissionExecution, Rover } from "./MarsRover";

describe('Mars Rover', () => {

    it('should face north and be located at origin', () => {
        verify(execute)()([])({ direction: 'N', position: { x: 0, y: 0 } });
    });

    it('should move north and wrap around the board', () => {
        verify(execute)()(['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M',])({ direction: 'N', position: { x: 0, y: 1 } });
    });

    it('should move east and wrap around the board', () => {
        verify(execute)()(['R'])({ direction: 'E', position: { x: 0, y: 0 } });
        verify(execute)()(['R', 'M'])({ direction: 'E', position: { x: 1, y: 0 } });
    });
});

const verify = (executeFn: MissionExecution) =>
    (rover?: Rover) =>
    (commands: Commands) =>
        (expectedRover: Rover): void => {
            expect(executeFn(rover)(commands)).toStrictEqual(expectedRover);
        };
