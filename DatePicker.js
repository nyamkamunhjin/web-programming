// var datePicker = new DatePicker('div1', function (id, fixedDate) {
//   console.log(
//     'DatePicker with id',
//     id,
//     'selected date:',
//     fixedDate.month + '/' + fixedDate.day + '/' + fixedDate.year
//   );
// });
// datePicker.render(new Date('July 4, 1776'));

class DatePicker {
  // id: div id, fixedDate: {month: 1, day: 30, year: 2016}
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.date = {
      month: null,
      day: null,
      year: null,
    };
  }

  render(date) {
    const element = document.getElementById(this.id);

    this.date = {
      month: date.getMonth(),
      day: date.getDate(),
      year: date.getFullYear(),
    };

    console.log(this.getDaysInMonth(this.date));

    this.callback(this.id, this.date);

    element.innerHTML = '<table></table>';
  }

  getDaysInMonth(date) {
    return new Date(date.year, date.month, 0).getDate();
  }
}
