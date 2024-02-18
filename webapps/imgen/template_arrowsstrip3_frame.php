<?php
  $g = <<<END
    <g transform="matrix(1 0 0 -1 {$x} 1365)">
      <path d="{$outlinepaths[1]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"/>
END;
  if ($nstrokes >= 2) $g .= <<<END
      <path d="{$outlinepaths[2]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"/>
END;
  if ($nstrokes >= 3) $g .= <<<END
      <path d="{$outlinepaths[3]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"/>
END;
  if ($nstrokes >= 4) $g .= <<<END
      <path d="{$outlinepaths[4]}" stroke="black" stroke-width="7" fill="{$kleuroutline}"/>
END;

  $g .= <<<END
      <path d="{$paths[1]}" fill="none" stroke="{$kleuroutline}" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
END;
  if ($nstrokes >= 2) $g .= <<<END
      <path d="{$paths[2]}" fill="none" stroke="{$kleuroutline}" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
END;
  if ($nstrokes >= 3) $g .= <<<END
      <path d="{$paths[3]}" fill="none" stroke="{$kleuroutline}" stroke-width="60" stroke-linecap="round" stroke-linejoin="round" />
END;
  if ($nstrokes >= 4) $g .= <<<END
      <path d="{$paths[4]}" fill="none" stroke="{$kleuroutline}" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"/>
END;  

  $g .= <<<END
      <path d="{$paths[1]}" fill="none" stroke="{$kleuren[1]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,44"/>
END;
  if ($nstrokes >= 2) $g .= <<<END
      <path d="{$paths[2]}" fill="none" stroke="{$kleuren[2]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="13,44"/>
END;
  if ($nstrokes >= 3) $g .= <<<END
      <path d="{$paths[3]}" fill="none" stroke="{$kleuren[3]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,46"/>
END;
  if ($nstrokes >= 4) $g .= <<<END
      <path d="{$paths[4]}" fill="none" stroke="{$kleuren[4]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="12,45"/>
END;  

  $g .= inc('template_arrowhelper.php', ['path' => $paths[$nstrokes], 'kleur' => $kleuren[$nstrokes], 'length' => $covered_arrow_lengths[$nstrokes]]);

  $g .= <<<END
    </g>
END;

echo $g;
?>