<?php
  $g = <<<END
    <g transform="matrix(1 0 0 -1 {$x} 1365)">
      <path d="{$outlinepaths[1]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"  x="{$x}" y="0"/>
END;
  if ($nstrokes >= 2) $g .= <<<END
      <path d="{$outlinepaths[2]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"  x="{$x}" y="0"/>
END;
  if ($nstrokes >= 3) $g .= <<<END
      <path d="{$outlinepaths[3]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"  x="{$x}" y="0"/>
END;
  if ($nstrokes >= 4) $g .= <<<END
      <path d="{$outlinepaths[4]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"  x="{$x}" y="0"/>
END;
  if ($nstrokes >= 5) $g .= <<<END
      <path d="{$outlinepaths[5]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"  x="{$x}" y="0"/>
END;

  

  $g .= <<<END
    </g>
END;

echo $g;
?>