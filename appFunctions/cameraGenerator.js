const axios = require('axios');
const generateNewCamera = () => {
    return {
        id: uuidv4(), 
        name: faker.random.words(),
        price: faker.random.number({ min: 100, max: 5000 }),
        description: faker.lorem.sentence()
    };
};

const intervalSeconds = 6000;

function addNewCameraPeriodically(PORT) {
    setInterval(() => {
        const Camera = generateNewCamera();
        axios.post(`http://localhost:${PORT}/cameras`, Camera)
            .then(response => {
                console.log('New entity added:', response.data);
            })
            .catch(error => {
                console.error('Error adding new entity:', error);
            });
    }, intervalSeconds * 1000);
}

module.exports = addNewCameraPeriodically;