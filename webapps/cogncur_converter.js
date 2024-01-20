/* © 2023 Liesbeth Flobbe.
 */

var get_cogncur_converter = (function (the_settings, the_element) {
  var settings = {
    /* entrystrokes_variant:
        0 = entrystrokes from the baseline
        1 = a/c/d/g/o/q have no entry strokes. Other letters have entrystrokes from justb elow the midline. i/u/w have an entry stroke followed by a sharp angle.
        2 = N.I. like 1, but letters i/u/w don't have entry strokes at all, they start down from the midline. NB this also effects uppercase U, W, Y
     */
    entrystrokes: 0,
    
    /* initial ligatures: applies ONLY when entrystrokes >= 1
       0 = short entry strokes are a separate glyph; may cause excessive word spacing and unequal left alignment for some letters; styling the entry stroke is possible
       1 = short entry strokes are merged into the next letter through ligatures; correct word spacing and alignment, but styling the entry stroke (i.e. 'wordfade' feature) will not be possible
     */
    initial_ligatures: 1,
    
    /* exitstrokes:
        0 = many exit strokes
        1 = no exit strokes for s en p. If using print-like r, replaces the weird exit stroke for print-like r with a more print-like end.
     */
    exitstrokes: 0,
    
    /* t_variant:
        0 = doorverbonden t
        1 = moderne t, gebogen verbindingen
        2 = moderne t, rechte verbindingen
     */
    t_variant: 0,
    
    /* f_connection_variant:
        0 = f connects from the baseline
        1 = f connects from the midline
     */
    f_connection_variant: 0,

    /* q_connection_variant:
        0 = q connects from the baseline
        1 = q connects from the bottom
     */
    q_connection_variant: 0,

    /* fq_connection_variant:
        Combined setting for f_connection_variant and q_connection_variant.
        For compatibility with the stylistic sets.
     */
    fq_connection_variant: 0,
    
    /* f_continuity_variant:
        0 = f has a continuous stroke; it uses a loop to return to the point where the connection starts
        1 = f has a pencil lift
     */
    f_continuity_variant: 0,

    /* q_continuity_variant:
        0 = q has a continuous stroke; if the connection is from the baseline, it uses a loop to get there
        1 = q has a pencil lift (will always connect from the baseline, regardless of q_connection_variant setting)
     */
    q_continuity_variant: 0,

    /* fq_continuity_variant:
        Combined setting for f_continuity_variant and q_continuity_variant.
        For compatibility with the stylistic sets.
      */
    fq_continuity_variant: 0,

    /* s_variant:
        0 = s goes straight down
        1 = s has a belly
     */
    s_variant: 0,
    
    /* undercursves:
       0 = normal, straight connections
       1 = 'undercurves' towards i, u, j (and depending on other settings, also p, w, t, r, z
     */
    undercurves: 0,
    
    /* r_variant:
      0 = cursive r, ends at baseline
      1 = print-like r, ends at midline
      */
    r_variant: 0,
    
    /* rz_top_variant: (does not apply to print-like r)
        0 = wavy tops
        1 = pointy tops
     */
    rz_top_variant: 0,
    
    /* stick_variant:
        0 = sticks of d / p same length as loops
        1 = sticks shorter than loops
     */
    stick_variant: 0,

    /* uppercase_amn_variant:
        0 = German letters 
        1 = Dutch/American letters: proportionally enlarged lowercase cursive
        2 = Dutch/American letters: not-proportionally enlarged lowercase cursive
     */
    uppercase_amn_variant: 0,
    
    /* uppercase_amn_variant:
        0 = C, G, L start with entry loop
        1 = C, G, L do not start with entry loop
     */
    uppercase_cgl_variant: 0,
    
    /* ij_ligature
       0 = no ij ligature
       1 = ij ligature (required for Dutch language)
     */
    ij_ligature: 0,
    
    /* y_variant
       0 = y, Y and en ij start with curve (like n)
       1 = y en ij start sharp (like i); Y starts from the top line
     */
    y_variant: 0,
    
    /* w_variant
       0 = w starts sharp (like i)
       1 = w starts with a curve (like n)
     */
    w_variant: 0,
    
    /* p_curve_variant
       0 = p starts shart (like i)
       1 = p starts with a curve (like n)
     */
    p_curve_variant: 0,
    
    /* p_open_variant
       0 = p is closed
       1 = p is open (like n with a longer stick)
     */
    p_open_variant: 0,

    /* nodots:
     0 = all dots (i and j) and crossbars present
     1 = no dots (i and j) but still crossbars (t)
     2 = no dots (i and j) and no crossbars eiher
     */
    nodots: 0,
    
    /* smartquotes: 0
     0 = leave quotes as is (except that apostrophe will have a low and high position based on previous letter). 
         NB the font does not have 'straight' quotes. All quotes have either on 'opening' or 'closing' look. 
         This option is appropriate if your input already contains the correct non-ascii quotes, i.e. from MS Word. 
     1 = change ascii quotes into curly quotes, English style
     2 = change ascii quotes into curly quotes, old Dutch style: low opening quotes
     3 = change ascii quotes into curly quotes, German style: opening quotes will be low, closing quotes upside down
     4 = change ascii quotes into brackets
     NB2 While each option has a different look, the algorithm for distinguishing single closing quotes from apostrophes
     is the same, and 
     
     NB3 Regardless of which smartquotes option is chosen, the default 'low' apostrophe will be replaced 
     with a 'high' apostrope after tall glyphs. This 'high' apostrophe happens to be the 'single closing quote' glyph.
     */
     smartquotes: 0,
     
    /* numerals_tabular
     0 = no, proportional width
     1 = yes, tabular width
     */
     numerals_tabular: 0,

    /* numerals_tabular
     0 = yes, replace the space too
     1 = no, don't replace the space
     */
     numerals_tabular_dont_replace_space: 0,
     
    /* numerals_oldstyle
     0 = no, lining figures; all numerals have the same height
     1 = yes, oldstyle figures; numerals can 'hang' below the baseline
     */
     numerals_oldstyle: 0,


     // numeral 1: 0, 1, 2
     numeral_1_variant: 0,
     
     // numeral 2: 0, 1
     numeral_2_variant: 0,
     
     // numeral 3: 0, 1
     numeral_3_variant: 0,
     
     // numeral 4: 0, 1, 2, 3
     numeral_4_variant: 0,
     
     // numeral 7: 0, 1, 2, 3
     numeral_7_variant: 0,
     
     // numeral 8: 0, 1, 2
     numeral_8_variant: 0,
     
     // numeral 9: 0, 1
     numeral_9_variant: 0,
     
     // Use EITHER numeral_x_variant for each numeral, OR use numeral_variants_set1 & numberals_variants_set2 for groups of numerals (analogous to the stylistic sets)
     /* numerals_variant: 
        set1:       1 variant 1, 3 variant 1, 4 variant 1, 7 variant 1, 8 variant 1, 9 variant 1
        set2:       4 variant 2, 2 variant 1, 7 variant 2, 8 variant 2
        set1 & set2: 1 variant 1, 2 variant 3, 3 variant 1, 4 variant 3, 7 variant 3, 8 variant 2, 9 variant 1
      */
     numeral_variants_set1: 0,
     numeral_variants_set2: 0,
     
     /* standard ligatures: combine breve and macron accents over double vowels */
     standard_ligatures: 1 
     
  }
  
  var glyphs = {
    'space' : '\u0020',
    'exclam' : '\u0021',
    'quotedbl' : '\u0022',
    'numbersign' : '\u0023',
    'dollar' : '\u0024',
    'percent' : '\u0025',
    'ampersand' : '\u0026',
    'quotesingle' : '\u0027',
    'parenleft' : '\u0028',
    'parenright' : '\u0029',
    'asterisk' : '\u002a',
    'plus' : '\u002b',
    'comma' : '\u002c',
    'hyphen' : '\u002d',
    'period' : '\u002e',
    'slash' : '\u002f',
    'zero' : '\u0030',
    'one' : '\u0031',
    'two' : '\u0032',
    'three' : '\u0033',
    'four' : '\u0034',
    'five' : '\u0035',
    'six' : '\u0036',
    'seven' : '\u0037',
    'eight' : '\u0038',
    'nine' : '\u0039',
    'colon' : '\u003a',
    'semicolon' : '\u003b',
    'less' : '\u003c',
    'equal' : '\u003d',
    'greater' : '\u003e',
    'question' : '\u003f',
    'at' : '\u0040',
    'A' : '\u0041',
    'B' : '\u0042',
    'C' : '\u0043',
    'D' : '\u0044',
    'E' : '\u0045',
    'F' : '\u0046',
    'G' : '\u0047',
    'H' : '\u0048',
    'I' : '\u0049',
    'J' : '\u004a',
    'K' : '\u004b',
    'L' : '\u004c',
    'M' : '\u004d',
    'N' : '\u004e',
    'O' : '\u004f',
    'P' : '\u0050',
    'Q' : '\u0051',
    'R' : '\u0052',
    'S' : '\u0053',
    'T' : '\u0054',
    'U' : '\u0055',
    'V' : '\u0056',
    'W' : '\u0057',
    'X' : '\u0058',
    'Y' : '\u0059',
    'Z' : '\u005a',
    'bracketleft' : '\u005b',
    'backslash' : '\u005c',
    'bracketright' : '\u005d',
    'asciicircum' : '\u005e',
    'underscore' : '\u005f',
    'grave' : '\u0060',
    'a' : '\u0061',
    'b' : '\u0062',
    'c' : '\u0063',
    'd' : '\u0064',
    'e' : '\u0065',
    'f' : '\u0066',
    'g' : '\u0067',
    'h' : '\u0068',
    'i' : '\u0069',
    'j' : '\u006a',
    'k' : '\u006b',
    'l' : '\u006c',
    'm' : '\u006d',
    'n' : '\u006e',
    'o' : '\u006f',
    'p' : '\u0070',
    'q' : '\u0071',
    'r' : '\u0072',
    's' : '\u0073',
    't' : '\u0074',
    'u' : '\u0075',
    'v' : '\u0076',
    'w' : '\u0077',
    'x' : '\u0078',
    'y' : '\u0079',
    'z' : '\u007a',
    'braceleft' : '\u007b',
    'bar' : '\u007c',
    'braceright' : '\u007d',
    'asciitilde' : '\u007e',
    'exclamdown' : '\u00a1',
    'cent' : '\u00a2',
    'sterling' : '\u00a3',
    'currency' : '\u00a4',
    'yen' : '\u00a5',
    'brokenbar' : '\u00a6',
    'section' : '\u00a7',
    'dieresis' : '\u00a8',
    'copyright' : '\u00a9',
    'ordfeminine' : '\u00aa',
    'guillemotleft' : '\u00ab',
    'logicalnot' : '\u00ac',
    'registered' : '\u00ae',
    'degree' : '\u00b0',
    'plusminus' : '\u00b1',
    'uni00B2' : '\u00b2',
    'uni00B3' : '\u00b3',
    'acute' : '\u00b4',
    'mu' : '\u00b5',
    'periodcentered' : '\u00b7',
    'cedilla' : '\u00b8',
    'uni00B9' : '\u00b9',
    'ordmasculine' : '\u00ba',
    'guillemotright' : '\u00bb',
    'onequarter' : '\u00bc',
    'onehalf' : '\u00bd',
    'threequarters' : '\u00be',
    'questiondown' : '\u00bf',
    'Agrave' : '\u00c0',
    'Aacute' : '\u00c1',
    'Acircumflex' : '\u00c2',
    'Atilde' : '\u00c3',
    'Adieresis' : '\u00c4',
    'Aring' : '\u00c5',
    'AE' : '\u00c6',
    'Ccedilla' : '\u00c7',
    'Egrave' : '\u00c8',
    'Eacute' : '\u00c9',
    'Ecircumflex' : '\u00ca',
    'Edieresis' : '\u00cb',
    'Igrave' : '\u00cc',
    'Iacute' : '\u00cd',
    'Icircumflex' : '\u00ce',
    'Idieresis' : '\u00cf',
    'Ntilde' : '\u00d1',
    'Ograve' : '\u00d2',
    'Oacute' : '\u00d3',
    'Ocircumflex' : '\u00d4',
    'Otilde' : '\u00d5',
    'Odieresis' : '\u00d6',
    'multiply' : '\u00d7',
    'Oslash' : '\u00d8',
    'Ugrave' : '\u00d9',
    'Uacute' : '\u00da',
    'Ucircumflex' : '\u00db',
    'Udieresis' : '\u00dc',
    'Yacute' : '\u00dd',
    'germandbls' : '\u00df',
    'agrave' : '\u00e0',
    'aacute' : '\u00e1',
    'acircumflex' : '\u00e2',
    'atilde' : '\u00e3',
    'adieresis' : '\u00e4',
    'aring' : '\u00e5',
    'ae' : '\u00e6',
    'ccedilla' : '\u00e7',
    'egrave' : '\u00e8',
    'eacute' : '\u00e9',
    'ecircumflex' : '\u00ea',
    'edieresis' : '\u00eb',
    'igrave' : '\u00ec',
    'iacute' : '\u00ed',
    'icircumflex' : '\u00ee',
    'idieresis' : '\u00ef',
    'ntilde' : '\u00f1',
    'ograve' : '\u00f2',
    'oacute' : '\u00f3',
    'ocircumflex' : '\u00f4',
    'otilde' : '\u00f5',
    'odieresis' : '\u00f6',
    'divide' : '\u00f7',
    'oslash' : '\u00f8',
    'ugrave' : '\u00f9',
    'uacute' : '\u00fa',
    'ucircumflex' : '\u00fb',
    'udieresis' : '\u00fc',
    'yacute' : '\u00fd',
    'ydieresis' : '\u00ff',
    'Amacron' : '\u0100',
    'amacron' : '\u0101',
    'Abreve' : '\u0102',
    'abreve' : '\u0103',
    'Emacron' : '\u0112',
    'emacron' : '\u0113',
    'Ebreve' : '\u0114',
    'ebreve' : '\u0115',
    'ecaron' : '\u011b',
    'itilde' : '\u0129',
    'Imacron' : '\u012a',
    'imacron' : '\u012b',
    'Ibreve' : '\u012c',
    'ibreve' : '\u012d',
    'dotlessi' : '\u0131',
    'IJ' : '\u0132',
    'ij' : '\u0133',
    'Omacron' : '\u014c',
    'omacron' : '\u014d',
    'Obreve' : '\u014e',
    'obreve' : '\u014f',
    'OE' : '\u0152',
    'oe' : '\u0153',
    'Scaron' : '\u0160',
    'scaron' : '\u0161',
    'Utilde' : '\u0168',
    'utilde' : '\u0169',
    'Umacron' : '\u016a',
    'umacron' : '\u016b',
    'Ubreve' : '\u016c',
    'ubreve' : '\u016d',
    'Uring' : '\u016e',
    'uring' : '\u016f',
    'Ycircumflex' : '\u0176',
    'ycircumflex' : '\u0177',
    'Ydieresis' : '\u0178',
    'Zcaron' : '\u017d',
    'zcaron' : '\u017e',
    'acaron' : '\u01ce',
    'icaron' : '\u01d0',
    'ocaron' : '\u01d2',
    'ucaron' : '\u01d4',
    'ymacron' : '\u0233',
    'dotlessj' : '\u0237',
    'gravecomb' : '\u0300',
    'acutecomb' : '\u0301',
    'uni0302' : '\u0302',
    'tildecomb' : '\u0303',
    'uni0304' : '\u0304',
    'uni0306' : '\u0306',
    'uni0308' : '\u0308',
    'uni030A' : '\u030a',
    'uni030C' : '\u030c',
    'uni0327' : '\u0327',
    'etilde' : '\u1ebd',
    'ygrave' : '\u1ef3',
    'ytilde' : '\u1ef9',
    'uni2010' : '\u2010',
    'uni2011' : '\u2011',
    'endash' : '\u2013',
    'emdash' : '\u2014',
    'quoteleft' : '\u2018',
    'quoteright' : '\u2019',
    'quotesinglbase' : '\u201a',
    'quotedblleft' : '\u201c',
    'quotedblright' : '\u201d',
    'quotedblbase' : '\u201e',
    'bullet' : '\u2022',
    'guilsinglleft' : '\u2039',
    'guilsinglright' : '\u203a',
    'uni203E' : '\u203e',
    'Euro' : '\u20ac',
    'ccni' : '\ue000',
    'ccnn' : '\ue001',
    'ccnh' : '\ue002',
    'ccno' : '\ue003',
    'ccna' : '\ue004',
    'ccne' : '\ue005',
    'ccns' : '\ue006',
    'ccnt1' : '\ue007',
    'ccnt' : '\ue008',
    'ccns1' : '\ue009',
    'cen' : '\ue00b',
    'ccoi' : '\ue00c',
    'ccon' : '\ue00d',
    'ccoh' : '\ue00e',
    'ccoo' : '\ue00f',
    'ccoa' : '\ue010',
    'ccoe' : '\ue011',
    'ccos' : '\ue012',
    'ccot1' : '\ue013',
    'ccot' : '\ue014',
    'ccos1' : '\ue015',
    'ceo' : '\ue017',
    'ccei' : '\ue018',
    'ccen' : '\ue019',
    'cceh' : '\ue01a',
    'cceo' : '\ue01b',
    'ccea' : '\ue01c',
    'ccee' : '\ue01d',
    'cces' : '\ue01e',
    'ccet1' : '\ue01f',
    'ccet' : '\ue020',
    'cces1' : '\ue021',
    'cee' : '\ue023',
    'ccvi' : '\ue024',
    'ccvn' : '\ue025',
    'ccvh' : '\ue026',
    'ccvo' : '\ue027',
    'ccva' : '\ue028',
    'ccve' : '\ue029',
    'ccvs' : '\ue02a',
    'ccvt1' : '\ue02b',
    'ccvt' : '\ue02c',
    'ccvs1' : '\ue02d',
    'cev' : '\ue02f',
    'ccgi' : '\ue030',
    'ccgn' : '\ue031',
    'ccgh' : '\ue032',
    'ccgo' : '\ue033',
    'ccga' : '\ue034',
    'ccge' : '\ue035',
    'ccgs' : '\ue036',
    'ccgt1' : '\ue037',
    'ccgt' : '\ue038',
    'ccgs1' : '\ue039',
    'ceg' : '\ue03b',
    'ccsi' : '\ue03c',
    'ccsn' : '\ue03d',
    'ccsh' : '\ue03e',
    'ccso' : '\ue03f',
    'ccsa' : '\ue040',
    'ccse' : '\ue041',
    'ccss' : '\ue042',
    'ccst1' : '\ue043',
    'ccst' : '\ue044',
    'ccss1' : '\ue045',
    'ces' : '\ue047',
    'ccpi' : '\ue048',
    'ccpn' : '\ue049',
    'ccph' : '\ue04a',
    'ccpo' : '\ue04b',
    'ccpa' : '\ue04c',
    'ccpe' : '\ue04d',
    'ccps' : '\ue04e',
    'ccpt1' : '\ue04f',
    'ccpt' : '\ue050',
    'ccps1' : '\ue051',
    'cep' : '\ue053',
    'ccqi' : '\ue054',
    'ccqn' : '\ue055',
    'ccqh' : '\ue056',
    'ccqo' : '\ue057',
    'ccqa' : '\ue058',
    'ccqe' : '\ue059',
    'ccqs' : '\ue05a',
    'ccqt1' : '\ue05b',
    'ccqt' : '\ue05c',
    'ccqs1' : '\ue05d',
    'ccqj' : '\ue05e',
    'ceq' : '\ue05f',
    'ccti' : '\ue060',
    'cctn' : '\ue061',
    'ccth' : '\ue062',
    'ccto' : '\ue063',
    'ccta' : '\ue064',
    'ccte' : '\ue065',
    'ccts' : '\ue066',
    'cctt1' : '\ue067',
    'cctt' : '\ue068',
    'ccts1' : '\ue069',
    'cet' : '\ue06b',
    'ccOi' : '\ue06c',
    'ccOn' : '\ue06d',
    'ccOh' : '\ue06e',
    'ccOo' : '\ue06f',
    'ccOa' : '\ue070',
    'ccOe' : '\ue071',
    'ccOs' : '\ue072',
    'ccOt1' : '\ue073',
    'ccOt' : '\ue074',
    'ccOs1' : '\ue075',
    'ceO' : '\ue077',
    'ccBi' : '\ue078',
    'ccBn' : '\ue079',
    'ccBh' : '\ue07a',
    'ccBo' : '\ue07b',
    'ccBa' : '\ue07c',
    'ccBe' : '\ue07d',
    'ccBs' : '\ue07e',
    'ccBt1' : '\ue07f',
    'ccBt' : '\ue080',
    'ccBs1' : '\ue081',
    'ceB' : '\ue083',
    'ccAi' : '\ue084',
    'ccAn' : '\ue085',
    'ccAh' : '\ue086',
    'ccAo' : '\ue087',
    'ccAa' : '\ue088',
    'ccAe' : '\ue089',
    'ccAs' : '\ue08a',
    'ccAt1' : '\ue08b',
    'ccAt' : '\ue08c',
    'ccAs1' : '\ue08d',
    'ceA' : '\ue08f',
    'ccPi' : '\ue090',
    'ccPn' : '\ue091',
    'ccPh' : '\ue092',
    'ccPo' : '\ue093',
    'ccPa' : '\ue094',
    'ccPe' : '\ue095',
    'ccPs' : '\ue096',
    'ccPt1' : '\ue097',
    'ccPt' : '\ue098',
    'ccPs1' : '\ue099',
    'ceP' : '\ue09b',
    'ccFi' : '\ue09c',
    'ccFn' : '\ue09d',
    'ccFh' : '\ue09e',
    'ccFo' : '\ue09f',
    'ccFa' : '\ue0a0',
    'ccFe' : '\ue0a1',
    'ccFs' : '\ue0a2',
    'ccFt1' : '\ue0a3',
    'ccFt' : '\ue0a4',
    'ccFs1' : '\ue0a5',
    'ceF' : '\ue0a7',
    'ccIi' : '\ue0a8',
    'ccIn' : '\ue0a9',
    'ccIh' : '\ue0aa',
    'ccIo' : '\ue0ab',
    'ccIa' : '\ue0ac',
    'ccIe' : '\ue0ad',
    'ccIs' : '\ue0ae',
    'ccIt1' : '\ue0af',
    'ccIt' : '\ue0b0',
    'ccIs1' : '\ue0b1',
    'ceI' : '\ue0b3',
    'ccNi' : '\ue0b4',
    'ccNn' : '\ue0b5',
    'ccNh' : '\ue0b6',
    'ccNo' : '\ue0b7',
    'ccNa' : '\ue0b8',
    'ccNe' : '\ue0b9',
    'ccNs' : '\ue0ba',
    'ccNt1' : '\ue0bb',
    'ccNt' : '\ue0bc',
    'ccNs1' : '\ue0bd',
    'ceN' : '\ue0bf',
    'cgi' : '\ue0c0',
    'cgn' : '\ue0c1',
    'cgh' : '\ue0c2',
    'cgo' : '\ue0c3',
    'cga' : '\ue0c4',
    'cge' : '\ue0c5',
    'cgs' : '\ue0c6',
    'cgt1' : '\ue0c7',
    'cgt' : '\ue0c8',
    'cgz1' : '\ue0c9',
    'cgz' : '\ue0ca',
    'cgs1' : '\ue0cb',
    'cgj' : '\ue0cc',
    'cgp' : '\ue0cd',
    'cgf' : '\ue0ce',
    'cgg' : '\ue0cf',
    'cgy' : '\ue0d0',
    'cgy1' : '\ue0d1',
    'cggermandbls' : '\ue0d2',
    'cet1' : '\ue0d3',
    'cfgermandbls' : '\ue0d4',
    'cfs' : '\ue0d5',
    'cfp' : '\ue0d6',
    'cegermandbls' : '\ue0d7',
    'ceG1' : '\ue0d8',
    'ceQ' : '\ue0d9',
    'ceE' : '\ue0da',
    'ceC' : '\ue0db',
    'ceD' : '\ue0dc',
    'cej' : '\ue0dd',
    'ced' : '\ue0de',
    'ceh' : '\ue0df',
    'cef' : '\ue0e0',
    'ceM' : '\ue0e1',
    'ceC1' : '\ue0e2',
    'ceH' : '\ue0e3',
    't1' : '\ue0e4',
    't1dotless' : '\ue0e5',
    'xdotless' : '\ue0e6',
    'A1' : '\ue0e7',
    'M1' : '\ue0e8',
    'N1' : '\ue0e9',
    'A2' : '\ue0ea',
    'M2' : '\ue0eb',
    'N2' : '\ue0ec',
    'r1' : '\ue0ed',
    'z1' : '\ue0ee',
    'z1caron' : '\ue0ef',
    'd1' : '\ue0f0',
    'p1' : '\ue0f1',
    'y1' : '\ue0f2',
    'ij1' : '\ue0f3',
    'w1' : '\ue0f4',
    'y1macron' : '\ue0f5',
    'Y1' : '\ue0f6',
    'IJ1' : '\ue0f7',
    'W1' : '\ue0f8',
    'Z1' : '\ue0f9',
    'f1' : '\ue0fa',
    'f2' : '\ue0fb',
    'f3' : '\ue0fc',
    'f4' : '\ue0fd',
    'f5' : '\ue0fe',
    'q1' : '\ue0ff',
    'q2' : '\ue100',
    'q3' : '\ue101',
    'q4' : '\ue102',
    's1' : '\ue103',
    'r2' : '\ue104',
    'z2' : '\ue105',
    'z3' : '\ue106',
    'Z2' : '\ue107',
    'Z3' : '\ue108',
    'z2caron' : '\ue109',
    'z3caron' : '\ue10a',
    'Z2caron' : '\ue10b',
    'Z3caron' : '\ue10c',
    's1caron' : '\ue10d',
    'p2' : '\ue10e',
    'p3' : '\ue10f',
    'p4' : '\ue110',
    'p5' : '\ue111',
    'p6' : '\ue112',
    'p7' : '\ue113',
    'C1' : '\ue114',
    'C1cedilla' : '\ue115',
    'G1' : '\ue116',
    'L1' : '\ue117',
    'y1grave' : '\ue118',
    'y1acute' : '\ue119',
    'y1circumflex' : '\ue11a',
    'y1diaeresis' : '\ue11b',
    'y1tilde' : '\ue11c',
    'csi' : '\ue11d',
    'csn' : '\ue11e',
    'csh' : '\ue11f',
    'cso' : '\ue120',
    'csa' : '\ue121',
    'cse' : '\ue122',
    'css' : '\ue123',
    'cst1' : '\ue124',
    'cst' : '\ue125',
    'csz1' : '\ue126',
    'csz' : '\ue127',
    'css1' : '\ue128',
    'csj' : '\ue129',
    'csp' : '\ue12a',
    'csf' : '\ue12b',
    'csg' : '\ue12c',
    'csy' : '\ue12d',
    'csy1' : '\ue12e',
    'csgermandbls' : '\ue12f',
    'cpo' : '\ue130',
    'cpa' : '\ue131',
    'cpt1' : '\ue132',
    'cpg' : '\ue133',
    'ccf1i' : '\ue134',
    'ccf1n' : '\ue135',
    'ccf1h' : '\ue136',
    'ccf1o' : '\ue137',
    'ccf1a' : '\ue138',
    'ccf1e' : '\ue139',
    'ccf1s' : '\ue13a',
    'ccf1t1' : '\ue13b',
    'ccf1t' : '\ue13c',
    'ccf1s1' : '\ue13d',
    'ccf1j' : '\ue13e',
    'cef1' : '\ue13f',
    'cef2' : '\ue140',
    'ccf4i' : '\ue141',
    'ccf4n' : '\ue142',
    'ccf4h' : '\ue143',
    'ccf4o' : '\ue144',
    'ccf4a' : '\ue145',
    'ccf4e' : '\ue146',
    'ccf4s' : '\ue147',
    'ccf4t1' : '\ue148',
    'ccf4t' : '\ue149',
    'ccf4s1' : '\ue14a',
    'cef4' : '\ue14c',
    'ccq1i' : '\ue14d',
    'ccq1n' : '\ue14e',
    'ccq1h' : '\ue14f',
    'ccq1o' : '\ue150',
    'ccq1a' : '\ue151',
    'ccq1e' : '\ue152',
    'ccq1s' : '\ue153',
    'ccq1t1' : '\ue154',
    'ccq1t' : '\ue155',
    'ccq1s1' : '\ue156',
    'ccq1j' : '\ue157',
    'ceq1' : '\ue158',
    'ccq2i' : '\ue159',
    'ccq2n' : '\ue15a',
    'ccq2h' : '\ue15b',
    'ccq2o' : '\ue15c',
    'ccq2a' : '\ue15d',
    'ccq2e' : '\ue15e',
    'ccq2s' : '\ue15f',
    'ccq2t1' : '\ue160',
    'ccq2t' : '\ue161',
    'ccq2s1' : '\ue162',
    'ceq2' : '\ue164',
    'ceq3' : '\ue165',
    'A2grave' : '\ue167',
    'A2acute' : '\ue168',
    'A2circumflex' : '\ue169',
    'A2dieresis' : '\ue16a',
    'A2tilde' : '\ue16b',
    'A2macron' : '\ue16c',
    'A2breve' : '\ue16d',
    'A2ring' : '\ue16e',
    'N2tilde' : '\ue16f',
    'Y1acute' : '\ue170',
    'Y1circumflex' : '\ue171',
    'Y1dieresis' : '\ue172',
    'Z1caron' : '\ue173',
    'loo' : '\ue174',
    'lee' : '\ue175',
    'laa' : '\ue176',
    'luu' : '\ue177',
    'oomacron' : '\ue178',
    'oobreve' : '\ue179',
    'eemacron' : '\ue17a',
    'eebreve' : '\ue17b',
    'aamacron' : '\ue17c',
    'aabreve' : '\ue17d',
    'uumacron' : '\ue17e',
    'uubreve' : '\ue17f',
    'ccr2i' : '\ue18d',
    'ccr2n' : '\ue18e',
    'ccr2h' : '\ue18f',
    'ccr2o' : '\ue190',
    'ccr2a' : '\ue191',
    'ccr2e' : '\ue192',
    'ccr2s' : '\ue193',
    'ccr2t1' : '\ue194',
    'ccr2t' : '\ue195',
    'ccr2s1' : '\ue196',
    'cer2' : '\ue198',
    'cfr2' : '\ue199',
    'one.alt1' : '\ue1b7',
    'one.alt2' : '\ue1b8',
    'two.alt1' : '\ue1b9',
    'three.alt1' : '\ue1ba',
    'four.alt1' : '\ue1bb',
    'four.alt2' : '\ue1bc',
    'four.alt3' : '\ue1bd',
    'seven.alt1' : '\ue1be',
    'seven.alt2' : '\ue1bf',
    'seven.alt3' : '\ue1c0',
    'eight.alt1' : '\ue1c1',
    'eight.alt2' : '\ue1c2',
    'nine.alt1' : '\ue1c3',
    'zero.tab' : '\ue1c7',
    'one.tab' : '\ue1c8',
    'one.alt1.tab' : '\ue1c9',
    'one.alt2.tab' : '\ue1ca',
    'two.tab' : '\ue1cb',
    'two.alt1.tab' : '\ue1cc',
    'three.tab' : '\ue1cd',
    'three.alt1.tab' : '\ue1ce',
    'four.tab' : '\ue1cf',
    'four.alt1.tab' : '\ue1d0',
    'four.alt2.tab' : '\ue1d1',
    'four.alt3.tab' : '\ue1d2',
    'five.tab' : '\ue1d3',
    'six.tab' : '\ue1d4',
    'seven.tab' : '\ue1d5',
    'seven.alt1.tab' : '\ue1d6',
    'seven.alt2.tab' : '\ue1d7',
    'seven.alt3.tab' : '\ue1d8',
    'eight.tab' : '\ue1d9',
    'eight.alt1.tab' : '\ue1da',
    'eight.alt2.tab' : '\ue1db',
    'nine.tab' : '\ue1dc',
    'nine.alt1.tab' : '\ue1dd',
    'period.tab' : '\ue1de',
    'comma.tab' : '\ue1df',
    'colon.tab' : '\ue1e0',
    'semicolon.tab' : '\ue1e1',
    'space.tab' : '\ue1e2',
    'plus.tab' : '\ue1e3',
    'hyphen.tab' : '\ue1e4',
    'equal.tab' : '\ue1e5',
    'underscore.tab' : '\ue1e6',
    'multiply.tab' : '\ue1e7',
    'divide.tab' : '\ue1e8',
    'dollar.tab' : '\ue1e9',
    'percent.tab' : '\ue1ea',
    'sterling.tab' : '\ue1eb',
    'cent.tab' : '\ue1ec',
    'yen.tab' : '\ue1ed',
    'Euro.tab' : '\ue1ee',
    'zero.tab.old' : '\ue1f5',
    'one.tab.old' : '\ue1f6',
    'one.alt1.tab.old' : '\ue1f7',
    'one.alt2.tab.old' : '\ue1f8',
    'two.tab.old' : '\ue1f9',
    'two.alt1.tab.old' : '\ue1fa',
    'three.tab.old' : '\ue1fb',
    'three.alt1.tab.old' : '\ue1fc',
    'four.tab.old' : '\ue1fd',
    'four.alt1.tab.old' : '\ue1fe',
    'four.alt2.tab.old' : '\ue1ff',
    'four.alt3.tab.old' : '\ue200',
    'five.tab.old' : '\ue201',
    'six.tab.old' : '\ue202',
    'seven.tab.old' : '\ue203',
    'seven.alt1.tab.old' : '\ue204',
    'seven.alt2.tab.old' : '\ue205',
    'seven.alt3.tab.old' : '\ue206',
    'eight.tab.old' : '\ue207',
    'eight.alt1.tab.old' : '\ue208',
    'eight.alt2.tab.old' : '\ue209',
    'nine.tab.old' : '\ue20a',
    'nine.alt1.tab.old' : '\ue20b',
    'space.tab.old' : '\ue20c',
    'plus.tab.old' : '\ue20d',
    'hyphen.tab.old' : '\ue20e',
    'equal.tab.old' : '\ue20f',
    'underscore.tab.old' : '\ue210',
    'multiply.tab.old' : '\ue211',
    'divide.tab.old' : '\ue212',
    'percent.tab.old' : '\ue213',
    'zero.old' : '\ue21a',
    'one.old' : '\ue21b',
    'one.alt1.old' : '\ue21c',
    'one.alt2.old' : '\ue21d',
    'two.old' : '\ue21e',
    'two.alt1.old' : '\ue21f',
    'three.old' : '\ue220',
    'three.alt1.old' : '\ue221',
    'four.old' : '\ue222',
    'four.alt1.old' : '\ue223',
    'four.alt2.old' : '\ue224',
    'four.alt3.old' : '\ue225',
    'five.old' : '\ue226',
    'six.old' : '\ue227',
    'seven.old' : '\ue228',
    'seven.alt1.old' : '\ue229',
    'seven.alt2.old' : '\ue22a',
    'seven.alt3.old' : '\ue22b',
    'eight.old' : '\ue22c',
    'eight.alt1.old' : '\ue22d',
    'eight.alt2.old' : '\ue22e',
    'nine.old' : '\ue22f',
    'nine.alt1.old' : '\ue230',
    'multiply.old' : '\ue231',
    'divide.old' : '\ue232',
    'csa_a' : '\ue801',
    'csn_n' : '\ue802',
    'csi_i' : '\ue803',
    'csh_h' : '\ue804',
    'cso_o' : '\ue805',
    'cso_c' : '\ue806',
    'cse_e' : '\ue807',
    'csi_u' : '\ue808',
    'csn_m' : '\ue809',
    'csh_l' : '\ue80a',
    'csn_v' : '\ue80b',
    'csi_w' : '\ue80c',
    'csh_b' : '\ue80d',
    'csa_d' : '\ue80e',
    'csj_j' : '\ue80f',
    'csg_g' : '\ue810',
    'csy_y' : '\ue811',
    'csh_k' : '\ue812',
    'csp_p' : '\ue813',
    'css_s' : '\ue814',
    'csa_q' : '\ue815',
    'csf_f' : '\ue816',
    'csn_x' : '\ue817',
    'csz_z' : '\ue818',
    'csn_r' : '\ue819',
    'cst_t' : '\ue81a',
    'cst1_t1' : '\ue81b',
    'csi_dotlessi' : '\ue81c',
    'csj_dotlessj' : '\ue81d',
    'csi_r1' : '\ue81e',
    'csz1_z1' : '\ue81f',
    'csz1_z1caron' : '\ue820',
    'csy_ij' : '\ue821',
    'csy1_y1' : '\ue822',
    'csy1_ij1' : '\ue823',
    'csn_w1' : '\ue824',
    'csf_f1' : '\ue825',
    'csf_f2' : '\ue826',
    'csf_f3' : '\ue827',
    'csf_f4' : '\ue828',
    'csf_f5' : '\ue829',
    'csa_q1' : '\ue82a',
    'csa_q2' : '\ue82b',
    'csa_q3' : '\ue82c',
    'css1_s1' : '\ue82d',
    'css1_s1caron' : '\ue82e',
    'csgermandbls_germandbls' : '\ue82f',
    'csa_agrave' : '\ue830',
    'csa_aacute' : '\ue831',
    'csa_acircumflex' : '\ue832',
    'cse_egrave' : '\ue833',
    'cse_eacute' : '\ue834',
    'cse_ecircumflex' : '\ue835',
    'csi_igrave' : '\ue836',
    'csi_iacute' : '\ue837',
    'csi_icircumflex' : '\ue838',
    'cso_ograve' : '\ue839',
    'cso_oacute' : '\ue83a',
    'cso_ocircumflex' : '\ue83b',
    'csi_ugrave' : '\ue83c',
    'csi_uacute' : '\ue83d',
    'csi_ucircumflex' : '\ue83e',
    'css_scaron' : '\ue83f',
    'csz_zcaron' : '\ue840',
    'csa_acaron' : '\ue841',
    'cse_ecaron' : '\ue842',
    'csi_icaron' : '\ue843',
    'cso_ocaron' : '\ue844',
    'csi_ucaron' : '\ue845',
    'csa_atilde' : '\ue846',
    'csn_ntilde' : '\ue847',
    'csy_ygrave' : '\ue848',
    'csy_yacute' : '\ue849',
    'csy_ycircumflex' : '\ue84a',
    'csy_ytilde' : '\ue84b',
    'cse_etilde' : '\ue84c',
    'cso_otilde' : '\ue84d',
    'csi_utilde' : '\ue84e',
    'csy1_y1grave' : '\ue84f',
    'csy1_y1acute' : '\ue850',
    'csy1_y1circumflex' : '\ue851',
    'csy1_y1diaeresis' : '\ue852',
    'csy1_y1tilde' : '\ue853',
    'csi_itilde' : '\ue854',
    'csa_adieresis' : '\ue855',
    'csa_aring' : '\ue856',
    'csa_amacron' : '\ue857',
    'csa_abreve' : '\ue858',
    'cse_edieresis' : '\ue859',
    'cse_emacron' : '\ue85a',
    'cse_ebreve' : '\ue85b',
    'csi_idieresis' : '\ue85c',
    'csi_imacron' : '\ue85d',
    'csi_ibreve' : '\ue85e',
    'cso_odieresis' : '\ue85f',
    'cso_omacron' : '\ue860',
    'cso_obreve' : '\ue861',
    'csi_udieresis' : '\ue862',
    'csi_umacron' : '\ue863',
    'csi_ubreve' : '\ue864',
    'csi_uring' : '\ue865',
    'csy_ydieresis' : '\ue866',
    'csy_ymacron' : '\ue867',
    'csy1_y1macron' : '\ue868',
    'cso_ccedilla' : '\ue869',
    'csa_ae' : '\ue86a',
    'cso_oe' : '\ue86b',
    'cse_eemacron' : '\ue86c',
    'cse_eebreve' : '\ue86d',
    'csa_aamacron' : '\ue86e',
    'csa_aabreve' : '\ue86f',
    'csi_uumacron' : '\ue870',
    'csi_uubreve' : '\ue871',
    'cso_oomacron' : '\ue872',
    'cso_oobreve' : '\ue873',
    'csa_q4' : '\ue874',
    'csa_d1' : '\ue875',
    'csp_p1' : '\ue876',
    'csn_p2' : '\ue877',
    'csn_p3' : '\ue878',
    'csp_p4' : '\ue879',
    'csp_p5' : '\ue87a',
    'csn_p6' : '\ue87b',
    'csn_p7' : '\ue87c',
    'csn_r2' : '\ue87d',
    'cso_oslash' : '\ue87e',
  }
  // numerals: put all glyphs in here that have onum or tnum styles (so also interpunction and math symbols)
  var numerals = {
    'space' : '\u0020',
    'dollar' : '\u0024',
    'percent' : '\u0025',
    'plus' : '\u002b',
    'comma' : '\u002c',
    'hyphen' : '\u002d',
    'period' : '\u002e',
    'slash' : '\u002f',
    'zero' : '\u0030',
    'one' : '\u0031',
    'two' : '\u0032',
    'three' : '\u0033',
    'four' : '\u0034',
    'five' : '\u0035',
    'six' : '\u0036',
    'seven' : '\u0037',
    'eight' : '\u0038',
    'nine' : '\u0039',
    'colon' : '\u003a',
    'semicolon' : '\u003b',
    'backslash' : '\u005c',
    'underscore' : '\u005f',
    'cent' : '\u00a2',
    'sterling' : '\u00a3',
    'yen' : '\u00a5',
    'multiply' : '\u00d7',
    'divide' : '\u00f7',
    'Euro' : '\u20ac',
    'one.alt1' : '\ue1b7',
    'one.alt2' : '\ue1b8',
    'two.alt1' : '\ue1b9',
    'three.alt1' : '\ue1ba',
    'four.alt1' : '\ue1bb',
    'four.alt2' : '\ue1bc',
    'four.alt3' : '\ue1bd',
    'seven.alt1' : '\ue1be',
    'seven.alt2' : '\ue1bf',
    'seven.alt3' : '\ue1c0',
    'eight.alt1' : '\ue1c1',
    'eight.alt2' : '\ue1c2',
    'nine.alt1' : '\ue1c3',
    'zero.tab' : '\ue1c7',
    'one.tab' : '\ue1c8',
    'one.alt1.tab' : '\ue1c9',
    'one.alt2.tab' : '\ue1ca',
    'two.tab' : '\ue1cb',
    'two.alt1.tab' : '\ue1cc',
    'three.tab' : '\ue1cd',
    'three.alt1.tab' : '\ue1ce',
    'four.tab' : '\ue1cf',
    'four.alt1.tab' : '\ue1d0',
    'four.alt2.tab' : '\ue1d1',
    'four.alt3.tab' : '\ue1d2',
    'five.tab' : '\ue1d3',
    'six.tab' : '\ue1d4',
    'seven.tab' : '\ue1d5',
    'seven.alt1.tab' : '\ue1d6',
    'seven.alt2.tab' : '\ue1d7',
    'seven.alt3.tab' : '\ue1d8',
    'eight.tab' : '\ue1d9',
    'eight.alt1.tab' : '\ue1da',
    'eight.alt2.tab' : '\ue1db',
    'nine.tab' : '\ue1dc',
    'nine.alt1.tab' : '\ue1dd',
    'period.tab' : '\ue1de',
    'comma.tab' : '\ue1df',
    'colon.tab' : '\ue1e0',
    'semicolon.tab' : '\ue1e1',
    'space.tab' : '\ue1e2',
    'plus.tab' : '\ue1e3',
    'hyphen.tab' : '\ue1e4',
    'equal.tab' : '\ue1e5',
    'underscore.tab' : '\ue1e6',
    'multiply.tab' : '\ue1e7',
    'divide.tab' : '\ue1e8',
    'dollar.tab' : '\ue1e9',
    'percent.tab' : '\ue1ea',
    'sterling.tab' : '\ue1eb',
    'cent.tab' : '\ue1ec',
    'yen.tab' : '\ue1ed',
    'Euro.tab' : '\ue1ee',
    'zero.tab.old' : '\ue1f5',
    'one.tab.old' : '\ue1f6',
    'one.alt1.tab.old' : '\ue1f7',
    'one.alt2.tab.old' : '\ue1f8',
    'two.tab.old' : '\ue1f9',
    'two.alt1.tab.old' : '\ue1fa',
    'three.tab.old' : '\ue1fb',
    'three.alt1.tab.old' : '\ue1fc',
    'four.tab.old' : '\ue1fd',
    'four.alt1.tab.old' : '\ue1fe',
    'four.alt2.tab.old' : '\ue1ff',
    'four.alt3.tab.old' : '\ue200',
    'five.tab.old' : '\ue201',
    'six.tab.old' : '\ue202',
    'seven.tab.old' : '\ue203',
    'seven.alt1.tab.old' : '\ue204',
    'seven.alt2.tab.old' : '\ue205',
    'seven.alt3.tab.old' : '\ue206',
    'eight.tab.old' : '\ue207',
    'eight.alt1.tab.old' : '\ue208',
    'eight.alt2.tab.old' : '\ue209',
    'nine.tab.old' : '\ue20a',
    'nine.alt1.tab.old' : '\ue20b',
    'space.tab.old' : '\ue20c',
    'plus.tab.old' : '\ue20d',
    'hyphen.tab.old' : '\ue20e',
    'equal.tab.old' : '\ue20f',
    'underscore.tab.old' : '\ue210',
    'multiply.tab.old' : '\ue211',
    'divide.tab.old' : '\ue212',
    'percent.tab.old' : '\ue213',
    'zero.old' : '\ue21a',
    'one.old' : '\ue21b',
    'one.alt1.old' : '\ue21c',
    'one.alt2.old' : '\ue21d',
    'two.old' : '\ue21e',
    'two.alt1.old' : '\ue21f',
    'three.old' : '\ue220',
    'three.alt1.old' : '\ue221',
    'four.old' : '\ue222',
    'four.alt1.old' : '\ue223',
    'four.alt2.old' : '\ue224',
    'four.alt3.old' : '\ue225',
    'five.old' : '\ue226',
    'six.old' : '\ue227',
    'seven.old' : '\ue228',
    'seven.alt1.old' : '\ue229',
    'seven.alt2.old' : '\ue22a',
    'seven.alt3.old' : '\ue22b',
    'eight.old' : '\ue22c',
    'eight.alt1.old' : '\ue22d',
    'eight.alt2.old' : '\ue22e',
    'nine.old' : '\ue22f',
    'nine.alt1.old' : '\ue230',
    'multiply.old' : '\ue231',
    'divide.old' : '\ue232'
  }
  
  var fix_whitespace_ligatures = {
    csa_a : '\ue801',
    csn_n : '\ue802',
    csi_i : '\ue803',
    csh_h : '\ue804',
    cso_o : '\ue805',
    cso_c : '\ue806',
    cse_e : '\ue807',
    csi_u : '\ue808',
    csn_m : '\ue809',
    csh_l : '\ue80a',
    csn_v : '\ue80b',
    csi_w : '\ue80c',
    csh_b : '\ue80d',
    csa_d : '\ue80e',
    csj_j : '\ue80f',
    csg_g : '\ue810',
    csy_y : '\ue811',
    csh_k : '\ue812',
    csp_p : '\ue813',
    css_s : '\ue814',
    csa_q : '\ue815',
    csf_f : '\ue816',
    csn_x : '\ue817',
    csz_z : '\ue818',
    csn_r : '\ue819',
    cst_t : '\ue81a',
    cst1_t1 : '\ue81b',
    csi_dotlessi : '\ue81c',
    csj_dotlessj : '\ue81d',
    csi_r1 : '\ue81e',
    csz1_z1 : '\ue81f',
    csz1_z1caron : '\ue820',
    csy_ij : '\ue821',
    csy1_y1 : '\ue822',
    csy1_ij1 : '\ue823',
    csn_w1 : '\ue824',
    csf_f1 : '\ue825',
    csf_f2 : '\ue826',
    csf_f3 : '\ue827',
    csf_f4 : '\ue828',
    csf_f5 : '\ue829',
    csa_q1 : '\ue82a',
    csa_q2 : '\ue82b',
    csa_q3 : '\ue82c',
    css1_s1 : '\ue82d',
    css1_s1caron : '\ue82e',
    csgermandbls_germandbls : '\ue82f',
    csa_agrave : '\ue830',
    csa_aacute : '\ue831',
    csa_acircumflex : '\ue832',
    cse_egrave : '\ue833',
    cse_eacute : '\ue834',
    cse_ecircumflex : '\ue835',
    csi_igrave : '\ue836',
    csi_iacute : '\ue837',
    csi_icircumflex : '\ue838',
    cso_ograve : '\ue839',
    cso_oacute : '\ue83a',
    cso_ocircumflex : '\ue83b',
    csi_ugrave : '\ue83c',
    csi_uacute : '\ue83d',
    csi_ucircumflex : '\ue83e',
    css_scaron : '\ue83f',
    csn_zcaron : '\ue840',
    csa_acaron : '\ue841',
    cse_ecaron : '\ue842',
    csi_icaron : '\ue843',
    cso_ocaron : '\ue844',
    csi_ucaron : '\ue845',
    csa_atilde : '\ue846',
    csn_ntilde : '\ue847',
    csy_ygrave : '\ue848',
    csy_yacute : '\ue849',
    csy_ycircumflex : '\ue84a',
    csy_ytilde : '\ue84b',
    cse_etilde : '\ue84c',
    cso_otilde : '\ue84d',
    csi_utilde : '\ue84e',
    csy1_y1grave : '\ue84f',
    csy1_y1acute : '\ue850',
    csy1_y1circumflex : '\ue851',
    csy1_y1diaeresis : '\ue852',
    csy1_y1tilde : '\ue853',
    csi_itilde : '\ue854',
    csa_adieresis : '\ue855',
    csa_aring : '\ue856',
    csa_amacron : '\ue857',
    csa_abreve : '\ue858',
    cse_edieresis : '\ue859',
    cse_emacron : '\ue85a',
    cse_ebreve : '\ue85b',
    csi_idieresis : '\ue85c',
    csi_imacron : '\ue85d',
    csi_ibreve : '\ue85e',
    cso_odieresis : '\ue85f',
    cso_omacron : '\ue860',
    cso_obreve : '\ue861',
    csi_udieresis : '\ue862',
    csi_umacron : '\ue863',
    csi_ubreve : '\ue864',
    csi_uring : '\ue865',
    csy_ydieresis : '\ue866',
    csy_ymacron : '\ue867',
    csy1_y1macron : '\ue868',
    cso_ccedilla : '\ue869',
    csa_ae : '\ue86a',
    cso_oe : '\ue86b',
    cse_eemacron : '\ue86c',
    cse_eebreve : '\ue86d',
    csa_aamacron : '\ue86e',
    csa_aabreve : '\ue86f',
    csi_uumacron : '\ue870',
    csi_uubreve : '\ue871',
    cso_oomacron : '\ue872',
    cso_oobreve : '\ue873',
    csa_q4 : '\ue874',
    csa_d1 : '\ue875',
    csp_p1 : '\ue876',
    csn_p2 : '\ue877',
    csn_p3 : '\ue878',
    csp_p4 : '\ue879',
    csp_p5 : '\ue87a',
    csn_p6 : '\ue87b',
    csn_p7 : '\ue87c',
    csn_r2 : '\ue87d',
    cso_oslash : '\ue87e'
  }
  
  var back_classes = {};
  back_classes['n'] = 
    'adhiklmnrux' + glyphs['dotlessi'] +  glyphs['t1'] + glyphs['aacute'] +  glyphs['agrave'] +  glyphs['acircumflex'] +  glyphs['iacute'] +  glyphs['igrave'] +  glyphs['icircumflex'] +  glyphs['uacute'] +  glyphs['ugrave'] +  glyphs['ucircumflex'] +  glyphs['acaron'] +  glyphs['icaron'] +  glyphs['ucaron'] +  glyphs['atilde'] +  glyphs['ntilde'] +  glyphs['itilde'] +  glyphs['utilde'] +  glyphs['adieresis'] +  glyphs['aring'] +  glyphs['amacron'] +  glyphs['abreve'] +  glyphs['idieresis'] +  glyphs['imacron'] +  glyphs['ibreve'] +  glyphs['udieresis'] +  glyphs['uring'] +  glyphs['umacron'] +  glyphs['ubreve'] +   glyphs['aabreve'] +  glyphs['aamacron'] +  glyphs['uubreve'] +  glyphs['uumacron'] +  glyphs['p4'] +  glyphs['p6'] +  glyphs['r1'] 
    + 'HKMRUX' + glyphs['A1'] +  glyphs['M1'] +  glyphs['N1'] +  glyphs['A2'] +  glyphs['M2'] +  glyphs['N2'] +  glyphs['A2grave'] +  glyphs['A2acute'] +  glyphs['A2ring'] +  glyphs['A2tilde'] +  glyphs['A2circumflex'] +  glyphs['A2dieresis'] +  glyphs['A2breve'] +  glyphs['A2macron'] +  glyphs['N2tilde'] +  glyphs['Ugrave'] +  glyphs['Uacute'] +  glyphs['Ucircumflex'] +  glyphs['Udieresis'] +  glyphs['Uring'] +  glyphs['Utilde'] +  glyphs['Ubreve'] +  glyphs['Umacron'];
  back_classes['e'] = 
    'ce' + glyphs['egrave'] +  glyphs['eacute'] +  glyphs['ecircumflex'] +  glyphs['ecaron'] +  glyphs['etilde'] +  glyphs['edieresis'] +  glyphs['emacron'] +  glyphs['ebreve'] +  glyphs['ccedilla'] +  glyphs['eebreve'] +  glyphs['eemacron'] +  glyphs['ae'] +  glyphs['oe']
    + 'CEL' + glyphs['C1'] +  glyphs['C1cedilla'] +  glyphs['L1'] + glyphs['Ccedilla'] +  glyphs['Egrave'] +  glyphs['Eacute'] +  glyphs['Ecircumflex'] +  glyphs['Edieresis'] +  glyphs['Ebreve'] +  glyphs['Emacron'] +  glyphs['AE'] +  glyphs['OE'];
  back_classes['s'] = 
    's' + glyphs['scaron'] +  glyphs['s1'] +  glyphs['s1caron'];
  back_classes['p'] =
    'p' + glyphs['germandbls'] +  glyphs['p2'];
  back_classes['q'] =
    'fq';
  back_classes['z'] =
    'z' + glyphs['z1'] +  glyphs['z1caron'] +  glyphs['f2'] +  glyphs['f3'] +  glyphs['q3'] +  glyphs['zcaron']  
    + 'QZ' + glyphs['Z1'] + glyphs['Zcaron'] +  glyphs['Z1caron']; 
  back_classes['g'] = 
    'gjy' + glyphs['dotlessj'] +  glyphs['ij'] +  glyphs['y1'] +  glyphs['ij1'] + glyphs['ygrave'] +  glyphs['yacute'] +  glyphs['ycircumflex'] +  glyphs['ytilde'] +  glyphs['y1grave'] +  glyphs['y1acute'] +  glyphs['y1circumflex'] +  glyphs['y1tilde'] +  glyphs['ydieresis'] +  glyphs['ymacron'] +  glyphs['y1diaeresis'] +  glyphs['y1macron'] 
    + 'GJY' + glyphs['Y1'] +  glyphs['IJ1'] +  glyphs['G1'] +  glyphs['IJ'] + glyphs['Yacute'] +  glyphs['Ydieresis'] +  glyphs['Ycircumflex'] +  glyphs['Y1acute'] +  glyphs['Y1dieresis'] +  glyphs['Y1circumflex'];
  back_classes['v'] = 
    'bvw' + glyphs['w1'];
  back_classes['o'] =    
    'o' + glyphs['ograve'] +  glyphs['oacute'] +  glyphs['ocircumflex'] +  glyphs['ocaron'] +  glyphs['otilde'] +  glyphs['odieresis'] +  glyphs['omacron'] +  glyphs['obreve'] +  glyphs['oobreve'] +  glyphs['oomacron'] +  glyphs['oslash'];
  back_classes['t'] =
    't';
  back_classes['A'] =
    'A' + glyphs['Agrave'] +  glyphs['Aacute'] +  glyphs['Aring'] +  glyphs['Atilde'] +  glyphs['Adieresis'] +  glyphs['Abreve'] +  glyphs['Amacron'] +  glyphs['Acircumflex'];
  back_classes['B'] =
    'BS' + glyphs['Scaron'];
  back_classes['O'] =
    'DOVW' + glyphs['W1'] +  glyphs['Ograve'] +  glyphs['Oacute'] +  glyphs['Ocircumflex'] +  glyphs['Odieresis'] +  glyphs['Otilde'] +  glyphs['Obreve'] +  glyphs['Omacron'] +  glyphs['Oslash'];
  back_classes['F'] =
    'FT';
  back_classes['P'] =
    'P';
  back_classes['I'] =
    'I' + glyphs['Igrave'] +  glyphs['Iacute'] +  glyphs['Icircumflex'] +  glyphs['Idieresis'] +  glyphs['Ibreve'] +  glyphs['Imacron'];
  back_classes['N'] =
    'N' + glyphs['Ntilde'];
  back_classes['f1'] =
    glyphs['f1'];
  back_classes['f4'] =
    glyphs['f4'] + glyphs['f5'];
  back_classes['q1'] =
    glyphs['q1'];
  back_classes['q2'] =
    glyphs['q2'];
  back_classes['r2'] =
    glyphs['r2'];

  var letterglyphs_lc =
    'adhiklmnrux' + glyphs['dotlessi'] +  glyphs['t1'] + glyphs['aacute'] +  glyphs['agrave'] +  glyphs['acircumflex'] +  glyphs['iacute'] +  glyphs['igrave'] +  glyphs['icircumflex'] +  glyphs['uacute'] +  glyphs['ugrave'] +  glyphs['ucircumflex'] +  glyphs['acaron'] +  glyphs['icaron'] +  glyphs['ucaron'] +  glyphs['atilde'] +  glyphs['ntilde'] +  glyphs['itilde'] +  glyphs['utilde'] +  glyphs['adieresis'] +  glyphs['aring'] +  glyphs['amacron'] +  glyphs['abreve'] +  glyphs['idieresis'] +  glyphs['imacron'] +  glyphs['ibreve'] +  glyphs['udieresis'] +  glyphs['uring'] +  glyphs['umacron'] +  glyphs['ubreve'] +   glyphs['aabreve'] +  glyphs['aamacron'] +  glyphs['uubreve'] +  glyphs['uumacron'] +  glyphs['p4'] +  glyphs['p6'] +  glyphs['r1'] 
    + 'ce' + glyphs['egrave'] +  glyphs['eacute'] +  glyphs['ecircumflex'] +  glyphs['ecaron'] +  glyphs['etilde'] +  glyphs['edieresis'] +  glyphs['emacron'] +  glyphs['ebreve'] +  glyphs['ccedilla'] +  glyphs['eebreve'] +  glyphs['eemacron'] +  glyphs['ae'] +  glyphs['oe']
    + 's' + glyphs['scaron'] +  glyphs['s1'] +  glyphs['s1caron']
    + 'p' + glyphs['germandbls'] +  glyphs['p2']
    + 'fq'
    + 'z' + glyphs['z1'] +  glyphs['z1caron'] +  glyphs['f2'] +  glyphs['f3'] +  glyphs['q3'] +  glyphs['zcaron']  
    + 'gjy' + glyphs['dotlessj'] +  glyphs['ij'] +  glyphs['y1'] +  glyphs['ij1'] + glyphs['ygrave'] +  glyphs['yacute'] +  glyphs['ycircumflex'] +  glyphs['ytilde'] +  glyphs['y1grave'] +  glyphs['y1acute'] +  glyphs['y1circumflex'] +  glyphs['y1tilde'] +  glyphs['ydieresis'] +  glyphs['ymacron'] +  glyphs['y1diaeresis'] +  glyphs['y1macron'] 
    + 'bvw' + glyphs['w1']
    + 'o' + glyphs['ograve'] +  glyphs['oacute'] +  glyphs['ocircumflex'] +  glyphs['ocaron'] +  glyphs['otilde'] +  glyphs['odieresis'] +  glyphs['omacron'] +  glyphs['obreve'] +  glyphs['oobreve'] +  glyphs['oomacron'] +  glyphs['oslash']
    + 't'
    + glyphs['f1']
    + glyphs['f4'] + glyphs['f5']
    + glyphs['q1']
    + glyphs['q2']
    + glyphs['r2'];

  var letterglyphs_uc_connected = 
    'HKMRUX' + glyphs['A1'] +  glyphs['M1'] +  glyphs['N1'] +  glyphs['A2'] +  glyphs['M2'] +  glyphs['N2'] +  glyphs['A2grave'] +  glyphs['A2acute'] +  glyphs['A2ring'] +  glyphs['A2tilde'] +  glyphs['A2circumflex'] +  glyphs['A2dieresis'] +  glyphs['A2breve'] +  glyphs['A2macron'] +  glyphs['N2tilde'] +  glyphs['Ugrave'] +  glyphs['Uacute'] +  glyphs['Ucircumflex'] +  glyphs['Udieresis'] +  glyphs['Uring'] +  glyphs['Utilde'] +  glyphs['Ubreve'] +  glyphs['Umacron']
    + 'CEL' + glyphs['C1'] +  glyphs['C1cedilla'] +  glyphs['L1'] + glyphs['Ccedilla'] +  glyphs['Egrave'] +  glyphs['Eacute'] +  glyphs['Ecircumflex'] +  glyphs['Edieresis'] +  glyphs['Ebreve'] +  glyphs['Emacron'] +  glyphs['AE'] +  glyphs['OE']
    + 'QZ' + glyphs['Z1'] + glyphs['Zcaron'] +  glyphs['Z1caron']
    + 'GJY' + glyphs['Y1'] +  glyphs['IJ1'] +  glyphs['G1'] +  glyphs['IJ'] + glyphs['Yacute'] +  glyphs['Ydieresis'] +  glyphs['Ycircumflex'] +  glyphs['Y1acute'] +  glyphs['Y1dieresis'] +  glyphs['Y1circumflex']
    + 'A' + glyphs['Agrave'] +  glyphs['Aacute'] +  glyphs['Aring'] +  glyphs['Atilde'] +  glyphs['Adieresis'] +  glyphs['Abreve'] +  glyphs['Amacron'] +  glyphs['Acircumflex']
    + 'BS' + glyphs['Scaron']
    + 'DOVW' + glyphs['W1'] +  glyphs['Ograve'] +  glyphs['Oacute'] +  glyphs['Ocircumflex'] +  glyphs['Odieresis'] +  glyphs['Otilde'] +  glyphs['Obreve'] +  glyphs['Omacron'] +  glyphs['Oslash']
    + 'FT'
    + 'P'
    + 'I' + glyphs['Igrave'] +  glyphs['Iacute'] +  glyphs['Icircumflex'] +  glyphs['Idieresis'] +  glyphs['Ibreve'] +  glyphs['Imacron']
    + 'N' + glyphs['Ntilde'];

  var letterglyphs_uc_unconnected = ''; 
  var letterglyphs_uc = letterglyphs_uc_connected + letterglyphs_uc_unconnected;
  var letterglyphs = letterglyphs_lc + letterglyphs_uc;
  var connectorglyphs = '';
  for (const [name, glyph] of Object.entries(glyphs)) {
    if (name.length >= 3 && ['cc', 'cs', 'cg', 'ce', 'cf', 'cp'].includes(name.substr(0,2)) && name.indexOf('_') == -1 && !['cedilla', 'ccedilla', 'cent', 'cent.tab'].includes(name)) connectorglyphs += glyph;
  }
  var numberglyphs = Object.values(numerals).join('');
  

  var lig_mapping = {};

   
  /* Schoolschrijver can be initialized with a setting object,
   * or with an element. If an element is provided, we look 
   * for attributes like data-schoolschrijver-t-variant=1 
   * in that element and every ancestor. These data attributes
   * overrule the settings object.
   */
  function init(the_settings, element) {
    the_settings = the_settings || {};

    for (key in settings) {
      // first check object
      if (key in the_settings) {
        settings[key] = the_settings[key];
      }
      // then check element and ancestors for data attributes (overrules object)
      if (element) {
        var name = key.replace(/_/g, '-');
        var p = $(element).closest('[data-cogncur-'+name+']');
        if (p.length) {
          settings[key] = p.data('cogncur-'+name);
        }
        
      }
    }

    // In the stylistic sets, 'fq' are a combined setting.
    // In Javascript, you can choose between using the combined setting or using settings per letter.
    if (settings.fq_connection_variant) {
      settings.f_connection_variant = settings.fq_connection_variant;
      settings.q_connection_variant = settings.fq_connection_variant;
    }
    if (settings.fq_continuity_variant) {
      settings.f_continuity_variant = settings.fq_continuity_variant;
      settings.q_continuity_variant = settings.fq_continuity_variant;
    }
    
    if (settings.numeral_variants_set1 == 1 && settings.numeral_variants_set2 == 0) {
      settings.numeral_1_variant = 1;
      settings.numeral_3_variant = 1;
      settings.numeral_4_variant = 1;
      settings.numeral_7_variant = 1;
      settings.numeral_8_variant = 1;
      settings.numeral_9_variant = 1;
    } else if (settings.numeral_variants_set1 == 0 && settings.numeral_variants_set2 == 1) {
      settings.numeral_2_variant = 1;
      settings.numeral_4_variant = 2;
      settings.numeral_7_variant = 2;
      settings.numeral_8_variant = 2;
    } else if (settings.numeral_variants_set1 == 1 && settings.numeral_variants_set2 == 1) {
      settings.numeral_1_variant = 1;
      settings.numeral_2_variant = 1;
      settings.numeral_3_variant = 1;
      settings.numeral_4_variant = 3;
      settings.numeral_7_variant = 3;
      settings.numeral_8_variant = 1;
      settings.numeral_9_variant = 1;
    }

    init_substitutions();
    
    
    return settings;
  };

  var substitutions = {};
     
  function init_substitutions() {
    var to_mapping = {
      a : 'a',
      agrave : 'a',
      aacute : 'a',
      acircumflex : 'a',
      atilde : 'a',
      adieresis : 'a',
      aring : 'a',
      amacron : 'a',
      abreve : 'a',
      acaron : 'a',
      b : 'h',
      c : 'o',
      ccedilla : 'o',
      d : 'a',
      dotlessi : 'i',
      dotlessj : 'i',
      e : 'e',
      egrave : 'e',
      eacute : 'e',
      ecircumflex : 'e',
      etilde : 'e',
      edieresis : 'e',
      emacron : 'e',
      ebreve : 'e',
      ecaron : 'e',
      f : 'h',
      g : 'a',
      h : 'h',
      i : 'i',
      igrave : 'i',
      iacute : 'i',
      icircumflex : 'i',
      idieresis : 'i',
      imacron : 'i',
      ibreve : 'i',
      icaron : 'i',
      j : 'i',
      k : 'h',
      l : 'h',
      m : 'n',
      n : 'n',
      ntilde : 'n',
      o : 'o',
      ograve : 'o',
      oacute : 'o',
      ocircumflex : 'o',
      otilde : 'o',
      odieresis : 'o',
      omacron : 'o',
      obreve : 'o',
      ocaron : 'o',
      oe : 'o',
      p : 'i',
      q : 'a',
      r : 'n',
      s : 's',
      scaron : 's',
      t : 't',
      u : 'i',
      ugrave : 'i',
      uacute : 'i',
      ucircumflex : 'i',
      udieresis : 'i',
      umacron : 'i',
      ubreve : 'i',
      ucaron : 'i',
      v : 'n',
      w : 'i',
      x : 'n',
      y : 'n',
      ygrave : 'n',
      yacute : 'n',
      ycircumflex : 'n',
      ytilde : 'n',
      ydieresis : 'n',
      ymacron : 'n',
      z : 'n',
      zcaron : 'n',
      ij : 'n',
      aabreve : 'a',
      aamacron : 'a',
      ae : 'a', 
      eebreve : 'e',
      eemacron : 'e',
      f1 : 'h',
      f2 : 'h',
      f4 : 'h',
      ij1 : 'i',
      oomacron : 'o',
      oobreve : 'o',
      p2 : 'n',
      p4 : 'i',
      p6 : 'n',
      q1 : 'a',
      q2 : 'a',
      q3 : 'a',
      r1 : 'i',
      r2 : 'n',
      s1 : 's1',
      s1caron : 's1',
      t1 : 't1',
      uubreve : 'i',
      uumacron : 'i',
      w1 : 'n',
      y1 : 'i',
      y1acute : 'i',
      y1grave : 'i',
      y1circumflex : 'i',
      y1diaeresis : 'i',
      y1tilde : 'i',
      y1macron : 'i',
      z1 : 'i',
      z1caron : 'i',
      germandbls : 'i',
    };
    
    // initialize empty subtables
    substitutions['beginning'] = {};
    substitutions['alone'] = {};
    for (const [class_name, class_string] of Object.entries(back_classes)) {
      substitutions['after-'+class_name+'-continued'] = {};
      substitutions['after-'+class_name+'-end'] = {};
    }
    
    for (const [letter, as_letter] of Object.entries(to_mapping)) {
      glyph = glyphs[letter];
      start_piece = modify_start_piece(letter, 'cg'+as_letter);
      // console.log('glyph: ', glyph, ', letter: ', letter, ', start_piece: ', start_piece, ', orig: cg' + as_letter);
      if (typeof glyphs[start_piece] == 'undefined' && console) console.log('ERROR: start piece undefined, glyph: ', glyph, 'letter: ', letter)
      
      for (const [back_class_name, back_class_string] of Object.entries(back_classes)) {
        if (back_class_string.includes(glyph)) {
          end_piece = modify_end_piece(letter, 'ce'+back_class_name);
          if (typeof glyphs[end_piece] == 'undefined' && console) console.log('ERROR:  end piece undefined, glyph: ', glyph, ', back_class_name: ', back_class_name, ', back_class_string: ', back_class_string);
          for (const [class_name, class_string] of Object.entries(back_classes)) {
            connector = 'cc'+class_name+as_letter;
            substitutions['after-' + class_name + '-continued'][glyph] = glyphs[connector] + glyph;
            substitutions['after-' + class_name + '-end'][glyph] = glyphs[connector] + glyph + glyphs[end_piece];
          }
          substitutions['alone'][glyph] = glyphs[start_piece] + glyph + glyphs[end_piece];

        }          
      }
      if (glyphs[start_piece + '_' + letter]) { // initial ligature exists
        lig_mapping[glyphs[start_piece] + glyph] = glyphs[start_piece + '_' + letter];
        letterglyphs += glyphs[start_piece + '_' + letter];
      }

      substitutions['beginning'][glyph] = glyphs[start_piece] + glyph;
      
    }
    
    modify_substitutions();
    add_uppercase_alone();
    
  }
  
  // overrule defaults below:
  function modify_start_piece(letter, start_piece) {
    if (letter == 'z' || letter == 'zcaron') start_piece = 'cgz';
    if (letter == 'z1' || letter == 'z1caron') start_piece = 'cgz1';
    if (letter == 'p' || letter == 'p4') start_piece = 'cgp';
    if (letter == 'j' || letter == 'dotlessj') start_piece = 'cgj';
    if (['f', 'f1', 'f2', 'f3', 'f4', 'f5'].includes(letter)) start_piece = 'cgf';
    if (letter == 'g') start_piece = 'cgg';
    if (letter == 'germandbls') start_piece = 'cggermandbls';
    if (['ij', 'y', 'yacute', 'ygrave', 'ycircumflex', 'ymacron', 'ytilde'].includes(letter)) start_piece = 'cgy';
    if (['ij1', 'y1', 'y1acute', 'y1grave', 'y1circumflex', 'y1macron', 'y1tilde'].includes(letter)) start_piece = 'cgy1';
    
    
    if (settings.entrystrokes) {
      start_piece = start_piece.replace('cg', 'cs');
    }
    return start_piece;
  }
  function modify_end_piece(letter, end_piece) {
    if (letter == 'r2') end_piece = 'cer2';
    if (letter == 'germandbls') end_piece = 'cegermandbls';
    if (letter == 'f') end_piece = 'cef';
    if (letter == 't' && settings.t_variant) end_piece = 'cet1';
    if (['l'].includes(letter)) end_piece = 'ceH';
    if (['h', 'k'].includes(letter)) end_piece = 'ceh';
    if (['d', 'i'].includes(letter)) end_piece = 'ced';
    if (['ij', 'j', 'ij1'].includes(letter)) end_piece = 'cej';
  
    if (end_piece == 'cez') end_piece = 'ceq'; // cgz does not exist

    if (settings.exitstrokes && end_piece == 'cer2') end_piece = 'cfr2';
    if (settings.exitstrokes && end_piece == 'ces') end_piece = 'cfs';
    if (settings.exitstrokes && end_piece == 'cep') end_piece = 'cfp';
    if (settings.exitstrokes && end_piece == 'cegermandbls') end_piece = 'cfgermandbls';
    
    return end_piece;
  }
  function modify_substitutions() {
    // first, copy the 'after-q' subtables to 'after-z' (since cczX glyphs don't actually exist)
    for (const [match, substitution] of Object.entries(substitutions['after-z-continued'])) {
      substitutions['after-z-continued'][match] = substitutions['after-q-continued'][match];
      substitutions['after-z-end'][match] = substitutions['after-q-end'][match];
    }
    // then, modify the connection from q to j (but only for the real after-q subtable, not for the copied after-z subtables)
    substitutions['after-q-continued']['j'] = glyphs['ccqj'] + 'j';
    substitutions['after-q-end']['j'] = glyphs['ccqj'] + 'j' + glyphs['ceg'];
  }
  
  function add_uppercase_alone() {
    substitutions['alone']['A'] = glyphs['A'] + glyphs['ceA'];
    substitutions['alone'][glyphs['A1']] = glyphs['A1'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Aacute']] = glyphs['Aacute'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Agrave']] = glyphs['Agrave'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Atilde']] = glyphs['Atilde'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Aring']] = glyphs['Aring'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Acircumflex']] = glyphs['Acircumflex'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Adieresis']] = glyphs['Adieresis'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Abreve']] = glyphs['Abreve'] + glyphs['ceA'];
    substitutions['alone'][glyphs['Amacron']] = glyphs['Amacron'] + glyphs['ceA'];
    substitutions['alone'][glyphs['AE']] = glyphs['AE'] + glyphs['ceE'];
    substitutions['alone']['B'] = glyphs['B'] + glyphs['ceB'];
    substitutions['alone']['C'] = glyphs['C'] + glyphs['ceC'];
    substitutions['alone']['Ccedilla'] = glyphs['Ccedilla'] + glyphs['ceC'];
    substitutions['alone']['D'] = glyphs['D'] + glyphs['ceD'];
    substitutions['alone']['E'] = glyphs['E'] + glyphs['ceE'];
    substitutions['alone']['Eacute'] = glyphs['Eacute'] + glyphs['ceE'];
    substitutions['alone']['Egrave'] = glyphs['Egrave'] + glyphs['ceE'];
    substitutions['alone']['Etilde'] = glyphs['Etilde'] + glyphs['ceE'];
    substitutions['alone']['Ecircumflex'] = glyphs['Ecircumfelx'] + glyphs['ceE'];
    substitutions['alone']['Edieresis'] = glyphs['Edieresis'] + glyphs['ceE'];
    substitutions['alone']['Ebreve'] = glyphs['Ebreve'] + glyphs['ceE'];
    substitutions['alone']['Emacron'] = glyphs['Emacron'] + glyphs['ceE'];
    substitutions['alone']['F'] = glyphs['F'] + glyphs['ceF'];
    substitutions['alone']['G'] = glyphs['G'] + glyphs['ceg'];
    substitutions['alone']['H'] = glyphs['H'] + glyphs['ceH'];
    substitutions['alone']['I'] = glyphs['I'] + glyphs['ceI'];
    substitutions['alone']['Iacute'] = glyphs['Iacute'] + glyphs['ceI'];
    substitutions['alone']['Igrave'] = glyphs['Igrave'] + glyphs['ceI'];
    substitutions['alone']['Icircumflex'] = glyphs['Icircumflex'] + glyphs['ceI'];
    substitutions['alone']['Idieresis'] = glyphs['Idieresis'] + glyphs['ceI'];
    substitutions['alone']['Ibreve'] = glyphs['Ibreve'] + glyphs['ceI'];
    substitutions['alone']['Imacron'] = glyphs['Imacron'] + glyphs['ceI'];
    substitutions['alone']['IJ'] = glyphs['IJ'] + glyphs['cej'];
    substitutions['alone']['J'] = glyphs['J'] + glyphs['cej'];
    substitutions['alone']['K'] = glyphs['K'] + glyphs['ced'];
    substitutions['alone']['L'] = glyphs['L'] + glyphs['ceC'];
    substitutions['alone']['M'] = glyphs['M'] + glyphs['ceM'];
    substitutions['alone']['N'] = glyphs['N'] + glyphs['ceN'];
    substitutions['alone']['Ntilde'] = glyphs['Ntilde'] + glyphs['ceN'];
    substitutions['alone']['O'] = glyphs['O'] + glyphs['ceO'];
    substitutions['alone']['Oacute'] = glyphs['Oacute'] + glyphs['ceO'];
    substitutions['alone']['Ograve'] = glyphs['Ograve'] + glyphs['ceO'];
    substitutions['alone']['Otilde'] = glyphs['Otilde'] + glyphs['ceO'];
    substitutions['alone']['Ocircumflex'] = glyphs['Ocircumfelx'] + glyphs['ceO'];
    substitutions['alone']['Odieresis'] = glyphs['Odieresis'] + glyphs['ceO'];
    substitutions['alone']['Obreve'] = glyphs['Obreve'] + glyphs['ceO'];
    substitutions['alone']['Omacron'] = glyphs['Omacron'] + glyphs['ceO'];
    substitutions['alone']['OE'] = glyphs['OE'] + glyphs['ceE'];
    substitutions['alone']['P'] = glyphs['P'] + glyphs['ceP'];
    substitutions['alone']['Q'] = glyphs['Q'] + glyphs['ceQ'];
    substitutions['alone']['R'] = glyphs['R'] + glyphs['ced'];
    substitutions['alone']['S'] = glyphs['S'] + glyphs['ceB'];
    substitutions['alone']['Scaron'] = glyphs['Scaron'] + glyphs['ceB'];
    substitutions['alone']['T'] = glyphs['T'] + glyphs['ceF'];
    substitutions['alone']['U'] = glyphs['U'] + glyphs['ced'];
    substitutions['alone']['Uacute'] = glyphs['Uacute'] + glyphs['ced'];
    substitutions['alone']['Ugrave'] = glyphs['Ugrave'] + glyphs['ced'];
    substitutions['alone']['Ucircumflex'] = glyphs['Ucircumflex'] + glyphs['ced'];
    substitutions['alone']['Utilde'] = glyphs['Utilde'] + glyphs['ced'];
    substitutions['alone']['Uring'] = glyphs['Uring'] + glyphs['ced'];
    substitutions['alone']['Udieresis'] = glyphs['Udieresis'] + glyphs['ced'];
    substitutions['alone']['Ubreve'] = glyphs['Ubreve'] + glyphs['ced'];
    substitutions['alone']['Umacron'] = glyphs['Umacron'] + glyphs['ced'];
    substitutions['alone']['V'] = glyphs['V'] + glyphs['ceO'];
    substitutions['alone']['W'] = glyphs['W'] + glyphs['ceO'];
    substitutions['alone']['X'] = glyphs['X'] + glyphs['ced'];
    substitutions['alone']['Y'] = glyphs['Y'] + glyphs['cej'];
    substitutions['alone']['Yacute'] = glyphs['Yacute'] + glyphs['cej'];
    substitutions['alone']['Ycircumflex'] = glyphs['Ycircumflex'] + glyphs['cej'];
    substitutions['alone']['Ydieresis'] = glyphs['Ydieresis'] + glyphs['cej'];
    substitutions['alone']['Z'] = glyphs['Z'] + glyphs['ceQ'];
    substitutions['alone']['Zcaron'] = glyphs['Zcaron'] + glyphs['ceQ'];
    // variants C, G, L, Z1, Y1, IJ1, W1 not needed here because they are substituted after calt completes
    substitutions['alone']['A1'] = glyphs['A1'] + glyphs['ced'];
    substitutions['alone']['A2'] = glyphs['A2'] + glyphs['ced'];
    substitutions['alone']['A2grave'] = glyphs['A2grave'] + glyphs['ced'];
    substitutions['alone']['A2acute'] = glyphs['A2acute'] + glyphs['ced'];
    substitutions['alone']['A2circumflex'] = glyphs['A2circumflex'] + glyphs['ced'];
    substitutions['alone']['A2dieresis'] = glyphs['A2dieresis'] + glyphs['ced'];
    substitutions['alone']['A2ring'] = glyphs['A2ring'] + glyphs['ced'];
    substitutions['alone']['A2tilde'] = glyphs['A2tilde'] + glyphs['ced'];
    substitutions['alone']['A2breve'] = glyphs['A2breve'] + glyphs['ced'];
    substitutions['alone']['A2macron'] = glyphs['A2macron'] + glyphs['ced'];
    substitutions['alone']['M1'] = glyphs['M1'] + glyphs['ced'];
    substitutions['alone']['M2'] = glyphs['M2'] + glyphs['ced'];
    substitutions['alone']['N1'] = glyphs['N1'] + glyphs['ced'];
    substitutions['alone']['N2'] = glyphs['N2'] + glyphs['ced'];
    substitutions['alone']['N2tilde'] = glyphs['N2tilde'] + glyphs['ced'];
  }

     
  function convert(input) {
    var result = input;

    result = lettersConversion1(result);
    result = quotesConversion(result);
    
    result = " " + result + " "; // add extra space

    // NB convert_calt also handles the 'entrystrokes' setting   
    result = convert_calt(result);

    result = lettersConversion2(result);

    result = dotlessConversion(result);
    
    result = fixwhitespaceligaturesConversion(result);
    
    result = numeralsConversion(result);
    
    // ONLY trim off the space we added at the start
    if (result.substring(0,1) == " " || result.substring(0,1) == numerals['space.tab'] || result.substring(0,1) == numerals['space.tab.old']) result = result.substring(1);
    if (result.substring(result.length - 1) == " " || result.substring(result.length - 1) == numerals['space.tab'] || result.substring(result.length - 1) == numerals['space.tab.old']) result = result.substring(0,result.length - 1);
    return result;
  }

  function convert_calt(input) {
    var result = '';
    var c, c_minus_1, c_minus_2;
    for (var character of input) {
      if (c_minus_1) c_minus_2 = c_minus_1;
      if (c) c_minus_1 = c

      c = character;
      
      if (c_minus_1) result = result + convert_char(c_minus_2, c_minus_1, c);
    }
  
    result = result + convert_char(c_minus_1, c);
    return result;
  }
  
  // Convert one character at a time, based on context
  function convert_char(prev, current, next) {
    if (next && letterglyphs_lc.includes(next) && letterglyphs_lc.includes(current)) {
      for (const [class_name, class_string] of Object.entries(back_classes)) {
        if (prev && class_string.includes(prev)) {
          //if (console) console.log('convert_char (lowercase) prev = ', prev, ', current = ', current, ', next = ', next, ', subtable = ', 'after-' + class_name + '-continued', 'result = ', substitutions['after-' + class_name + '-continued'][current]);
          return substitutions['after-' + class_name + '-continued'][current];
        }          
      }
      // still here? then it's a beginning letter
      //if (console) console.log('convert_char (lowercase) prev = ', prev, ', current = ', current, ', next = ', next, ', subtable = beginning, result = ', substitutions['beginning'][current]);
      return substitutions['beginning'][current];
      
    } else if (letterglyphs_lc.includes(current)) {
      for (const [class_name, class_string] of Object.entries(back_classes)) {
        if (prev && class_string.includes(prev)) {
          //if (console) console.log('convert_char (lowercase) prev = ', prev, ', current = ', current, ', next = ', next, ', subtable = ', 'after-' + class_name + '-end', 'result = ', substitutions['after-' + class_name + '-end'][current]);
          return substitutions['after-' + class_name + '-end'][current];
        }          
      }
      // still here? Then it's a solitary letter
      //if (console) console.log('convert_char (lowercase) prev = ', prev, ', current = ', current, ', next = ', next, ', subtable = alone, result = ', substitutions['alone'][current]);
      return substitutions['alone'][current];
    }
    
    // uppercase
    if (next && letterglyphs_lc.includes(next) && letterglyphs_uc_connected.includes(current)) {
      //if (console) console.log('convert_char (uppercase) prev = ', prev, ', current = ', current, ', next = ', next, ', unchanged');
      return current;
      // leave letter unchanged
    } else if (letterglyphs_uc_connected.includes(current)) {
      //if (console) console.log('convert_char (uppercase) prev = ', prev, ', current = ', current, ', next = ', next, ', subtable = alone, result = ', substitutions['alone'][current]);
      return substitutions['alone'][current];
    }
    
    //if (console) console.log('convert_char (unmatched letter) prev = ', prev, ', current = ', current, ', next = ', next, ', unchanged');
    return current;
  }

  function lettersConversion1(input) {
    // In this function, convert all letters that require different connecting strokes than the standard version of the letter.
    // The letters produced by this function need to be matched by the function inserting the connecting strokes
    if (settings.t_variant >= 1) {
      input = input.replace(/t/g, glyphs.t1);
    }

    if (settings.ij_ligature == 1) {
      input = input.replace(/ij/g, glyphs.ij);
      input = input.replace(/IJ/g, glyphs.IJ);
    }

    if (settings.uppercase_amn_variant == 1) {
      input = input.replaceAll('A', glyphs.A1);
      input = input.replaceAll('M', glyphs.M1);
      input = input.replaceAll('N', glyphs.N1);
    }
    if (settings.uppercase_amn_variant == 2) {
      input = input.replace(/A/g, glyphs.A2);
      input = input.replaceAll(glyphs.Agrave, glyphs.A2grave);
      input = input.replaceAll(glyphs.Aacute, glyphs.A2acute);
      input = input.replaceAll(glyphs.Acircumflex, glyphs.A2circumflex);
      input = input.replaceAll(glyphs.Atilde, glyphs.A2tilde);
      input = input.replaceAll(glyphs.Amacron, glyphs.A2macron);
      input = input.replaceAll(glyphs.Abreve, glyphs.A2breve);
      input = input.replaceAll(glyphs.Adieresis, glyphs.A2dieresis);
      input = input.replaceAll(glyphs.Aring, glyphs.A2ring);
      input = input.replace(/M/g, glyphs.M2);
      input = input.replace(/N/g, glyphs.N2);
      input = input.replaceAll(glyphs.Ntilde, glyphs.N2tilde);
    }
    if (settings.r_variant == 1) {
      input = input.replace(/r/g, glyphs.r2);
    }

    if (settings.rz_top_variant == 1) {
      input = input.replace(/r/g, glyphs.r1);
      input = input.replace(/z/g, glyphs.z1);
      input = input.replace(/ž/g, glyphs.z1caron);
    }

    if (settings.s_variant == 1) { 
      input = input.replaceAll('s', glyphs.s1);
      input = input.replaceAll(glyphs.scaron, glyphs.s1caron);
    }

    if (settings.f_connection_variant == 1) {
      if (settings.f_continuity_variant == 1) {
        input = input.replaceAll('f', glyphs.f4);
      } else {
        input = input.replaceAll('f', glyphs.f1);
      }
    }

    if (settings.q_connection_variant == 1 && settings.q_continuity_variant == 0) {
      if (settings.stick_variant == 1) {
        input = input.replaceAll('q', glyphs.q2);
      } else {
        input = input.replaceAll('q', glyphs.q1); // yes, this shorter stick is actually relevant for the connections
      }
    }
    
    if (settings.y_variant == 1) {
      input = input.replaceAll('y', glyphs.y1);
      input = input.replaceAll(glyphs.ygrave, glyphs.y1grave);
      input = input.replaceAll(glyphs.yacute, glyphs.y1acute);
      input = input.replaceAll(glyphs.ycircumflex, glyphs.y1circumflex);
      input = input.replaceAll(glyphs.ytilde, glyphs.y1tilde);
      input = input.replaceAll(glyphs.ydieresis, glyphs.y1diaeresis);
      input = input.replaceAll(glyphs.ymacron, glyphs.y1macron);
      input = input.replaceAll(glyphs.ij, glyphs.ij1);
      
    } // note that Y will be replaced in lettersConversion2
    
    if (settings.w_variant == 1) {
      input = input.replace(/w/g, glyphs.w1);
    }
    
    if (settings.p_curve_variant == 1) {
      input = input.replaceAll('p', glyphs.p2);
    }
    if (settings.p_open_variant == 1) {
      input = input.replaceAll('p', glyphs.p4);
      input = input.replaceAll(glyphs.p2, glyphs.p6);
    }
    
    // standard ligatures, do them always...
    if (settings.standard_ligatures == 1) {
      input = input.replaceAll(glyphs.abreve + glyphs.abreve, glyphs.aabreve);
      input = input.replaceAll(glyphs.ebreve + glyphs.ebreve, glyphs.eebreve);
      input = input.replaceAll(glyphs.obreve + glyphs.obreve, glyphs.oobreve);
      input = input.replaceAll(glyphs.ubreve + glyphs.ubreve, glyphs.uubreve);
      input = input.replaceAll(glyphs.amacron + glyphs.amacron, glyphs.aamacron);
      input = input.replaceAll(glyphs.emacron + glyphs.emacron, glyphs.eemacron);
      input = input.replaceAll(glyphs.omacron + glyphs.omacron, glyphs.oomacron);
      input = input.replaceAll(glyphs.umacron + glyphs.umacron, glyphs.uumacron);
      
    }

    return input;
  }
  function lettersConversion2(input) {
    // In this function, convert all letters that have no impact on the connecting strokes used.
    // This function will be called with connecting strokes already in place.
    if (settings.y_variant == 1) {
      input = input.replaceAll('Y', glyphs.Y1);
      input = input.replaceAll(glyphs.Yacute, glyphs.Y1acute);
      input = input.replaceAll(glyphs.Ycircumflex, glyphs.Y1circumflex);
      input = input.replaceAll(glyphs.Ydieresis, glyphs.Y1dieresis);
      input = input.replaceAll('IJ', glyphs.IJ1);
    }
    if (settings.w_variant == 1) {
      input = input.replaceAll('W', glyphs.W1);
    }
    if (settings.rz_top_variant == 1) {
      input = input.replaceAll('Z', glyphs.Z1);
    }
    if (settings.uppercase_cgl_variant == 1) {
      input = input.replaceAll('C', glyphs.C1);
      input = input.replaceAll('Ç', glyphs.C1cedilla);
      input = input.replaceAll('G' + glyphs.ceg, glyphs.G1 + glyphs.ceG1);
      input = input.replaceAll('G', glyphs.G1);
      input = input.replaceAll('L', glyphs.L1);
      input = input.replaceAll(glyphs.ceC, glyphs.ceC1); // for kerning with the question mark
    }

    
    if (settings.t_variant == 2) { 
      input = input.replaceAll(glyphs.ccAt1, glyphs.ccAi);
      input = input.replaceAll(glyphs.ccBt1, glyphs.ccBi);
      input = input.replaceAll(glyphs.ccet1, glyphs.ccei);
      input = input.replaceAll(glyphs.ccFt1, glyphs.ccFi);
      input = input.replaceAll(glyphs.ccgt1, glyphs.ccgi);
      input = input.replaceAll(glyphs.ccIt1, glyphs.ccIi);
      input = input.replaceAll(glyphs.ccNt1, glyphs.ccNi);
      input = input.replaceAll(glyphs.ccnt1, glyphs.ccni);
      input = input.replaceAll(glyphs.ccOt1, glyphs.ccOi);
      input = input.replaceAll(glyphs.ccot1, glyphs.ccoi);
      input = input.replaceAll(glyphs.ccPt1, glyphs.ccPi);
      input = input.replaceAll(glyphs.ccpt1, glyphs.ccpi);
      input = input.replaceAll(glyphs.ccqt1, glyphs.ccqi);
      input = input.replaceAll(glyphs.ccst1, glyphs.ccsi);
      input = input.replaceAll(glyphs.cctt1, glyphs.ccti);
      input = input.replaceAll(glyphs.ccvt1, glyphs.ccvi);
      input = input.replaceAll(glyphs.cgt1, glyphs.cgi);
      
    }

    if (settings.undercurves) { 
      input = input.replaceAll(glyphs.ccAi, glyphs.ccAt1);
      input = input.replaceAll(glyphs.ccBi, glyphs.ccBt1);
      input = input.replaceAll(glyphs.ccei, glyphs.ccet1);
      input = input.replaceAll(glyphs.ccFi, glyphs.ccFt1);
      input = input.replaceAll(glyphs.ccgi, glyphs.ccgt1);
      input = input.replaceAll(glyphs.ccIi, glyphs.ccIt1);
      input = input.replaceAll(glyphs.ccNi, glyphs.ccNt1);
      input = input.replaceAll(glyphs.ccni, glyphs.ccnt1);
      input = input.replaceAll(glyphs.ccOi, glyphs.ccOt1);
      input = input.replaceAll(glyphs.ccoi, glyphs.ccot1);
      input = input.replaceAll(glyphs.ccPi, glyphs.ccPt1);
      input = input.replaceAll(glyphs.ccpi, glyphs.ccpt1);
      input = input.replaceAll(glyphs.ccqi, glyphs.ccqt1);
      input = input.replaceAll(glyphs.ccsi, glyphs.ccst1);
      input = input.replaceAll(glyphs.ccti, glyphs.cctt1);
      input = input.replaceAll(glyphs.ccvi, glyphs.ccvt1);
      input = input.replaceAll(glyphs.cgi, glyphs.cgt1);
      input = input.replaceAll(glyphs.cgp, glyphs.cgt1);
      input = input.replaceAll(glyphs.cgy1, glyphs.cgt1);
      input = input.replaceAll(glyphs.cgj, glyphs.cgt1);
    }

    if (settings.f_continuity_variant == 1) {
      input = input.replaceAll('f'+glyphs.ccqj, glyphs.f2+glyphs.ccqi);
      input = input.replaceAll('f', glyphs.f2);
      input = input.replaceAll(glyphs.cef, glyphs.cef2);
    }


    if (settings.q_continuity_variant == 1) {
      input = input.replaceAll('q'+glyphs.ceq, 'q'+glyphs.ceq3); // NB ceq is also used after z
      input = input.replaceAll('q', glyphs.q3);

      input = input.replaceAll(glyphs.ccqj, glyphs.ccqi); // the special 'extra wide' connection is not needed if the q doesn't have a loop but just a stick
    }


    if (settings.stick_variant == 1) {
      input = input.replaceAll('d', glyphs.d1);
      input = input.replaceAll('p', glyphs.p1);
      input = input.replaceAll(glyphs.p2, glyphs.p3);
      input = input.replaceAll(glyphs.p4, glyphs.p5);
      input = input.replaceAll(glyphs.p6, glyphs.p7);
      input = input.replaceAll(glyphs.f2, glyphs.f3);
      input = input.replaceAll(glyphs.f4, glyphs.f5);
      input = input.replaceAll(glyphs.q3, glyphs.q4);
      
      input = input.replaceAll(fix_whitespace_ligatures.csa_d, fix_whitespace_ligatures.csa_d1);
      input = input.replaceAll(fix_whitespace_ligatures.csp_p, fix_whitespace_ligatures.csp_p1);
      input = input.replaceAll(fix_whitespace_ligatures.csn_p2, fix_whitespace_ligatures.csn_p3);
      input = input.replaceAll(fix_whitespace_ligatures.csp_p4, fix_whitespace_ligatures.csp_p5);
      input = input.replaceAll(fix_whitespace_ligatures.csn_p6, fix_whitespace_ligatures.csn_p7);
      input = input.replaceAll(fix_whitespace_ligatures.csf_f4, fix_whitespace_ligatures.csf_f5);
      input = input.replaceAll(fix_whitespace_ligatures.csf_f2, fix_whitespace_ligatures.csf_f3);
      input = input.replaceAll(fix_whitespace_ligatures.csa_q3, fix_whitespace_ligatures.csa_q4);
    }
    

    return input;
  }

 
  function numeralsConversion(input) {
    
    
    if (settings.numeral_1_variant) input = input.replaceAll('1', numerals['one.alt'+settings.numeral_1_variant]);
    if (settings.numeral_2_variant) input = input.replaceAll('2', numerals['two.alt'+settings.numeral_2_variant]);
    if (settings.numeral_3_variant) input = input.replaceAll('3', numerals['three.alt'+settings.numeral_3_variant]);
    if (settings.numeral_4_variant) input = input.replaceAll('4', numerals['four.alt'+settings.numeral_4_variant]);
    if (settings.numeral_7_variant) input = input.replaceAll('7', numerals['seven.alt'+settings.numeral_7_variant]);
    if (settings.numeral_8_variant) input = input.replaceAll('8', numerals['eight.alt'+settings.numeral_8_variant]);
    if (settings.numeral_9_variant) input = input.replaceAll('9', numerals['nine.alt'+settings.numeral_9_variant]);
    
    // loop over all possible numerals
    Object.keys(numerals).forEach(function (key) { 
      if (key.indexOf('.tab') >  -1) return; // ignore if it's a style variant
      if (key.indexOf('.old') >  -1) return; // ignore if it's a style variant
      
      if (key == 'space' && settings.numerals_tabular_dont_replace_space) return;
      
      // OK, only standard style numerals left now
      if (settings.numerals_tabular && settings.numerals_oldstyle && (key+'.tab.old') in numerals) {
        input = input.replaceAll(numerals[key], numerals[key+'.tab.old']);
      } else if (settings.numerals_tabular && (key+'.tab') in numerals) {
        input = input.replaceAll(numerals[key], numerals[key+'.tab']);
      } else if (settings.numerals_oldstyle && (key+'.old') in numerals) {
        input = input.replaceAll(numerals[key], numerals[key+'.old']);
      }
      
    });
    
    // also, if we have tabular numbers, change &nbsp; into space.tab
    if (settings.numerals_tabular && settings.numerals_oldstyle) {
      input = input.replaceAll('\u00a0', numerals['space.tab.old']);
    } else if (settings.numerals_tabular) {
      input = input.replaceAll('\u00a0', numerals['space.tab']);
    }
    
    return input;
  }

  function dotlessConversion(input) {
    // i => dotlessi, j => dotless j, t => custom glyph t without crossbar
    if (settings.nodots >= 1) {
      input = input.replaceAll('i', glyphs.dotlessi);
      input = input.replaceAll('j', glyphs.dotlessj);
    }
    if (settings.nodots >= 2) {
      input = input.replaceAll(glyphs.t1, glyphs.t1dotless);
      input = input.replaceAll('x', glyphs.xdotless);
    }
    return input;
  }

  function fixwhitespaceligaturesConversion(input) {
    if (settings.initial_ligatures) {
      return add_initial_ligatures(input);
    } else {
      return remove_initial_ligatures(input);
    }
  }
  
  function add_initial_ligatures(input) {
    // replace didactic starting strokes with empty entry strokes
    input = input.replaceAll(glyphs.cpo, glyphs.cso);
    input = input.replaceAll(glyphs.cpa, glyphs.csa);
    input = input.replaceAll(glyphs.cpt1, glyphs.cst1);
    input = input.replaceAll(glyphs.cpg, glyphs.csg);
    
    // add initial ligatures
    for (const [glyphs, ligature] of Object.entries(lig_mapping)) {
      input = input.replaceAll(glyphs, ligature);
    }
    return input;
  }
  
  // NB this function can be called from lusletters_lines.js (after wordfade), so should accept 'fully converted' input
  // NB2 this function will also replace the 'empty' entry strokes with didactic (word overlapping) entry strokes cpa/cpo/cpt1 etc..
  function remove_initial_ligatures(input) {
    for (const [glyphs, ligature] of Object.entries(lig_mapping)) {
      input = input.replaceAll(ligature, glyphs);
    }
    input = input.replaceAll(glyphs.cso, glyphs.cpo);
    input = input.replaceAll(glyphs.csa, glyphs.cpa);
    input = input.replaceAll(glyphs.cst1, glyphs.cpt1);
    input = input.replaceAll(glyphs.csg, glyphs.cpg);
    return input;
  }

  function quotesConversion(input) {
    var singleopen, singleclose, doubleopen, doubleclose;
    
    if (settings.smartquotes) {
      if (settings.smartquotes == 2) {
        singleopen = '\u201A'; singleclose = '’'; doubleopen = '\u201E'; doubleclose = '”';
      } else if (settings.smartquotes == 3) {
        singleopen = '\u201A'; singleclose = '‘'; doubleopen = '\u201E'; doubleclose = '“';
      } else if (settings.smartquotes == 4) {
        singleopen = '‹'; singleclose = '›'; doubleopen = '«'; doubleclose = '»';
      } else {
        singleopen = '‘'; singleclose = '’'; doubleopen = '“'; doubleclose = '”';
      }

      /*
      - if it's <letter>'<letter> or <s>'<space>, assume it's an apostrophe.
      - otherwise it's a quote. How to determine opening versus closing quote? Should they match up?
        - or just: opening quote is <space>'<letter_or_opening_interpunction>, closing quote is everything else (not opening quote, not apostrophe) [opening_interpunction are those upside down question mark and upside down exclamation mark]
      */
      // ' and ": after a space or at beginning of the string, it's an opening quote      
      input = input.replace(/(^|\s)'/g, '$1' + singleopen); 
      input = input.replace(/(^|\s)"/g, '$1' + doubleopen);
      // ": before a space or at the end of the string, it's a closing quote
      input = input.replace(/"(\s|$)/g, doubleclose + '$1');
      // ': if not after an s ("Parents' wishes") and before a space or at the end of the string, it's a closing quote
      input = input.replace(/([^s])'(\s|$)/g, '$1' + singleclose + '$2');
      // ': after an s and before a space, but also after an opening quote on the same line, it's a closing quote
      // (please, for the love of god, use double quotes if you're going to have an apostrophe inside a quote, OK?!?)
      var zoek = new RegExp(singleopen + '([^\n\r\'' + singleclose + ']+)' + "s'" + '(\\s|$)', 'gu');
      input = input.replace(zoek, singleopen + '$1s' + singleclose + '$2');
      
   }
    
    // convert low apostrophe to higher one. TODO: this should not apply to print-like capital glyphs.
    input = input.replace(/([A-Zbflhk])'/g, '$1’');
    
    return input;
  }

  // If any part of the word is invisible, no dots (i and j) or crossbars (t and x)
  // should be present anywhere in the word.
  function remove_dots(visible_input, invisible_input) {
    if (invisible_input) {
      visible_input = visible_input.replaceAll('i', glyphs.dotlessi);
      visible_input = visible_input.replaceAll('j', glyphs.dotlessj);
      visible_input = visible_input.replaceAll(glyphs.t1, glyphs.t1dotless);
      visible_input = visible_input.replaceAll('x', glyphs.xdotless);
      visible_input = visible_input.replaceAll(glyphs.ij, glyphs.y);
      
    }
    return visible_input;
  }    
  
  function glyphs_to_names(converted) {
    var result = '';
    
    var glyphnames = {};
    for (const [name, glyph] of Object.entries(glyphs)) {
      glyphnames[glyph] = name;
    }

    var name;
    for (var glyph of converted) {
      name = glyphnames[glyph];
      if (typeof name === 'undefined') {
        result = result + 'undefined:' + glyph;
      } else {
        result = result + name + ' ';
      }
    }
    return result;
  }
  
  
  init(the_settings, the_element);

  return {
    convert: convert,
    init: init,
    letterglyphs: letterglyphs,
    letterglyphs_lc: letterglyphs_lc,
    letterglyphs_uc: letterglyphs_uc,
    connectorglyphs: connectorglyphs,
    numberglyphs: numberglyphs,
    settings: settings,
    substitutions: substitutions,
    remove_dots: remove_dots,
    glyphs_to_names: glyphs_to_names
  }
});

var cogncur_converter = get_cogncur_converter();
