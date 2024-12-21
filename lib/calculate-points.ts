export const calculatePoints = (seconds: number) => {
    const MIN_THRESHOLD = 60; // 1 minute minimum
    const POINT_INTERVAL = 300; // 5 minutes = 1 point
    const MAX_POINTS = 10; // Max points cap

    if (seconds < MIN_THRESHOLD) {
        console.log("Time below threshold:", seconds);
        return 0;
    }

    // Award 1 point for time between 1-5 minutes
    if (seconds >= MIN_THRESHOLD && seconds < POINT_INTERVAL) {
        console.log("Awarding 1 point for time:", seconds);
        return 1;
    }

    const points = Math.ceil(seconds / POINT_INTERVAL);
    const cappedPoints = Math.min(points, MAX_POINTS);
    console.log("Final points calculated:", cappedPoints);
    return cappedPoints;
};