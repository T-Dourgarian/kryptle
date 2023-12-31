import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/joy/Stack';
import { Table, Typography } from '@mui/joy';
import { fetchLeaderboardData } from '../../util/ApiUtil';
import { Formatter } from '../../util/Formatter';
import { Button } from '@mui/joy';


function LeaderboardTable() {
	const dispatch = useDispatch();
    const [leaderboardData, setLeaderboardData] = useState(null);
    const userId = useSelector(state => state.user.userId)

    const getLeaderboardData = async(orderBy) => {
        const data = await fetchLeaderboardData(orderBy);

        setLeaderboardData(data);
    }

    useEffect(() => {
        getLeaderboardData('avg_solve_time');
    }, [])

    const headerCellStyle = {
        color: '#f3f3f3',
        textAlign: 'center'
    }

    const dataCellStyle = {
        textAlign: 'center'
    }

    const headerButtonStyleObj = {
		color: '#f3f3f3',
		width: {
            xs:'70px',
            sm: '95px',
            md: '120px',
        },
		borderRadius: '20px',
		':hover': {
			backgroundColor: '#315A6B',
			boxShadow: '0px 15px 34px 5px rgba(54,54,54,0.32)'
		},
		borderColor: '#f3f3f3',
        fontSize: {
            xs:'8px',
            sm: '10px',
            md: '12px'
        }
	}


  return (
    <Table
        size='sm'
        variant='soft'
        sx={{
            width: {
                xs:'95%',
                md:'900px'
            },
            color:'#f3f3f3',
            borderRadius:2,
            backgroundColor:'#315A6B',
            borderRadius:10
        }}
    >
        <thead >
            <tr >    
                <th style={headerCellStyle}>
                    Username
                </th>
                <th style={headerCellStyle}>
                    <Button 
                        sx={headerButtonStyleObj}
                        variant='outlined'
                        onClick={() => getLeaderboardData('avg_solve_time')}
                    >Avg Solve Time</Button>
                </th>
                <th style={headerCellStyle}>
                <Button 
                        sx={headerButtonStyleObj}
                        variant='outlined'
                        onClick={() => getLeaderboardData('total_solves_unique')}
                    >Unique Solves</Button>
                </th>
                <th style={headerCellStyle}>
                    <Button 
                        sx={headerButtonStyleObj}
                        variant='outlined'
                        onClick={() => getLeaderboardData('total_solves')}
                    >Total Solves</Button>
                </th>
                <th style={headerCellStyle}>
                    <Button 
                        sx={headerButtonStyleObj}
                        variant='outlined'
                        onClick={() => getLeaderboardData('daily_streak')}
                    >Daily Streak</Button>
                </th>
            </tr>
        </thead>
        <tbody>
            {
                leaderboardData &&
                leaderboardData.map((n,i) => 
                    <tr key={i}>
                        <td style={dataCellStyle}>{n.users.username}</td>
                        <td style={dataCellStyle}>{Formatter.getFormattedAverageTime(n.avg_solve_time)}</td>
                        <td style={dataCellStyle}>{n.total_solves_unique}</td>
                        <td style={dataCellStyle}>{n.total_solves}</td>
                        <td style={dataCellStyle}>{n.daily_streak}</td>
                    </tr>
                )  
            }
        </tbody>
    </Table>
  );
}

export default LeaderboardTable;
