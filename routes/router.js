import express from "express";
import { createPlayerTable } from "../controllers/playerController.js";
import { createScoreTable, getAllScoreDatas } from "../controllers/scoreController.js";
import { createTeamTable } from "../controllers/teamController.js";

const router = express.Router();

router.route("/team/create-table").post( createTeamTable);

router.route("player/create-table").post(createPlayerTable)

router.route("/score/create-table").post(createScoreTable);

router.route('/score/all-scores').get(getAllScoreDatas)

export default router;
