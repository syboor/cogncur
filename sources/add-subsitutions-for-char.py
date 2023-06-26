# This scripts adds a new character to all the "multiple substitution" tables.
# You still need to add it the the match classes and back classes of the contextual alternates table.
# Note: this is only for lowercase letters. Uppercase letters only need to be added to 1 substitution table: stand-alone.

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
#add_subs('s1', 's1', 'ces');
#add_subs('germandbls', 'i', 'cegermandbls');
#add_subs('t1', 't1', 'cet1');
#add_subs('ae', 'a', 'cee');
add_subs('oe', 'o', 'cee');

#add_subs('acaron', 'a', 'cen');
#add_subs('ecaron', 'e', 'cee');
#add_subs('icaron', 'i', 'cen');
#add_subs('ocaron', 'o', 'ceo');
#add_subs('ucaron', 'i', 'cen');
#add_subs('scaron', 's', 'ces');
#add_subs('zcaron', 'z', 'ceq');
#add_subs('s1caron', 's1', 'ces');
#add_subs('z1caron', 'z1', 'ceq');

#add_subs('atilde', 'a', 'cen');
#add_subs('ntilde', 'n', 'cen');
#add_subs('etilde', 'e', 'cee');
#add_subs('otilde', 'o', 'ceo');
#add_subs('utilde', 'i', 'cen');
#add_subs('itilde', 'i', 'cen');

#add_subs('ygrave', 'y', 'ceg');
#add_subs('yacute', 'y', 'ceg');
#add_subs('ycircumflex', 'y', 'ceg');
#add_subs('ytilde', 'y', 'ceg');

#add_subs('y1grave', 'y1', 'ceg');
#add_subs('y1acute', 'y1', 'ceg');
#add_subs('y1circumflex', 'y1', 'ceg');
#add_subs('y1tilde', 'y1', 'ceg');

add_subs('adieresis', 'a', 'cen');
add_subs('aring', 'a', 'cen');
add_subs('amacron', 'a', 'cen');
add_subs('abreve', 'a', 'cen');

add_subs('edieresis', 'e', 'cee');
add_subs('emacron', 'e', 'cee');
add_subs('ebreve', 'e', 'cee');

add_subs('idieresis', 'i', 'cen');
add_subs('imacron', 'i', 'cen');
add_subs('ibreve', 'i', 'cen');

add_subs('odieresis', 'o', 'ceo');
add_subs('omacron', 'o', 'ceo');
add_subs('obreve', 'o', 'ceo');

add_subs('udieresis', 'i', 'cen');
add_subs('uring', 'i', 'cen');
add_subs('umacron', 'i', 'cen');
add_subs('ubreve', 'i', 'cen');

add_subs('ydieresis', 'n', 'ceg');
add_subs('ymacron', 'n', 'ceg');
add_subs('y1diaeresis', 'i', 'ceg');
add_subs('y1macron', 'i', 'ceg');

add_subs('ccedilla', 'o', 'cee');

# TODO oobreve eebreve oomacron eemacron\

add_subs('oobreve', 'o', 'ceo');
add_subs('oomacron', 'o', 'ceo');
add_subs('eebreve', 'e', 'cee');
add_subs('eemacron', 'e', 'cee');
add_subs('aabreve', 'a', 'cen');
add_subs('aamacron', 'a', 'cen');
add_subs('uubreve', 'i', 'cen');
add_subs('uumacron', 'i', 'cen');



