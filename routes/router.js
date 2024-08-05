import express from "express";
import { createPlayers, createPlayerTable, getAllPlayers } from "../controllers/playerController.js";
import { createScoreTable, getAllScoreDatas } from "../controllers/scoreController.js";
import { createNewTeam, createTeamTable } from "../controllers/teamController.js";

const router = express.Router();

router.route("/team/create-table").post(createTeamTable);

router.route("/team/create").post(createNewTeam);

router.route("/player/create-table").post(createPlayerTable)

router.route("/player/create").post(createPlayers)

router.route("/player/all-players").get(getAllPlayers)

router.route("/score/create-table").post(createScoreTable);

router.route("/score/create").post(createScoreTable);

router.route('/score/all-scores').get(getAllScoreDatas)

export default router;
