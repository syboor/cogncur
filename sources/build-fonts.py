### IMPORTANT NOTE
#
# The last 4 rules of the 'calt - connections between letters' table should be:
# 
# | lc @<start-continued> | lc
# | uc @<start-continued> | lc
# | lc @<start-alone> |
# | uc @<start-alone> |
#
# However, these rules crash Fontforge. To mitigate this, a the back class 'space' is added in front of these four rules.
# Therefore, just before building the ttf fonts (below), change the existing rules to delete the 'space' backclass.
# Then build the fonts.
# Then change it back if you want to continue using Fontforge.

### Create fonts
import fontforge;
font = fontforge.activeFont();

font.fontname = 'CogncurOblique';
font.familyname = font.fullname = 'Cogncur Oblique';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncuroblique.ttf', layer='GSlOutl');

font.fontname = 'CogncurCalligraphic';
font.familyname = font.fullname = 'Cogncur Calligraphic';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncurcall.ttf', layer='GCall');

font.fontname = 'CogncurVertical';
font.familyname = font.fullname = 'Cogncur Vertical';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncurvertical.ttf', layer='GOutline');

font.fontname = 'Cogncur';
font.familyname = font.fullname = 'Cogncur Regular';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncur.ttf', layer='GRegOutl');

font.fontname = 'CogncurObliqueStartDots';
font.familyname = font.fullname = 'Cogncur Oblique StartDots';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncurobliquestartdots.ttf', layer='GSlStartDot');

font.fontname = 'CogncurVerticalStartDots';
font.familyname = font.fullname = 'Cogncur Vertical StartDots';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncurverticalstartdots.ttf', layer='GStartDot');

font.fontname = 'CogncurStartDots';
font.familyname = font.fullname = 'Cogncur Regular StartDots';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncurstartdots.ttf', layer='GRegStartDot');