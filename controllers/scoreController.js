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
        console.log( typeof error);
        
        res.status(500).json(error)
    }
}

export const getAllScoreDatas = async(req,res)=>{
    const query = `
    SELECT
        ms.id,
        t.name AS team,
        t.id AS team_id,
        ms.score,
        ms.wickets,
        bp.name AS batsmen,
        bp.id AS batsmen_id,
        ms.target,
        ms.run_rate,
        ms.overs,
        bw.name AS bowler,
        bw.id AS bowler_id,
        ms.current_over_status
    FROM
        scores ms
    JOIN
        teams t ON ms.batting_team = t.id
    JOIN
        players bp ON ms.batsmen = bp.id
    JOIN
        players bw ON ms.bowler = bw.id;
`;

try {
    const data = await databasePool.query(query)

    if(!data){
        return res.status(200).json({message:"no scores yet!"})
    }
    const scoreDetails = {
        scores:data?.rows,
        page:1,
        pages:10,
    }
    res.status(200).json(scoreDetails)
} catch (error) {
    console.log(error);
    
    res.status(500).json(error)
}
}

export const createNewScore = async(req,res)=>{
    try {
        const {batting_team,score,wickets,batsmen,target,run_rate,overs,bowler,current_over_status} = req.body
        
    const data = await databasePool.query('INSERT INTO scores ( batting_team,score,wickets,batsmen,target,run_rate,overs,bowler,current_over_status) VALUES ($1, $2, $3, $4, $5 , $6, $7, $8, $9)',[batting_team,score,wickets,batsmen,target,run_rate,overs,bowler,current_over_status])
    res.status(200).json(data.rows)
    } catch (error) {
        console.log({error});
        res.status(500).json(error)
    }
}

export const updateScoreboard = async(req,res)=>{
    try {
        const {
            batting_team,
            score,
            wickets,
            batsmen,
            target,
            run_rate,
            overs,
            bowler,
            current_over_status
        } = req.body;
        const {id} = req.params

        const result = await databasePool.query(
            `UPDATE scores
             SET batting_team = $1,
                 score = $2,
                 wickets = $3,
                 batsmen = $4,
                 target = $5,
                 run_rate = $6,
                 overs = $7,
                 bowler = $8,
                 current_over_status = $9
             WHERE id = $10`,
            [
                batting_team,
                score,
                wickets,
                batsmen,
                target,
                run_rate,
                overs,
                bowler,
                current_over_status,
                id
            ]
        );
        res.json({ message: 'Update successfull'});
        
    } catch (error) {
        console.log({error});
        res.status(500).json(error)
    }
}