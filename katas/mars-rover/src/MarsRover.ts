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

export type MissionExecution = (rover?: Rover) => (commands: Commands) => Rover;

const initialRover: Rover = {
    direction: 'N',
    position: { x: 0, y: 0 }
};

export const execute = (rover: Rover = initialRover) =>
    (commands: Commands): Rover => {
        if (commands.length === 0) {
            return rover
        }
        const [firstCommand, ...remainingCommands] = commands;
        const newRover = processCommand(firstCommand, rover);
        console.log(`processed command: ${firstCommand} new rover location: ${JSON.stringify(newRover)}`);
        return execute(newRover)(remainingCommands);
    };

const processCommand = (firstCommand: Command, rover: Rover): Rover => {
    if (firstCommand === 'M') {
        const newY: Coordinate = ((rover.position.y + 1) % 10) as Coordinate;
        return {
            direction: 'N',
            position: { x: 0, y: newY }
        };
    }
    throw new Error(`Unsupported command: ${firstCommand}`);
};
