# BUILDING THE FONTS
# When building the fonts, you need to make a few changes to the Lookups. You should be careful NOT to save these changes!
# 
# Procedure for building the fonts:
# 1. Update versions numbers and font log.
# 2. Save.
# 3. Delete all lookups starting with the ms- suffix (multiple substitution).
# 4. Change the metadata of the ss-calt lookup and add the 'calt' feature (for all languages, all scripts).
# 5. Test the 'calt' feature in the Metrics window.
# 6. Close the Metrics window (FontForge may crash if you do step 5 with the Metrics window open).
# 7. Open the subtable of the ss-calt lookup, maximize your screen, and find the 4 rules that start with 'space'. Remove the 'space' bit, so that the rules become:
# | lc @<start-continued> | lc
# | uc @<start-continued> | lc
# | lc @<start-alone> |
# | uc @<start-alone> |
# 8. Execute the build-fonts.py script.
# 9. Exit without saving.  



### Create fonts
import fontforge;
font = fontforge.activeFont();

font.fontname = 'CogncurOblique';
font.familyname = font.fullname = 'Cogncur Oblique';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncuroblique.ttf', layer='GSlOutl');

font.fontname = 'CogncurEdgedVertical';
font.familyname = font.fullname = 'Cogncur Edged Vertical';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncuredgedvertical.ttf', layer='GEdged');

font.fontname = 'CogncurVertical';
font.familyname = font.fullname = 'Cogncur Vertical';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncurvertical.ttf', layer='GOutline');

font.fontname = 'CogncurEdged';
font.familyname = font.fullname = 'Cogncur Edged';
font.generate('D:/syboor.eu/httpdocs/fonts/cogncur/fonts/cogncuredged.ttf', layer='GRegEdged');

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