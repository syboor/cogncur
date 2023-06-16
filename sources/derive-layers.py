# Run each script from within FontForge with 'Execute script'.

### Fill derived layers
### Note: this will only work on selected glyphs
import fontforge;
import math;
font = fontforge.activeFont();
glyph = fontforge.activeGlyph();

skew =  psMat.skew(15 * math.pi/180.0);
skew2 = psMat.skew(7.5 * math.pi/180.0);

for glyph in font.selection.byGlyphs:
  fontforge.logWarning(glyph.glyphname);

  # Create GOutline layer
  layer = glyph.layers['Skeleton'];
  layer.stroke('circular', 68);
  extra = glyph.layers['Extra'];
  glyph.layers['GOutline'] = layer + extra;
  
  # Create GFlat layer
  flat = glyph.layers['GOutline'];
  flat.removeOverlap();
  # Todo: remove references. But how? 
  glyph.layers['GFlat'] = flat;

  # Create GSlOutl layer
  layer = glyph.layers['Skeleton'];
  layer.transform(skew);
  ## TODO: can we add extrema to the layer? or do we need to loop over contours?
  layer.stroke('circular', 68);
  extra = glyph.layers['Extra'];
  extra.transform(skew);
  glyph.layers['GSlOutl'] = layer + extra;

  # Create GRegOutl layer
  layer = glyph.layers['Skeleton'];
  layer.transform(skew2);
  layer.stroke('circular', 68);
  extra = glyph.layers['Extra'];
  extra.transform(skew2);
  glyph.layers['GRegOutl'] = layer + extra;

  # Create GCall
  layer = glyph.layers['Skeleton'];
  layer.stroke('calligraphic', 136, 34, 45 * math.pi/180.0);
  extra = glyph.layers['ExtraCall'];
  glyph.layers['GCall'] = layer + extra;




