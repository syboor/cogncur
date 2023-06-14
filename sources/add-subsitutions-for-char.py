# This scirpt helps you add a new character that does not require any new connections.
# I.e. accented characters.

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


def add_subs(glyphname, connects_as, end_piece):
  glyphs = get_glyphs();
  glyph = glyphs[glyphname];
  
  for left in ['n', 'e', 's', 'p', 'q', 'g', 'v', 'o', 't', 'A', 'B', 'O', 'F', 'P', 'I', 'N', 'f1', 'f4', 'q1', 'q2']:
    glyph.addPosSub('after-'+left+'-continued-1', ('cc'+ left + connects_as, glyphname));
    glyph.addPosSub('after-'+left+'-end-1', ('cc'+ left + connects_as, glyphname, end_piece));

  glyph.addPosSub('after-z-continued-1', ('ccq'+ connects_as, glyphname));
  glyph.addPosSub('after-z-end-1', ('ccq'+ connects_as, glyphname, end_piece));
  glyph.addPosSub('start-continued-1', ('cg'+ connects_as, glyphname));
  glyph.addPosSub('start-alone-1', ('cg'+ connects_as, glyphname, end_piece));
    

# How to add a new character in
add_subs('q1', 'a', 'ceq1');
add_subs('q2', 'a', 'ceq2');
add_subs('q3', 'a', 'ceq3');

# NB the character should still be added manually to the appropriate ww'calt' classes