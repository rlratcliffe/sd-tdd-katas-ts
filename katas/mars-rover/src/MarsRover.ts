type Direction = 'N' | 'E' | 'S' | 'W';
type Coordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Position = {
    readonly x: Coordinate,
    readonly y: Coordinate
};
type Command = 'M' | 'R' | 'L';
export type Grid = {
    readonly obstacles: Position[],
    readonly bounds: { width: number, height: number }
}
export const defaultGrid = {
    obstacles: [],
    bounds: { width: 10, height: 10 }
};
export type Rover = {
    readonly direction: Direction,
    readonly position: Position
}

type CompletedRover = Rover & { readonly status: 'completed' };
type BlockedRover = Rover & { readonly status: 'blocked'; readonly obstacle: Position };
export type MissionResult = CompletedRover | BlockedRover;

export type Commands = Command[];

export type MissionExecution = (rover?: Rover) => (grid?: Grid) => (commands: Commands) => MissionResult;

const initialRover: Rover = {
    direction: 'N',
    position: { x: 0, y: 0 }
};

type RoverTransformation = (rover: Rover, grid: Grid) => MissionResult;

export const execute = (rover: Rover = initialRover)=> (grid: Grid = defaultGrid) =>
    (commands: Commands): MissionResult => {
        if (commands.length === 0) {
            return { ...rover, status: 'completed' } as CompletedRover;
        }
        const [firstCommand, ...remainingCommands] = commands;
        const newRover = COMMAND_HANDLERS[firstCommand](rover, grid);
        
        if (newRover.status === 'blocked') {
            return newRover;
        }
        
        return execute(newRover)(grid)(remainingCommands);
    };

const COMMAND_HANDLERS: Record<Command, RoverTransformation> = {
    'M': (rover, grid) => {
        const newPosition = calculateNewPosition(rover);
        return hasObstacle(newPosition, grid) 
            ? { ...rover, status: 'blocked', obstacle: newPosition } as BlockedRover
            : { ...moveToPosition(rover, newPosition), status: 'completed' } as CompletedRover;
    },
    'R': (rover) => ({ ...ROTATIONS[rover.direction].right(rover), status: 'completed' } as CompletedRover),
    'L': (rover) => ({ ...ROTATIONS[rover.direction].left(rover), status: 'completed' } as CompletedRover)
}

const hasObstacle = (position: Position, grid: Grid): boolean =>
    grid.obstacles.some(obs => obs.x === position.x && obs.y === position.y);

const calculateNewPosition = (rover: Rover): Position => {
    switch (rover.direction) {
        case 'N': return { ...rover.position, y: wrapCoordinate(rover.position.y + 1) };
        case 'E': return { ...rover.position, x: wrapCoordinate(rover.position.x + 1) };
        case 'S': return { ...rover.position, y: wrapCoordinate(rover.position.y - 1) };
        case 'W': return { ...rover.position, x: wrapCoordinate(rover.position.x - 1) };
    }
};

const moveToPosition = (rover: Rover, position: Position): Rover => ({
    ...rover,
    position
});

const wrapCoordinate = (n: number) => ((n % 10 + 10) % 10) as Coordinate;

const faceWest = (rover: Rover): Rover => ({ ...rover, direction: 'W' });
const faceNorth = (rover: Rover): Rover => ({ ...rover, direction: 'N' });
const faceEast = (rover: Rover): Rover => ({ ...rover, direction: 'E' });
const faceSouth = (rover: Rover): Rover => ({ ...rover, direction: 'S' });

const ROTATIONS: Record<Direction, { left: (rover: Rover) => Rover, right: (rover: Rover) => Rover }> = {
    'N': { left: faceWest, right: faceEast },
    'E': { left: faceNorth, right: faceSouth },
    'S': { left: faceEast, right: faceWest },
    'W': { left: faceSouth, right: faceNorth },
};
