##### Run this script from within FontForge with 'Execute script'.
##### Purpose: create ligatures starting with 'cs' entry strokes.
##### Reason: we need negative width for these strokes, but that's not possible
##### , and kerning with the 'space' character is also not supported in many applications.
##### Therefore, we need to 'absorb' these strokes into ligatures, and then correct the width
##### of those ligatures.


# HOWTO
# 0. Create an empty substiution table of type 'ligature substitution', feature 'rlig', and a subtable named 'fix-whitespace-when-not-using-entry-strokes-1'.
# 1. Wait until lowercase is completely finished, including accented characters. Check your 'start-continued-1' subtable for correctness and completeness.
# 2. Run this script while in GOutline layer and with Encoding > Compact disabled.
# 3. Select the glyphs just created and do Build Composite Glyph.
# 4. Check result.
# 5. Change to Skeleton layer, do Build Composite Glyph, and then Unlink Reference.
# 6. Do #5 also for Extra, ExtraCall and StartDot layers.
# 7. Go back to Goutline and do Unlink Reference. Open a glyph to check that NO layers have references.
# 8. Open teh 'derive layers script' and execute ONLY the bit for deriving the GOutline layer.
# 9. Open the glyphs in the Metric Window (in small group) and set the Left Bearing to 0.
# 10. After setting the Left Bearing, derive the other layers.
# 11. Exception: for j and dotlessj, set the left based on a connected 'ccgn' glyph

### NB with 'multiple substitution', we don't need this.

import fontforge;
import math;
font = fontforge.activeFont();

codepoint = 0xE801; # where to start putting all the special glyphs

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

# returns first available empty codepoint
def next_codepoint():
  global codepoint;
  glyphs = get_glyphs_by_codepoint();
  while (codepoint in glyphs):
    codepoint = codepoint + 1;
  return codepoint;

  

def create_ligature(part1, part2):
  global font;
  global codepoint;
  glyphs = get_glyphs();
  
  name = part1 + '_' + part2;
  if (name in glyphs):
    fontforge.logWarning('ligature ' + name + ' already exists');
  else:
    fontforge.logWarning('creating ligature: ' + name + ' at codepoint ' + hex(codepoint));
    
    # create ligature
    glyph = font.createChar(codepoint);
    glyph.clear();
    glyph.glyphname = name;
    glyph.addPosSub('fix-whitespace-when-not-using-entry-strokes-1', (part1, part2));
    glyph.unlinkRmOvrlpSave = 1;

    glyph.build();

    codepoint += 1;



#Loop over letters to find substitutions in the 'start-continued-1' table

for g in font.glyphs():
  if (g.getPosSub('start-continued-1')): 
    sub = g.getPosSub('start-continued-1')[0];
    entry = sub[2];
    letter = sub[3];
    if (entry[0:2] == 'cg'):
      newentry = 'cs'+entry[2:];
      create_ligature(newentry, letter);
    




# TODO: these ligatures still need to be added to the classes for contextual alternates
# Is there a way to construct (print) these classes from the substitution tables???

#############################################################################################
