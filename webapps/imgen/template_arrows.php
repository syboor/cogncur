<?php
/* 
  - WONT: letter e en o, eerste 'frame' van a, d, g
  - DONE: letter M en W (langere pijlen) 
  */
  $svg = <<<END
    <g transform="matrix(1 0 0 -1 {$margin_left} 1365)" class="lettershape-container">
      <path d="{$outlinepaths[1]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;

  $svg .= inc('template_arrowhelper.php', ['path' => $paths[1], 'kleur' => $kleuren[1], 'length' => $covered_arrow_lengths[1]]);

  if ($overlaps[1]) {
    $svg .= <<<END
      <path d="{$overlaps[1]}" fill="none" stroke="{$kleuroutline}" stroke-opacity=".6" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="{$outlinepaths[1]}" stroke="black" stroke-width="7" fill="none"/>
END;
  }

  if ($nstrokes >= 2) $svg .= <<<END
      <path d="{$outlinepaths[2]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 2) $svg .= inc('template_arrowhelper.php', ['path' => $paths[2], 'kleur' => $kleuren[2], 'length' => $covered_arrow_lengths[2]]);
  if ($overlaps[2]) {
    $svg .= <<<END
      <path d="{$overlaps[2]}" fill="none" stroke="{$kleuroutline}" stroke-opacity=".6" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="{$outlinepaths[2]}" stroke="black" stroke-width="7" fill="none"/>
END;
  }

  if ($nstrokes >= 3) $svg .= <<<END
      <path d="{$outlinepaths[3]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 3) $svg .= inc('template_arrowhelper.php', ['path' => $paths[3], 'kleur' => $kleuren[3], 'length' => $covered_arrow_lengths[3]]);
  if ($overlaps[3]) {
    $svg .= <<<END
      <path d="{$overlaps[3]}" fill="none" stroke="{$kleuroutline}" stroke-opacity=".6" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="{$outlinepaths[3]}" stroke="black" stroke-width="7" fill="none"/>
END;
  }

  if ($nstrokes >= 4) $svg .= <<<END
      <path d="{$outlinepaths[4]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 4) $svg .= inc('template_arrowhelper.php', ['path' => $paths[4], 'kleur' => $kleuren[4]]);
  if ($overlaps[4]) {
    $svg .= <<<END
      <path d="{$overlaps[4]}" fill="none" stroke="{$kleuroutline}" stroke-opacity=".6" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="{$outlinepaths[4]}" stroke="black" stroke-width="7" fill="none"/>
END;
  }

  if ($nstrokes >= 5) $svg .= <<<END
      <path d="{$outlinepaths[5]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 5) $svg .= inc('template_arrowhelper.php', ['path' => $paths[5], 'kleur' => $kleuren[5]]);
  if ($overlaps[5]) {
    $svg .= <<<END
      <path d="{$overlaps[5]}" fill="none" stroke="{$kleuroutline}" stroke-opacity=".6" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="{$outlinepaths[5]}" stroke="black" stroke-width="7" fill="none"/>
END;
  }

  


  $svg .= <<<END
    </g>
END;

echo $svg;
?>