const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const Camera = require('../model/Camera');

const intervalSeconds = 60000;

const generateNewCamera = () => {
    return {
        cameraId: uuidv4(), 
        cameraName: faker.random.words(),
        cameraPrice: faker.random.number({ min: 100, max: 5000 }),
        cameraDescription: faker.lorem.sentence()
    };
};

const createCamera = async (cameraData) => {
    try {
        // Assuming Camera model is already imported
        const camera = await Camera.create(cameraData);
        return camera;
    } catch (error) {
        console.error('Error creating camera:', error);
        throw new Error('Failed to create camera');
    }
};

function addNewCameraPeriodically() {
    setInterval(async () => {
        const camera = generateNewCamera();
        try {
            const createdCamera = await createCamera(camera);
            console.log('New camera created:', createdCamera);
        } catch (error) {
            console.error('Error adding new camera:', error);
        }
    }, intervalSeconds * 1000);
}

module.exports = addNewCameraPeriodically;
