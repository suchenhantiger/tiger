import {injectReducer} from '../../../../store/reducers.jsx';
module.exports = (store)=>(nextState,cb)=>{
    require.ensure([], (require) => {
        const AttendanceCalendarPage = require('../../pages/attendance/AttendanceCalendarPage.jsx');
        var reducer = require('../../reducers/attendance/attendanceReducer.jsx');
        injectReducer(store, {
              attendance:reducer
        });
        cb(null, AttendanceCalendarPage)
    },'AttendanceCalendarPage')
}
