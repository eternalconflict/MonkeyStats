import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './LeaderboardChart.css';

const LeaderboardChart = () => {
    const [chartData, setChartData] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(30); // Countdown starts from 30 seconds

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch('https://api.monkeytype.com/leaderboards/xp/weekly');
                const data = await response.json();

                // Extract top 10 players
                const top10 = data.data.slice(0, 10);

                // Prepare the data for Chart.js
                const colors = [
                    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300',
                    '#DAF7A6', '#581845', '#C70039', '#900C3F', '#FF5733'
                ];

                setChartData({
                    labels: top10.map((player) => player.name),
                    datasets: [
                        {
                            label: 'Total XP',
                            data: top10.map((player) => player.totalXp),
                            backgroundColor: colors,
                            borderColor: colors.map(color => color),
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        // Initial fetch of leaderboard data
        fetchLeaderboardData();

        // Set up interval to refresh leaderboard data every 30 seconds
        const fetchInterval = setInterval(fetchLeaderboardData, 30000);

        // Countdown timer that updates every second
        const countdownInterval = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime === 1) {
                    return 30; // Reset countdown when it reaches 1 second
                }
                return prevTime - 1;
            });
        }, 1000);

        // Clean up intervals on component unmount
        return () => {
            clearInterval(fetchInterval);
            clearInterval(countdownInterval);
        };
    }, []);

    if (!chartData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="chart-container dark-theme">
            <h2 style ={{color: 'yellow'}}>Weekly XP Leaderboard</h2>
            <p style={{color: 'red'}}>Next leaderboard update in {timeRemaining} seconds</p> {/* Countdown display */}
            <Bar 
                data={{
                    labels: chartData.labels,
                    datasets: chartData.datasets,
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            enabled: true, // Enable default tooltip
                        },
                        legend: {
                            labels: {
                                color: '#FFF',
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.2)',
                            },
                            ticks: {
                                color: '#FFF',
                            },
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.2)',
                            },
                            ticks: {
                                color: '#FFF',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default LeaderboardChart;
