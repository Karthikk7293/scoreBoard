import { databasePool } from "../config/config.js";

export const createScoreTable = async(req,res)=>{
    try {
        await databasePool.query(
          `CREATE TABLE scores ( id SERIAL PRIMARY KEY,
          batting_team INTEGER REFERENCES teams(id),
          score INTEGER NOT NULL,
          wickets INTEGER NOT NULL,
          batsmen INTEGER REFERENCES players(id),
          target INTEGER,
          run_rate REAL,
          overs INTEGER,
          bowler INTEGER REFERENCES players(id),
          current_over_status VARCHAR(255))`
          );
          res.status(200).json({ message: "Successfully created scores table" });
    } catch (error) {
        res.status(500).json(error)
    }
}
export const getAllScoreDatas = async(req,res)=>{
try {
    const data = await pool.query('SELECT * FROM scroes')
    res.status(200).json({scores:data.rows})
} catch (error) {
    res.status(500).json(error)
}
}

export const createNewScoreBoard = async(req,res)=>{
    try {
        const scoreDetails = req.body
    const data = await databasePool.query('INSERT INTO scores ( bating_team,score,wickets,batsman,target,run_rate,overs,bowler,current_over_status) VALUES ($1, $2, $3, $4, $5 , $6, $7, $8, $9)',[...scoreDetails])
    res.status(200).json(data.rows)
    } catch (error) {
        res.status(500).json(error)
    }
}
