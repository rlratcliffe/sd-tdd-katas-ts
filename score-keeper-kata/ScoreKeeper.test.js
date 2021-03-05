const { ScoreKeeper } = require("./ScoreKeeper");

describe('The ScoreKeeper', () => {

    let scoreKeeper;

    beforeEach(() => {
        scoreKeeper = new ScoreKeeper();
    });

    it('returns 000:000 as initial state', () => {
        expect(scoreKeeper.getScore()).toBe("000:000");
    });

    it('adds one to team A\'s score when scoreTeamA1 is called', () => {
        scoreKeeper.scoreTeamA1();

        expect(scoreKeeper.getScore()).toBe("001:000");
    });

    it('adds two to team A\'s score when scoreTeamA2 is called', () => {
        scoreKeeper.scoreTeamA2();

        expect(scoreKeeper.getScore()).toBe("002:000");
    });

    it('adds three to team A\'s score when scoreTeamA3 is called', () => {
        scoreKeeper.scoreTeamA3();

        expect(scoreKeeper.getScore()).toBe("003:000");
    });

    it('adds one to team B\'s score when scoreTeamB1 is called', () => {
        scoreKeeper.scoreTeamB1();

        expect(scoreKeeper.getScore()).toBe("000:001");
    });

    it('adds two to team B\'s score when scoreTeamB2 is called', () => {
        scoreKeeper.scoreTeamB2();

        expect(scoreKeeper.getScore()).toBe("000:002");
    });

    it('adds three to team B\'s score when scoreTeamB3 is called', () => {
        scoreKeeper.scoreTeamB3();

        expect(scoreKeeper.getScore()).toBe("000:003");
    });
})