import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Top10Avatars = ({ leaderboardData }) => {
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        const fetchAvatars = async () => {
            const avatarPromises = leaderboardData.map(async (user) => {
                try {
                    // Step 2: Fetch each user's profile to get the Discord avatar
                    const response = await axios.get(`https://api.monkeytype.com/users/${user.name}/profile`);
                    const { discordId, discordAvatar } = response.data;
                    const avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${discordAvatar}.webp?size=100`;
                    console.log(avatarUrl);
                    return { name: user.name, avatarUrl };
                } catch (error) {
                    console.error(`Failed to fetch profile for ${user.name}:`, error);
                    return { name: user.name, avatarUrl: null };
                }
            });

            const avatarData = await Promise.all(avatarPromises);
            setAvatars(avatarData);
        };

        fetchAvatars();
    }, [leaderboardData]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {avatars.map((user, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                    <img
                        src={user.avatarUrl || 'https://via.placeholder.com/50'}
                        alt={user.name}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            backgroundColor: '#2c2f33',
                        }}
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                    />
                    <p style={{ color: '#ffffff', fontSize: '12px' }}>{user.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Top10Avatars;
