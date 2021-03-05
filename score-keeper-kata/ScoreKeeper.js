class ScoreKeeper {
    constructor() {
        this.teamAScore = 0;
        this.teamBScore = 0;
        }

    getScore() {
        let fTeamAScore = ('000' + this.teamAScore).substr(-3);
        let fTeamBScore = ('000' + this.teamBScore).substr(-3);
        return `${fTeamAScore}:${fTeamBScore}`
    }

    scoreTeamA1() {
        this.teamAScore += 1;
    }

    scoreTeamA2() {
        this.teamAScore += 2;
    }

    scoreTeamA3() {
        this.teamAScore += 3;
    }

    scoreTeamB1() {
        this.teamBScore += 1;
    }

    scoreTeamB2() {
        this.teamBScore += 2;
    }

    scoreTeamB3() {
        this.teamBScore += 3;
    }
}

module.exports.ScoreKeeper = ScoreKeeper;