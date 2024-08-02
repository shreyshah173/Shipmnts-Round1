const Road = require('../models/Road');
const Location = require('../models/Location');

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        this.values.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    isEmpty() {
        return this.values.length === 0;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

const calculateEstimatedTime = (path, roads) => {
    let totalDistance = 0;
    let totalWeight = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        const road = roads.find(
            r => (r.start_location_id.toString() === start && r.end_location_id.toString() === end) ||
                 (r.start_location_id.toString() === end && r.end_location_id.toString() === start)
        );

        if (!road) {
            console.error('Missing road between', start, 'and', end);
            continue;
        }

        totalDistance += road.distance;

        let weight = 1;
        switch (road.traffic_condition) {
            case 'moderate':
                weight = 1.5;
                break;
            case 'heavy':
                weight = 2;
                break;
        }

        totalWeight += road.distance * weight;
    }

    return Math.round(totalWeight / totalDistance * 10); // Simplified calculation for estimated time
};

exports.calculateShortestPath = async (req, res) => {
    try {
        const { start_location_id, end_location_id } = req.body; // Changed to req.query

        if (!start_location_id || !end_location_id) {
            return res.status(400).json({ message: 'start_location_id and end_location_id are required' });
        }

        const roads = await Road.find();

        console.log('Roads:', roads);

        const adjacencyList = {};
        roads.forEach(road => {
            if (!road.start_location_id || !road.end_location_id) {
                console.error('Missing location in road:', road);
                return;
            }

            const startId = road.start_location_id.toString();
            const endId = road.end_location_id.toString();

            console.log('Start ID:', startId);
            console.log('End ID:', endId);

            if (!adjacencyList[startId]) adjacencyList[startId] = [];
            if (!adjacencyList[endId]) adjacencyList[endId] = [];

            adjacencyList[startId].push({ id: endId, distance: road.distance, traffic_condition: road.traffic_condition });
            adjacencyList[endId].push({ id: startId, distance: road.distance, traffic_condition: road.traffic_condition });
        });

        console.log('Adjacency List:', adjacencyList);

        if (!adjacencyList[start_location_id] || !adjacencyList[end_location_id]) {
            return res.status(404).json({ message: 'One or both locations not found in roads' });
        }

        const distances = {};
        const previous = {};
        const pq = new PriorityQueue();

        Object.keys(adjacencyList).forEach(locationId => {
            distances[locationId] = Infinity;
            previous[locationId] = null;
        });

        distances[start_location_id] = 0;
        pq.enqueue(start_location_id, 0);

        while (!pq.isEmpty()) {
            const { value: currentLocation } = pq.dequeue();

            if (currentLocation === end_location_id) {
                const path = [];
                let current = end_location_id;

                while (current) {
                    path.unshift(current);
                    current = previous[current];
                }

                const total_distance = distances[end_location_id];
                const estimated_time = calculateEstimatedTime(path, roads);

                return res.status(200).json({ path, total_distance, estimated_time });
            }

            adjacencyList[currentLocation].forEach(neighbor => {
                const alt = distances[currentLocation] + neighbor.distance;
                if (alt < distances[neighbor.id]) {
                    distances[neighbor.id] = alt;
                    previous[neighbor.id] = currentLocation;
                    pq.enqueue(neighbor.id, alt);
                }
            });
        }

        res.status(404).json({ message: 'Path not found' });
    } catch (error) {
        console.error('Error in calculating shortest path:', error);
        res.status(500).json({ message: error.message });
    }
};
