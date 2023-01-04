import Job from './job';
import User from './user';

User.hasMany(Job);
Job.belongsTo(User);

export { Job, User };
