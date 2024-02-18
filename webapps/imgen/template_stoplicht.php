<?php

  $svg = <<<END
    <g transform="matrix(1 0 0 -1 {$margin_left} 1365)">
      <path d="{$outlinepaths[1]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 2) $svg .= <<<END
      <path d="{$outlinepaths[2]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 3) $svg .= <<<END
      <path d="{$outlinepaths[3]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;
  if ($nstrokes >= 4) $svg .= <<<END
      <path d="{$outlinepaths[4]}" stroke="black" stroke-width="7" fill="{$kleuroutline}" />
END;

  $svg .= <<<END
      <path d="{$paths[1]}" fill="none" stroke="{$kleuren[1]}" stroke-width="63" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,4000"/>
  END;

  if ($nstrokes >= 2) $svg .= <<<END
      <path d="{$paths[2]}" fill="none" stroke="{$kleuren[2]}" stroke-width="63" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,4000"/>
END;
  
  if ($nstrokes >= 3) $svg .= <<<END
      <path d="{$paths[3]}" fill="none" stroke="{$kleuren[3]}" stroke-width="63" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,4000"/>
END;

  if ($nstrokes >= 4) $svg .= <<<END
      <path d="{$paths[4]}" fill="none" stroke="{$kleuren[4]}" stroke-width="63" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,4000"/>
END;


  $svg .= <<<END
    </g>
END;

echo $svg;
?>