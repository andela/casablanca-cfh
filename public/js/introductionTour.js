/* global introJs */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "startTour" }] */

let startTour = null; /* eslint-disable-line */
$(document).ready(() => {
  const intro = introJs(); /* eslint-disable-line */

  intro.setOptions({
    tooltipClass: 'tour-modal'
  });

  startTour = () => {
    intro.start();
  };
});
