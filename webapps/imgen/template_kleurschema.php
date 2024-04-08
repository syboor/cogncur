<?php
  $svg = <<<END
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
     viewBox="0 0 105 30">
    <g>
      <rect x="0" y="0" width="110" height="30"  stroke-width="1" fill="{$kleuroutline}"/>
      <rect x="5" y="5" width="20" height="20"  stroke-width="1" fill="{$kleuren[1]}"/>
      <rect x="30" y="5" width="20" height="20"  stroke-width="1" fill="{$kleuren[2]}"/>
      <rect x="55" y="5" width="20" height="20"  stroke-width="1" fill="{$kleuren[3]}"/>
      <rect x="80" y="5" width="20" height="20"  stroke-width="1" fill="{$kleuren[4]}"/>
    </g>
  </svg>
END;
echo $svg;