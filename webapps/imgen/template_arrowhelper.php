<?php
  if (!@$length) $length = 135;

  $arrow = <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,8000"/>
END;
  $offset = $length - 20;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="12" stroke-linecap="butt" stroke-dasharray="{$offset},8000"/>
END;
  $offset = 8000 - $length + 64;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="45" stroke-linecap="butt" stroke-dasharray="3,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 63;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="44" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 60;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="42" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 57;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="40" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 54;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="38" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 51;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="36" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 48;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="34" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 45;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="32" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 42;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="30" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 39;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="28" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 36;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="26" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 33;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="24" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 30;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="22" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 27;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="20" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 24;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="18" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 21;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="16" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 18;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="14" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 15;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="12" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 12;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="10" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 9;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="8" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 6;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="6" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 3;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="4" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;
  $offset = 8000 - $length + 0;
  $arrow .= <<<END
      <path d="{$path}" fill="none" stroke="{$kleur}" stroke-width="2" stroke-linecap="butt" stroke-dasharray="4,8000" stroke-dashoffset="{$offset}"/>
END;


echo $arrow;
?>