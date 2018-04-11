/* global introJs */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "startTour" }] */

let startTour;
$(document).ready(() => {
  const intro = introJs();

  intro.setOptions({
    tooltipClass: 'tour-modal'
  });

  startTour = () => {
    intro.start();
  };
});
