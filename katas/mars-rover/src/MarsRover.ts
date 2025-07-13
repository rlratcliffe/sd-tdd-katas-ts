type Direction = 'N' | 'E' | 'S' | 'W';
type Coordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Position = {
    readonly x: Coordinate,
    readonly y: Coordinate
};
type Command = 'M' | 'R' | 'L';
export type Rover = {
    readonly direction: Direction,
    readonly position: Position
}

export type Commands = Command[];

export type MissionExecution = (commands: Commands) => Rover;

export const execute = (commands: Commands): Rover => {
    console.log(commands);
    return {
        direction: 'N',
        position: { x: 0, y: 0 }
    }
};