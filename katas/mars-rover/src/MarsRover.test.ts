import { Commands, MissionExecution, execute, Rover } from "./MarsRover";

describe('Mars Rover', () => {

    it('should face north and be located at origin', () => {
        verify(execute)([])({ direction: 'N', position: { x: 0, y: 0 } });
    });
});

const verify = (executeFn: MissionExecution) =>
    (commands: Commands) =>
        (expectedRover: Rover): void => {
            expect(executeFn(commands)).toStrictEqual(expectedRover);
        };
