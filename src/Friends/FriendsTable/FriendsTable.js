import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsData } from '../../util/ApiUtil';
// import { updateUserStatsData } from '../../redux/UserSlice';
import { Formatter } from '../../util/Formatter';
import { Box, Card, Stack, Typography, Table } from '@mui/joy';
import {
    headerCellStyle,
    dataCellStyle,
} from '../../util/styles/table'

function FriendsTable() {
	const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.userId);
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        fetchFriendsData();
    }, [])

    const fetchFriendsData = async () => {    
        const friends = await getFriendsData();
        setFriends(friends);
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
        <thead>
            <tr>
                <th style={headerCellStyle}>Username</th>
                <th style={headerCellStyle}>Avg Solve Time</th>
                <th style={headerCellStyle}>Total Solves</th>
                <th style={headerCellStyle}>Daily Streak</th>
                <th style={headerCellStyle}>Today's Solution</th>
                <th style={headerCellStyle}>Solution Time</th>
            </tr>
        </thead>
        <tbody>
            {
                friends && friends.map((f,i) => 
                    <tr key={i}>
                        <td style={dataCellStyle}>
                            { f.username }
                        </td>
                        <td style={dataCellStyle}>
                            { f.avg_solve_time }
                        </td>
                        <td style={dataCellStyle}>
                            { f.total_solves_unique }
                        </td>
                        <td style={dataCellStyle}>
                            { f.daily_streak }
                        </td>
                        <td style={dataCellStyle}>
                            { f.today_solution }
                        </td>
                        <td style={dataCellStyle}>
                            { Formatter.getFormattedTime(f.today_solution_seconds) }
                        </td>
                    </tr>
                )
            }
        </tbody>
    </Table>
  );
}

export default FriendsTable;
