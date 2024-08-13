import express from "express";
import { createPlayers, createPlayerTable, getAllPlayers } from "../controllers/playerController.js";
import { createNewScore, createScoreTable, getAllScoreDatas, updateScoreboard } from "../controllers/scoreController.js";
import { createNewTeam, createTeamTable } from "../controllers/teamController.js";

const router = express.Router();

// teams

router.route("/team/create-table").post(createTeamTable);

router.route("/team/create").post(createNewTeam);

// players

router.route("/player/create-table").post(createPlayerTable)

router.route("/player/create").post(createPlayers)

router.route("/player/all-players").get(getAllPlayers)

// scores

router.route("/score/create-table").post(createScoreTable);

router.route("/score/create").post(createNewScore);

router.route('/score/all-scores').get(getAllScoreDatas)

router.route('/score/update-score/:id').put(updateScoreboard)

export default router;
