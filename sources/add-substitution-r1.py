# Add a new 'back class' for r2.
# This scripts fills thet ables 'after-r2-end ' and 'after-r2-continued' based on 
# the contents of the tables 'after-n1-***'.
# NB you need to create the tables first

import fontforge;
import math;
font = fontforge.activeFont();


# read glyphs into dictionary
def get_glyphs():
  global font;
  glyphs = {};
  for g in font.glyphs():
    if (g.glyphname != '' and g.glyphname[0:3] != 'uni'):
      glyphs[g.glyphname] = g;  
  return glyphs;

# read glyphs into dictionary
def get_glyphs_by_codepoint():
  global font;
  glyphs = {};
  for g in font.glyphs('encoding'):
    if (g.unicode > 0):
      glyphs[g.unicode] = g;
    #if (g.glyphname != '' and g.glyphname[0:3] != 'uni'):
    #  glyphs[g.glyphname] = g;  
  return glyphs;

# read 'after-n-end' table
glyphs = get_glyphs();
for glyphname in glyphs:
  glyph = glyphs[glyphname]
  tuples = glyph.getPosSub('after-n-end-1')
  if (tuples and tuples[0]):
    tuple = tuples[0]
    if (tuple and tuple[1] == 'MultSubs'):
      start_piece = 'ccr2' + tuple[2][3:]
      end_piece = tuple[4]
      # tuple[3] equals glyphname
      fontforge.logWarning(start + ' ' + tuple[3] + ' ' + tuple[4]);
      glyph.addPosSub('after-r2-continued-1', (start_piece, glyphname));
      glyph.addPosSub('after-r2-end-1', (start_piece, glyphname, end_piece));
      


