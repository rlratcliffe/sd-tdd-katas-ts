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

type RoverTransformation = (rover: Rover) => Rover;

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
    return COMMAND_HANDLERS[firstCommand](rover);
};

const COMMAND_HANDLERS: Record<Command, RoverTransformation> = {
    'M': (rover) => MOVEMENTS[rover.direction](rover),
    'R': (rover) => ROTATIONS[rover.direction].right(rover),
    'L': (rover) => ROTATIONS[rover.direction].left(rover)
}

const moveNorth: RoverTransformation = (rover: Rover) => ({
        ...rover,
        position: {
            ...rover.position,
            y: wrapCoordinate(rover.position.y + 1)
        }
    });

const moveEast: RoverTransformation = (rover: Rover) => ({
        ...rover,
        position: {
            ...rover.position,
            x: wrapCoordinate(rover.position.x + 1)
        }
    }
);

const moveSouth: RoverTransformation = (rover: Rover) => ({
        ...rover,
        position: {
            ...rover.position,
            y: wrapCoordinate(rover.position.y - 1)
        }
    }
);

const moveWest: RoverTransformation = (rover: Rover) => {
    return ({
            ...rover,
            position: {
                ...rover.position,
                x: wrapCoordinate(rover.position.x - 1)
            }
        }
    );
};

const wrapCoordinate = (n: number) => ((n % 10 + 10) % 10) as Coordinate;

const MOVEMENTS: Record<Direction, RoverTransformation> = {
    N: moveNorth,
    E: moveEast,
    S: moveSouth,
    W: moveWest
};

const faceWest: RoverTransformation = (rover: Rover) => ({
    ...rover,
    direction: 'W'
});

const faceNorth: RoverTransformation = (rover: Rover) => ({
    ...rover,
    direction: 'N'
});

const faceEast: RoverTransformation = (rover: Rover) => ({
    ...rover,
    direction: 'E'
});

const faceSouth: RoverTransformation = (rover: Rover) => ({
    ...rover,
    direction: 'S'
});

const ROTATIONS: Record<Direction, {left: RoverTransformation, right: RoverTransformation}> = {
    'N': { left: faceWest, right: faceEast},
    'E': { left: faceNorth, right: faceSouth},
    'S': { left: faceEast, right: faceWest},
    'W': { left: faceSouth, right: faceNorth},
};
