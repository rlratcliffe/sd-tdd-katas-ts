import { Commands, execute, MissionExecution, Rover } from "./MarsRover";

describe('Mars Rover', () => {

    it('should face north and be located at origin', () => {
        verify(execute)()([])({ direction: 'N', position: { x: 0, y: 0 } });
    });

    it('should move', () => {
        verify(execute)()(['M'])({ direction: 'N', position: { x: 0, y: 1 } });
        verify(execute)()(['M', 'M'])({ direction: 'N', position: { x: 0, y: 2 } });
    });
});

const verify = (executeFn: MissionExecution) =>
    (rover?: Rover) =>
    (commands: Commands) =>
        (expectedRover: Rover): void => {
            expect(executeFn(rover)(commands)).toStrictEqual(expectedRover);
        };
