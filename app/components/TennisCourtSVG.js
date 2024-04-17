import React from 'react';

const TennisCourtSVG = ({ handleImageClick }) => {
  return (
    <svg onClick={handleImageClick} width="480" height="900" style={{ border: '4px solid red' }}>
      {/* Background */}
      <rect x="0" y="450" width="480" height="450" fill="lightgray" />
      <rect x="0" y="0" width="480" height="450" fill="lightgray" />

      {/* Top half of the court */}
      <rect x="60" y="60" width="45" height="390" fill="lightblue" />
      <rect x="105" y="60" width="270" height="180" fill="lightblue" />
      <rect x="375" y="60" width="45" height="390" fill="lightblue" />
      <rect x="105" y="240" width="135" height="210" fill="lightblue" />
      <rect x="240" y="240" width="135" height="210" fill="lightblue" />

      {/* Bottom half of the court, mirrored from the top half */}
      <rect x="60" y="450" width="45" height="390" fill="lightblue" />
      <rect x="105" y="660" width="270" height="180" fill="lightblue" />
      <rect x="375" y="450" width="45" height="390" fill="lightblue" />
      <rect x="105" y="450" width="135" height="210" fill="lightblue" />
      <rect x="240" y="450" width="135" height="210" fill="lightblue" />

      {/* T lines and center lines */}
      <line x1="105" y1="240" x2="375" y2="240" stroke="white" stroke-width="2" />
      <line x1="105" y1="660" x2="375" y2="660" stroke="white" stroke-width="2" />
      <line x1="240" y1="240" x2="240" y2="450" stroke="white" stroke-width="2" />
      <line x1="240" y1="450" x2="240" y2="660" stroke="white" stroke-width="2" />

      {/* Alley lines */}
      <line x1="105" y1="60" x2="105" y2="450" stroke="white" stroke-width="2" />
      <line x1="375" y1="60" x2="375" y2="450" stroke="white" stroke-width="2" />
      <line x1="105" y1="450" x2="105" y2="840" stroke="white" stroke-width="2" />
      <line x1="375" y1="450" x2="375" y2="840" stroke="white" stroke-width="2" />

      {/* Outside alley lines */}
      <line x1="60" y1="60" x2="60" y2="450" stroke="white" stroke-width="2" />
      <line x1="420" y1="60" x2="420" y2="450" stroke="white" stroke-width="2" />
      <line x1="60" y1="840" x2="60" y2="450" stroke="white" stroke-width="2" />
      <line x1="420" y1="840" x2="420" y2="450" stroke="white" stroke-width="2" />

      {/* Top and Bottom lines */}
      <line x1="60" y1="60" x2="420" y2="60" stroke="white" stroke-width="2" />
      <line x1="60" y1="840" x2="420" y2="840" stroke="white" stroke-width="2" />

      {/* Net Line */}
      <line className="gray-hoverable" x1="30" y1="450" x2="450" y2="450" stroke="black" stroke-width="4" />

      <style>
        {`
          rect:hover { fill: green; }
          .gray-hoverable:hover { stroke: darkgray; }
        `}
      </style>
    </svg>
  );
}

export default TennisCourtSVG;


/*
 *  HTML version
 */

/*
<svg width="480" height="900" style="border: 4px solid red;">
<!-- Background out -->
<rect x="0" y="450" width="480" height="450" fill="lightgray" /> <!-- Top background -->
<rect x="0" y="0" width="480" height="450" fill="lightgray" /> <!-- Bottom background -->

<!-- Top half of the court -->
<rect x="60" y="60" width="45" height="390" fill="lightblue" /> <!-- Top left alley -->
<rect x="105" y="60" width="270" height="180" fill="lightblue" /> <!-- Top upper middle -->
<rect x="375" y="60" width="45" height="390" fill="lightblue" /> <!-- Top right alley -->
<rect x="105" y="240" width="135" height="210" fill="lightblue" /> <!-- Top left middle -->
<rect x="240" y="240" width="135" height="210" fill="lightblue" /> <!-- Top right middle -->

<!-- Bottom half of the court, mirrored from the top half -->
<rect x="60" y="450" width="45" height="390" fill="lightblue" /> <!-- Bottom left alley -->
<rect x="105" y="660" width="270" height="180" fill="lightblue" /> <!-- Bottom upper middle -->
<rect x="375" y="450" width="45" height="390" fill="lightblue" /> <!-- Bottom right alley -->
<rect x="105" y="450" width="135" height="210" fill="lightblue" /> <!-- Bottom left middle -->
<rect x="240" y="450" width="135" height="210" fill="lightblue" /> <!-- Bottom right middle -->

<!-- T lines -->
<line x1="105" y1="240" x2="375" y2="240" stroke="white" stroke-width="2" />
<line x1="105" y1="660" x2="375" y2="660" stroke="white" stroke-width="2" /> <!-- Mirrored T line -->
<line x1="240" y1="240" x2="240" y2="450" stroke="white" stroke-width="2" />
<line x1="240" y1="450" x2="240" y2="660" stroke="white" stroke-width="2" /> <!-- Mirrored center line -->

<!-- Alley lines -->
<line x1="105" y1="60" x2="105" y2="450" stroke="white" stroke-width="2" />
<line x1="375" y1="60" x2="375" y2="450" stroke="white" stroke-width="2" />
<line x1="105" y1="450" x2="105" y2="840" stroke="white" stroke-width="2" /> <!-- Mirrored alley line -->
<line x1="375" y1="450" x2="375" y2="840" stroke="white" stroke-width="2" /> <!-- Mirrored alley line -->

<line x1="60" y1="60" x2="60" y2="450" stroke="white" stroke-width="2" /> <!-- Top left outside alley -->
<line x1="420" y1="60" x2="420" y2="450" stroke="white" stroke-width="2" /> <!-- Top right outside alley -->
<line x1="60" y1="840" x2="60" y2="450" stroke="white" stroke-width="2" /> <!-- Bottom left outside alley -->
<line x1="420" y1="840" x2="420" y2="450" stroke="white" stroke-width="2" /> <!-- Bottom right outside alley -->

<!-- Top and Bottom lines -->
<line x1="60" y1="60" x2="420" y2="60" stroke="white" stroke-width="2" />
<line x1="60" y1="840" x2="420" y2="840" stroke="white" stroke-width="2" />

<!-- Net Line -->
<line class="gray-hoverable" x1="30" y1="450" x2="450" y2="450" stroke="black" stroke-width="4" />
<style>
    rect:hover { fill: green; }
    .gray-hoverable:hover { fill: darkgray; stroke: darkgray; }
</style>
</svg>
*/