import { Commands, defaultGrid, execute, Grid, MissionExecution, MissionResult, Rover } from "./MarsRover";

describe('Mars Rover', () => {

    it('should face north and be located at origin', () => {
        verify(execute)()()
        ([])({ direction: 'N', position: { x: 0, y: 0 }, status: 'completed' });
    });

    it('should move north and wrap around the board', () => {
        verify(execute)()()
        (['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M',])({ direction: 'N', position: { x: 0, y: 1 }, status: 'completed' });
    });

    it('should move east and wrap around the board', () => {
        verify(execute)()()
        (['R', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M',])({ direction: 'E', position: { x: 1, y: 0 }, status: 'completed' });
    });

    it('should move south and wrap around the board', () => {
        verify(execute)()()
        (['R', 'R', 'M', 'M', 'M'])({ direction: 'S', position: { x: 0, y: 7 }, status: 'completed' });
    });

    it('should move west and wrap around the board', () => {
        verify(execute)()()
        (['L', 'M', 'M', 'M', 'M'])({ direction: 'W', position: { x: 6, y: 0 }, status: 'completed' });
    });

    it('should report any obstacles', () => {
        verify(execute)()({ ...defaultGrid, obstacles: [{ x: 8, y: 0 }]})
        (['L', 'M', 'M', 'M', 'M'])({ direction: 'W', position: { x: 9, y: 0 }, status: 'blocked', obstacle: { x: 8, y: 0 } });
    });
});

const verify = (executeFn: MissionExecution) =>
    (rover?: Rover) =>
    (grid?: Grid) =>
    (commands: Commands) =>
        (expectedResult: MissionResult): void => {
            expect(executeFn(rover)(grid)(commands)).toStrictEqual(expectedResult);
        };
