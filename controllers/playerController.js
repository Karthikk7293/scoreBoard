import {  databasePool } from "../config/config.js"

export const createPlayerTable = async(req,res)=>{
   try {
   const data = await databasePool.query(`
      CREATE TABLE players  ( id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL, 
        batsman VARCHAR(20) CHECK (batsman IN ('striker', 'non-striker')),
        bowler BOOLEAN NOT NULL,
        team_id INTEGER REFERENCES teams(id))
        `);
        res.status(200).json("player table created successfully!")
   } catch (error) {
    res.status(500).json(error)
   }

}

export const createPlayers = async(req,res)=>{
   try {
    const playerDetails = req.body
    const data = await databasePool.query('INSERT INTO players (name, batsman,bowler,team_id) VALUES ($1, $2, $3, $4)',[...playerDetails])
    res.status(200).json(data.rows)
   } catch (error) {
    res.status(500).json(error)
   }
}
