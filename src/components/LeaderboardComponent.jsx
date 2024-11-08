import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Top10Avatars from './Top10Avatars';

const LeaderboardComponent = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                // Step 1: Fetch leaderboard data to get top 10 users
                const response = await axios.get('https://api.monkeytype.com/leaderboards/xp/weekly');
                setLeaderboardData(response.data.data.slice(0, 10)); // Only top 10
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, []);

    return (
        <div style={{ backgroundColor: '#1c1c1c', padding: '20px' }}>
            <h2 style={{ color: '#ffffff', textAlign: 'center' }}>Top 10 User Avatars</h2>
            {leaderboardData.length > 0 ? (
                <Top10Avatars leaderboardData={leaderboardData} />
            ) : (
                <p style={{ color: '#ffffff', textAlign: 'center' }}>Loading...</p>
            )}
        </div>
    );
};

export default LeaderboardComponent;
