import { databasePool } from "../config/config.js";

export const createTeamTable = async (req, res) => {
  try {
   const data =  await databasePool.query(`CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)`);
console.log(data);

    res.status(200).json({ message: "successfully created new team!" });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const createNewTeam = async(req,res)=>{
  try {
    const {name} = req.body;
    const data = await databasePool.query(`INSERT INTO teams (name)  VALUES($1)`,[name])
    res.status(200).json(data.rows)
  } catch (error) {
    res.status(500).json(error);
  }
}
