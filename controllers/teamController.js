import { databasePool } from "../config/config.js";

export const createTeamTable = async (req, res) => {
  try {
    await databasePool.query(`CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)`);
    res.status(200).json({ message: "successfully created new team!" });
  } catch (error) {
    res.status(500).json(error);
  }
};
