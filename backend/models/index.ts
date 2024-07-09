import Application from './application';
import Interview from './interview';
import User from './user';

User.hasMany(Application);
Application.belongsTo(User);

User.hasMany(Interview);
Interview.belongsTo(User);

Application.hasMany(Interview);
Interview.belongsTo(Application);

export { Application, Interview, User };
