import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
let currentMonth,
currentDateCalendar,
currentYear,
firstDayInMonth,
lastDayInMonth,
numberOfDaysInMonth,
minDate;
let startWeek = null;
let endWeek = null;
let today = moment().startOf('day');
let initCalendarIsfinished = true;

@IonicPage()
@Component({
  selector: 'page-calendar-search',
  templateUrl: 'calendar-search.html',
})
export class CalendarSearchPage {
  arrivalFormat: any = false;
  departureFormat: any = false;
  currentDateCalendar: any = false;
  currentDate: any = false;
  daysArray: any;
  weekInMonth: any;
  calendarArray: any;
  selecting: any = false;
  selectedMinDate: any = false;
  selectedMaxDate: any = false;
  minNights: any = false;
  messageBottom: any = false;
  departure: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}


  setDaysCurrentMonth(firstDayInMonth, numberOfDaysInMonth) {
		for (var i = 0; i < numberOfDaysInMonth; i++) {
			var day = moment(firstDayInMonth).add(i, 'day');
			this.daysArray.push({
				date: day,
				disabled: day.isBefore(today)
			});
		}
	}

  setDaysBeforeMonth(firstDayInMonth, length) {
		for (var i = 1; i <= length; i++) {
			var day = moment(firstDayInMonth).subtract(i, 'day');
		 	this.daysArray.unshift({
				date: day,
				disabled: day.isBefore(today),
        hide: true
			});
		};
	}

  setDaysAfterMonth(lastDayInMonth, lengthArrayDay) {
			if (lengthArrayDay % 7 != 0) var length = (Math.floor(lengthArrayDay / 7) + 1) * 7 - lengthArrayDay;
			for (var i = 1; i <= length; i++){
					var day = moment(lastDayInMonth).add(i, 'day');
					this.daysArray.push({
						date: day,
						disabled: false,
            hide: true
					});
			}
	}

  createCalendar(date) {
      this.weekInMonth = [];
  		currentDateCalendar = moment(date).toDate();
  		currentMonth = currentDateCalendar.getMonth() + 1;
  		currentYear = currentDateCalendar.getFullYear();
  		firstDayInMonth = moment(currentDateCalendar).clone().startOf('month').startOf('day').toDate();
  		lastDayInMonth = moment(currentDateCalendar).clone().endOf('month').startOf('day').toDate();
  		numberOfDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  		this.daysArray = [];
  		if (firstDayInMonth.getDay() == 1) { // ================ if first day is Monday
  			this.setDaysCurrentMonth(firstDayInMonth, numberOfDaysInMonth);
  			this.setDaysAfterMonth(lastDayInMonth, this.daysArray.length);
  		} else if (firstDayInMonth.getDay() > 1) { // ============ if first day is not Monday or Sunday
  			this.setDaysBeforeMonth(firstDayInMonth, firstDayInMonth.getDay() - 1);
  			this.setDaysCurrentMonth(firstDayInMonth, numberOfDaysInMonth);
  			this.setDaysAfterMonth(lastDayInMonth, this.daysArray.length);
  		} else { // ============================================ if first day is Sunday
  			this.setDaysBeforeMonth(firstDayInMonth, 6);
  			this.setDaysCurrentMonth(firstDayInMonth, numberOfDaysInMonth);
  			this.setDaysAfterMonth(lastDayInMonth, this.daysArray.length);
  		}
  		var week = [];
  		for (var i = 0; i < this.daysArray.length; i++) {
  			if (week.length == 7){
  				this.weekInMonth.push({days: week});
  				week = [];
  				week.push(this.daysArray[i]);
  			}
  			else week.push(this.daysArray[i]);
  		}
  		this.weekInMonth.push({days: week});
  		week = [];
      return this.weekInMonth;
  	}


    initCalendar(date) {
      if (initCalendarIsfinished === false) return;
  		initCalendarIsfinished = false;
      let i = 0;
      this.calendarArray = [];
      var dateMonth = date.clone();
      while (i <= 12) {
        let month:any = {};
        month.weekInMonth = this.createCalendar(dateMonth);
        month.currentMonth = dateMonth.format('MMMM YYYY');
        this.calendarArray.push(month);
        dateMonth = date.add(1, 'M');
        i++;
      }
      initCalendarIsfinished = true;
    }

    daysSelected(day) {
      let currentDate = day.date.clone();
      minDate = this.selectedMinDate ? this.selectedMinDate.date.clone() : false;
      if (day.disabled) return;
      if (this.selecting) {
        minDate = this.minNights ? minDate.add(this.minNights - 1, 'day') : minDate;
        let minimalRange = this.minNights ? moment.range(this.selectedMinDate.date, minDate) : false;
        if (currentDate.isSameOrBefore(minDate)) {
          if (minimalRange && minimalRange.contains(currentDate) && this.minNights) {
              this.resetDate();
              this.selecting = false;
              // vm.infoBox.open = true;
              this.messageBottom = "Vous devez sélectionner une période qui doit être supérieur à " + this.minNights + " nuit" + (this.minNights > 1 ? "s." : ".") ;
              return
          }
          if (this.selectedMinDate && currentDate.isSame(this.selectedMinDate.date)) { // === If user select same day
            this.resetDate();
            this.selecting = false;
          } else { // ======================================== If user select date before MinDate
            this.selecting = true;

            this.selectedMinDate = {
              date: currentDate
            };

            this.departure = new Date(currentDate);
            this.arrivalFormat = this.selectedMinDate.date.format('DD MMM YYYY');
            this.departureFormat = false;
            delete this.selectedMaxDate;
            // if (!vm.search) vm.changeMaxDate({date: vm.departure});
          }
        }
        else { // ======================================== Select maxDate
          this.selectedMaxDate = {
            date: currentDate
          };

          this.selecting = false;
          this.departure = new Date(this.selectedMaxDate.date);
          this.departureFormat = this.selectedMaxDate.date.format('DD MMM YYYY');
        }
      } else { // ======================================== Select MinDate
        this.selecting = true;
        this.messageBottom = false;
        // vm.infoBox.open = false;
        this.selectedMinDate = {
          date: currentDate
        };
        this.arrivalFormat = this.selectedMinDate.date.format('DD MMM YYYY');
        // vm.changeMinDate({date: vm.arrival});
        delete this.selectedMaxDate;
        this.departureFormat = false;
        // else vm.changeMaxDate({date: vm.arrival});
      }
    }

    resetDate() {
      delete this.selectedMinDate;
      delete this.selectedMaxDate;
      this.departureFormat = false;
      this.arrivalFormat = false;
      this.selecting = false;
    }

    dayInSelectedRange(currentDate) {
      if (!this.selectedMinDate || !this.selectedMaxDate) return false;
      let range = moment.range(this.selectedMinDate.date, this.selectedMaxDate.date);
      return range.contains(currentDate);
    }

    saveDate() {
      this.viewCtrl.dismiss();
    }


    ionViewDidLoad() {
      currentDateCalendar = today.clone();
      this.currentDate = today.clone();
      this.initCalendar(currentDateCalendar);
    }

}
