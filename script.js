const main = document.querySelector('main');
const count = document.querySelector('#count');
const amount = document.querySelector('#amount');
const selectFilm = document.querySelector('#movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculate();

main.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('reserved')
  ) {
    e.target.classList.toggle('selected');
    calculate();
  }
});

selectFilm.addEventListener('change', (e) => {
  calculate();
});

function calculate() {
  const selectedSeats = main.querySelectorAll('.seat.selected');
  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach((seat) => {
    selectedSeatsArr.push(seat);
  });
  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  let selectedSeatIndex = selectedSeatsArr.map((seat) => {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length;
  count.innerHTML = selectedSeatCount;
  amount.innerHTML = selectedSeatCount * selectFilm.value;

  saveToLocalStorage(selectedSeatIndex);
}

function saveToLocalStorage(index) {
  localStorage.setItem('selectedSeats', JSON.stringify(index));
  localStorage.setItem('selectedMovieIndex', selectFilm.selectedIndex);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = JSON.parse(
    localStorage.getItem('selectedMovieIndex')
  );

  if (selectedMovieIndex != null) {
    selectFilm.selectedIndex = selectedMovieIndex;
  }
}
