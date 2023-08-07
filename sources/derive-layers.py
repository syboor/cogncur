# Run each script from within FontForge with 'Execute script'.

# TODO: do not skew the ~, underscore and u+203e (these are used for creating empty lines)

### Fill derived layers
### Note: this will only work on selected glyphs
import fontforge;
import math;
font = fontforge.activeFont();
glyph = fontforge.activeGlyph();

skew =  psMat.skew(15 * math.pi/180.0);
skew2 = psMat.skew(7.5 * math.pi/180.0);

def dontskew(glyph):
  if (glyph.glyphname == 'asciitilde' or glyph.glyphname == 'underscore' or glyph.glyphname == 'uni203E'):
    return 1;
  return 0;

for glyph in font.selection.byGlyphs:
  fontforge.logWarning(glyph.glyphname);

  # Create GOutline layer
  layer = glyph.layers['Skeleton'];
  layer.stroke('circular', 68);
  extra = glyph.layers['Extra'];
  glyph.layers['GOutline'] = layer + extra;

  # Create GSlOutl layer
  layer = glyph.layers['Skeleton'];
  if not(dontskew(glyph)):
    layer.transform(skew);
  ## TODO: can we add extrema to the layer? or do we need to loop over contours?
  layer.stroke('circular', 68);
  extra = glyph.layers['Extra'];
  if not(dontskew(glyph)):
    extra.transform(skew);
  glyph.layers['GSlOutl'] = layer + extra;

  # Create GRegOutl layer
  layer = glyph.layers['Skeleton'];
  if not(dontskew(glyph)):
    layer.transform(skew2);
  layer.stroke('circular', 68);
  extra = glyph.layers['Extra'];
  if not(dontskew(glyph)):
    extra.transform(skew2);
  glyph.layers['GRegOutl'] = layer + extra;

  # Create GEdged
  layer = glyph.layers['Skeleton'];
  layer.stroke('calligraphic', 136, 17, 45 * math.pi/180.0);
  extra = glyph.layers['ExtraEdged'];
  glyph.layers['GEdged'] = layer + extra;
  
  # Create GRegEdged
  layer = glyph.layers['Skeleton'];
  if not(dontskew(glyph)):
    layer.transform(skew2);
  layer.stroke('calligraphic', 136, 17, 45 * math.pi/180.0);
  extra = glyph.layers['ExtraEdged'];
  if not(dontskew(glyph)):
    extra.transform(skew2);
  glyph.layers['GRegEdged'] = layer + extra;

  # Create GStartDot layer
  layer = glyph.layers['StartDot'];
  layer.stroke('circular', 102);
  glyph.layers['GStartDot'] = layer;

  # Create GSlStartDot layer
  layer = glyph.layers['StartDot'];
  if not(dontskew(glyph)):
    layer.transform(skew);
  layer.stroke('circular', 102);
  glyph.layers['GSlStartDot'] = layer;

  # Create GRegStartDot layer
  layer = glyph.layers['StartDot'];
  if not(dontskew(glyph)):
    layer.transform(skew2);
  layer.stroke('circular', 102);
  glyph.layers['GRegStartDot'] = layer;

