<?php

/* This templates generates ONLY the arrow and not the letter. 
 * These arrows can be copy-pasted into Easel activities (after adding transparency)
 */

  $svg = <<<END
    <g transform="matrix(1 0 0 -1 {$margin_left} 1365)" class="lettershape-container">
END;


  $svg .= inc('template_arrowhelper.php', ['path' => $paths[1], 'kleur' => $kleuren[1]]);
  if ($nstrokes >= 2) $svg .= inc('template_arrowhelper.php', ['path' => $paths[2], 'kleur' => $kleuren[2]]);
  if ($nstrokes >= 3) $svg .= inc('template_arrowhelper.php', ['path' => $paths[3], 'kleur' => $kleuren[3]]);
  if ($nstrokes >= 4) $svg .= inc('template_arrowhelper.php', ['path' => $paths[4], 'kleur' => $kleuren[4]]);


  $svg .= <<<END
    </g>
END;

echo $svg;
?>