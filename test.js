const os = require('os')


console.log(os.tmpdir())

// const {dummyJobs} = require('./src/data/dummyJobs')
// import { dummyJobs } from './src/data/dummyJobs'

const dummyJobs = [
    { _id: 1, title: 'Software Engineer', description: 'Join our dynamic team to develop cutting-edge software solutions.',company:'Google' },
    { _id: 2, title: 'Data Scientist', description: 'Work on complex data analytics projects using machine learning techniques.',company:'Facebook' },
    { _id: 3, title: 'UX/UI Designer', description: 'Create intuitive user interfaces and engaging user experiences.',company:'Amazon' },
    { _id: 4, title: 'Product Manager', description: 'Lead product development from concept to launch.',company:'Microsoft' },
    { _id: 5, title: 'Marketing Specialist', description: 'Develop and execute marketing strategies to promote our products.', company:'Apple' },
    { _id: 6, title: 'Sales Executive', description: 'Drive sales growth and build relationships with clients.', company:'Netflix' },
];


console.log((dummyJobs.filter((job) => job._id == 1))[0].company);


const data = {
    requirements:[1,2,3]
}

data.requirements.map((value) => {
    console.log(value);
})