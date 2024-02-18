<?php
/* TODO: 
  - letter e en o, eerste 'frame' van a, d, g -> won't
  - letter M en W (langere pijlen)
  */
  $svg = <<<END
    <g transform="matrix(1 0 0 -1 {$margin_left} 1365)" class="lettershape-container">
      <path d="{$outlinepaths[1]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
      <path d="{$paths[1]}" fill="none" stroke="{$kleuren[1]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,45"/>
END;  
  $svg .= inc('template_arrowhelper.php', ['path' => $paths[1], 'kleur' => $kleuren[1], 'length' => $covered_arrow_lengths[1]]);



  if ($nstrokes >= 2) {
    $svg .= <<<END
      <path d="{$outlinepaths[2]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
      <path d="{$paths[2]}" fill="none" stroke="{$kleuren[2]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,45"/>
END;
    $svg .= inc('template_arrowhelper.php', ['path' => $paths[2], 'kleur' => $kleuren[2], 'length' => $covered_arrow_lengths[2]]);
  }

  if ($nstrokes >= 3) {
    $svg .= <<<END
      <path d="{$outlinepaths[3]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
      <path d="{$paths[3]}" fill="none" stroke="{$kleuren[3]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,45"/>
END;
    $svg .= inc('template_arrowhelper.php', ['path' => $paths[3], 'kleur' => $kleuren[3], 'length' => $covered_arrow_lengths[3]]);
  }

  if ($nstrokes >= 4) {
    $svg .= <<<END
      <path d="{$outlinepaths[4]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
      <path d="{$paths[4]}" fill="none" stroke="{$kleuren[4]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,45"/>
END;
    $svg .= inc('template_arrowhelper.php', ['path' => $paths[4], 'kleur' => $kleuren[4]]);
  }

  


  $svg .= <<<END
    </g>
END;

echo $svg;
?>