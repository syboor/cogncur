<?php

  $vars = get_defined_vars();

  $vars['nstrokes'] = 1;
  $vars['x'] = $frameoffset[1];
  $svg = inc('template_arrowsstrip3_frame.php', $vars);
  
  if ($nstrokes >= 2) {
    $vars['nstrokes'] = 2;
    $vars['x'] = $frameoffset[2];
    $svg .= inc('template_arrowsstrip3_frame.php', $vars);
  }
  
  if ($nstrokes >= 3) {
    $vars['nstrokes'] = 3;
    $vars['x'] = $frameoffset[3];
    $svg .= inc('template_arrowsstrip3_frame.php', $vars);
  }

  if ($nstrokes >= 4) {
    $vars['nstrokes'] = 4;
    $vars['x'] = $frameoffset[3];
    $svg .= inc('template_arrowsstrip3_frame.php', $vars);
  }
  
  echo $svg;
?>