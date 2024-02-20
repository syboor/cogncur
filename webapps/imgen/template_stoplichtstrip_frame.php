<?php

  $svg = <<<END
    <g transform="matrix(1 0 0 -1 {$x} 1365)">
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
      <path d="{$paths[$nstrokes]}" fill="none" stroke="{$kleuren[$nstrokes]}" stroke-width="63" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,8000"/>
END;

  $svg .= <<<END
    </g>
END;

echo $svg;
?>