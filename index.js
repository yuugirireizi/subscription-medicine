/**
 * @fileoverview index
 */

(function (global) {
  let message = {
    today          : 'Today',
    oneWeekAgo     : '1 week ago',
    oneMonthAgo    : '1 month ago',
    dateRangeList  : [
      {id: 0, text: 'Today'},
      {id: 1, text: 'Yesterday'},
      {id: 2, text: 'Days ago'},
      {id: 3, text: 'Months ago'}
    ],
    todayRadioLabel: 'Today',
    weekRadioLabel : '1 week',
    monthRadioLabel: '1 month'
  };

  /**
   * @typedef DateFromTo
   * @property {string} fromDate
   * @property {string} toDate
   */
  /**
   * @typedef DateFromToRange
   * @property {number} fromDate
   * @property {number} toDate
   * @property {string} fromNumber
   * @property {string} toNumber
   */
  /**
   * @typedef Model
   * @property {number} mode
   * @property {DateFromTo} calendar
   * @property {DateFromToRange} dateRange
   */

  let vm = new Vue({
    el     : '#app',
    data   : {
      message: message,
      options: message.dateRangeList,
      model  : {
        mode     : 1,
        calendar : {
          fromDate: '',
          toDate  : ''
        },
        dateRange: {
          fromNumber: '',
          toNumber  : '',
          fromDate  : 0,
          toDate    : 0
        }
      }
    },
    methods: {
      clickTodayRadio      : function () {
        this.model = this.update(this.createDateRangePresetAction(
          0,
          '',
          0,
          ''
        ));
      },
      clickWeekRadio       : function () {
        this.model = this.update(this.createDateRangePresetAction(
          2,
          '7',
          0,
          ''
        ));
      },
      clickMonthRadio      : function () {
        this.model = this.update(this.createDateRangePresetAction(
          3,
          '1',
          0,
          ''
        ));
      },
      clickDateRangeRadio  : function () {
        this.model = this.update(this.createRadioAction(2, '', ''));
      },
      clickCalendarRadio   : function () {
        this.model = this.update(this.createRadioAction(1, '', ''));
      },
      clickFromCalendar    : function () {
        alert('カレンダー');
        this.model = this.update(this.createCalendarAction('yyyy/mm/dd', ''));
      },
      clickToCalendar      : function () {
        alert('カレンダー');
        this.model = this.update(this.createCalendarAction('', 'yyyy/mm/dd'));
      },
      clickFromDateRange   : function () {
        this.model = this.update(this.createDateRangeAction(this.model.dateRange.fromDate, this.model.dateRange.toDate));
      },
      clickToDateRange     : function () {
        this.model = this.update(this.createDateRangeAction(this.model.dateRange.fromDate, this.model.dateRange.toDate));
      },
      selectFromDateRange  : function (obj) {
        this.model = this.update(this.createDateRangeAction(obj.selectedIndex, this.model.dateRange.toDate));
      },
      selectToDateRange    : function (obj) {
        this.model = this.update(this.createDateRangeAction(this.model.dateRange.fromDate, obj.selectedIndex));
      },
      createRadioAction    : function (mode, from, to) {
        return {
          type: 'radioAction',
          mode: mode,
          from: from,
          to  : to
        };
      },
      createCalendarAction : function (from, to) {
        return {
          type: 'calendarAction',
          mode: 1,
          from: from,
          to  : to
        };
      },
      createDateRangeAction: function (from, to) {
        return {
          type      : 'dateRangeAction',
          mode      : 2,
          fromSelect: from,
          toSelect  : to
        };
      },
      createDateRangePresetAction: function (fromSelect, fromNumber, toSelect, toNumber) {
        return {
          type: 'dateRangePresetAction',
          mode: 2,
          fromSelect: fromSelect,
          toSelect: toSelect,
          fromNumber: fromNumber,
          toNumber: toNumber
        };
      },
      update               : function (action) {
        /**@type {Model} */
        let newModel = Object.assign({}, this.model);
        switch (action.type) {
          case 'radioAction':
            newModel.mode              = action.mode;
            newModel.calendar.fromDate = action.from;
            newModel.calendar.toDate   = action.to;
            break;
          case 'dateRangeAction':
            if (newModel.mode !== action.mode) {
              newModel.mode = action.mode;
            }
            newModel.calendar.fromDate  = '';
            newModel.calendar.toDate    = '';
            newModel.dateRange.fromDate = action.fromSelect;
            if (action.fromSelect <= 1) {
              newModel.dateRange.fromNumber = '';
            }
            newModel.dateRange.toDate = action.toSelect;
            if (action.toSelect <= 1) {
              newModel.dateRange.toNumber = '';
            }
            break;
          case 'calendarAction':
            if (newModel.mode !== action.mode) {
              newModel.mode              = action.mode;
              newModel.calendar.fromDate = '';
              newModel.calendar.toDate   = '';
            }
            if (action.from) newModel.calendar.fromDate = action.from;
            if (action.to) newModel.calendar.toDate = action.to;
            break;
          case 'dateRangePresetAction':
            if (newModel.mode !== action.mode) {
              newModel.mode = action.mode;
            }
            newModel.calendar.fromDate  = '';
            newModel.calendar.toDate    = '';
            newModel.dateRange.fromDate = action.fromSelect;
            if (action.fromSelect <= 1) {
              newModel.dateRange.fromNumber = '';
            } else {
              newModel.dateRange.fromNumber = action.fromNumber;
            }
            newModel.dateRange.toDate = action.toSelect;
            if (action.toSelect <= 1) {
              newModel.dateRange.toNumber = '';
            } else {
              newModel.dateRange.toNumber = action.toNumber;
            }
            break;
          default:
            break;
        }
        return newModel;
      }
    }
  });
})(window);

