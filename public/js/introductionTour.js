
let startTour = null;
$(document).ready(() => {
  const intro = introJs();

  intro.setOptions({
    tooltipClass: 'tour-modal'
  });

  startTour = () => {
    intro.start();
  };
  
});