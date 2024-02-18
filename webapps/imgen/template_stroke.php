<?php

  $svg = <<<END
    <g transform="matrix(1 0 0 -1 {$margin_left} 1365)" class="lettershape-container">
      <path d="{$outlinepaths[1]}" />
END;
  if ($nstrokes >= 2) $svg .= <<<END
      <path d="{$outlinepaths[2]}" />
END;
  if ($nstrokes >= 3) $svg .= <<<END
      <path d="{$outlinepaths[3]}" />
END;
  if ($nstrokes >= 4) $svg .= <<<END
      <path d="{$outlinepaths[4]}" />
END;

  $svg .= <<<END
    </g>
END;

echo $svg;
?>