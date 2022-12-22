import Job from './job';
import Session from './session';
import User from './user';

User.hasMany(Job);
Job.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

export { Job, User, Session };
