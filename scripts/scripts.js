// import './sources';
// import moment from '../libs/moment';
const decimal = (time) => moment.startOf('d').add(time, 'h');

const interval = ({ start, end }) => {
  const f = 'h:mm A';
  return `${decimal(start).format(f)} - ${decimal(end).format(f)}`;
};

const filter = (item) => !!item;

const day = (d) => moment(d, 'dddd').format('ddd');

const format = ({ time, names }) => {
  if (names.length === 1) {
    return `${day(names[0])}:${time}`;
  }
  return `${day(names[0])} - ${day(names[names.length - 1])}: ${time}`;
};

const toHTML = (item) => `<li>${item}</li>`;
const append = (html, index) => (document.querySelector(`#box${index + 1}`).innerHTML = html);
function toIntervals({ order, days }) {
  let key = 0;
  let prev;
  return order.reduce((group, day) => {
    if (!days[day]) {
      key++;
      return group;
    }

    const time = interval(days[day]);

    if (prev != time) {
      key++;
      prev = time;
    }

    if (!group[key]) {
      group[key] = { names: [], time };
    }

    group[key].names.push(day);
    return group;
  }, []);
}

const convert = (src) => {
  return toIntervals(src).filter(filter).map(format).map(toHTML).join(' ');
};

[...source, ...source2, ...source3].map(convert).forEach(append());
