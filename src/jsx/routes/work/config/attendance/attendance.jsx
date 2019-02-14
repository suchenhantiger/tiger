import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const attendancePage = require('../../pages/attendance/AttendancePage');
        var reducer = require('../../reducers/attendance/attendanceReducer');
        injectReducer(store, {attendance: reducer});
        cb(null, attendancePage);
    }, 'attendancePage');
}
