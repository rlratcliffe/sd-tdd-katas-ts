class Character {
    health: number;
    name: string;
    status: string;

    constructor(name: string, health: number = 1000, status: string = 'Alive') {
        this.name = name;
        this.health = health;
        this.status = status;
    }

    receiveDamage(amount: number, _attacker: Character) {
        this.health = Math.max(this.health - amount, 0);
        if (this.health === 0) {
            this.status = 'Dead';
        }
    }
}

describe('Character', () => {

    it('should receive 0 damage and reduce no health', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(0, new Character("Enemy"));

        expect(hero).toEqual({name: 'Hero', health: 1000, status: 'Alive'});
    });

    it('should receive 1 damage and reduce health by 1', () => {
        const hero = new Character('Hero', 1000);

        hero.receiveDamage(1, new Character("Enemy"));

        expect(hero.health).toEqual(999);
    });

    it('should die when health reaches zero', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(1000, new Character("Enemy"));

        expect(hero).toEqual({name: 'Hero', health: 0, status: 'Dead'});
    });

    it('should die when damage received is greater than current health', () => {
        const hero = new Character('Hero', 1000, 'Alive');

        hero.receiveDamage(2000, new Character("Enemy"));

        expect(hero).toEqual({name: 'Hero', health: 0, status: 'Dead'});
    });

    it.skip('should not deal damage to themselves', () => {

    });
});