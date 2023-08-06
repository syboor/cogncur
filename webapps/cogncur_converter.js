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
    
    /* no_tt_ligature:
     0 = yes, 'tt' forms a ligature with the crossbars connected
     1 = no
     */
    no_tt_ligature: 0,
    
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
     with a 'high' apostrope after tall letters. This 'high' apostrophe happens to be the 'single closing quote' glyph.
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
     numeral_variants_set2: 0
     
  }
  var connectors = {
    ccni : '\ue000',
    ccnn : '\ue001',
    ccnh : '\ue002',
    ccno : '\ue003',
    ccna : '\ue004',
    ccne : '\ue005',
    ccns : '\ue006',
    ccnt1: '\ue007',
    ccnt : '\ue008',
    ccns1: '\ue009',
    cen  : '\ue00b',
    ccoi : '\ue00c',
    ccon : '\ue00d',
    ccoh : '\ue00e',
    ccoo : '\ue00f',
    ccoa : '\ue010',
    ccoe : '\ue011',
    ccos : '\ue012',
    ccot1: '\ue013',
    ccot : '\ue014',
    ccos1: '\ue015',
    ceo  : '\ue017',
    ccei : '\ue018',
    ccen : '\ue019',
    cceh : '\ue01a',
    cceo : '\ue01b',
    ccea : '\ue01c',
    ccee : '\ue01d',
    cces : '\ue01e',
    ccet1: '\ue01f',
    ccet : '\ue020',
    cces1: '\ue021',
    cee  : '\ue023',
    ccvi : '\ue024',
    ccvn : '\ue025',
    ccvh : '\ue026',
    ccvo : '\ue027',
    ccva : '\ue028',
    ccve : '\ue029',
    ccvs : '\ue02A',
    ccvt1: '\ue02B',
    ccvt : '\ue02C',
    ccvs1: '\ue02D',
    cev  : '\ue02F',
    ccgi : '\ue030',
    ccgn : '\ue031',
    ccgh : '\ue032',
    ccgo : '\ue033',
    ccga : '\ue034',
    ccge : '\ue035',
    ccgs : '\ue036',
    ccgt1: '\ue037',
    ccgt : '\ue038',
    ccgs1: '\ue039',
    ceg  : '\ue03B',
    ccsi : '\ue03C',
    ccsn : '\ue03D',
    ccsh : '\ue03E',
    ccso : '\ue03F',
    ccsa : '\ue040',
    ccse : '\ue041',
    ccss : '\ue042',
    ccst1: '\ue043',
    ccst : '\ue044',
    ccss1: '\ue045',
    ces  : '\ue047',
    ccpi : '\ue048',
    ccpn : '\ue049',
    ccph : '\ue04A',
    ccpo : '\ue04B',
    ccpa : '\ue04C',
    ccpe : '\ue04D',
    ccps : '\ue04E',
    ccpt1: '\ue04F',
    ccpt : '\ue050',
    ccps1: '\ue051',
    cep  : '\ue053',
    ccqi : '\ue054',
    ccqn : '\ue055',
    ccqh : '\ue056',
    ccqo : '\ue057',
    ccqa : '\ue058',
    ccqe : '\ue059',
    ccqs : '\ue05A',
    ccqt1: '\ue05B',
    ccqt : '\ue05C',
    ccqs1: '\ue05D',
    ccqj : '\ue05E', // special case
    ceq  : '\ue05F',
    ccti : '\ue060',
    cctn : '\ue061',
    ccth : '\ue062',
    ccto : '\ue063',
    ccta : '\ue064',
    ccte : '\ue065',
    ccts : '\ue066',
    cctt1: '\ue067',
    cctt : '\ue068',
    ccts1: '\ue069',
    cet  : '\ue06B',
    ccOi : '\ue06C',
    ccOn : '\ue06D',
    ccOh : '\ue06E',
    ccOo : '\ue06F',
    ccOa : '\ue070',
    ccOe : '\ue071',
    ccOs : '\ue072',
    ccOt1: '\ue073',
    ccOt : '\ue074',
    ccOs1: '\ue075',
    ceO  : '\ue077',
    ccBi : '\ue078',
    ccBn : '\ue079',
    ccBh : '\ue07A',
    ccBo : '\ue07B',
    ccBa : '\ue07C',
    ccBe : '\ue07D',
    ccBs : '\ue07E',
    ccBt1: '\ue07F',
    ccBt : '\ue080',
    ccBs1: '\ue081',
    ceB  : '\ue083',
    ccAi : '\ue084',
    ccAn : '\ue085',
    ccAh : '\ue086',
    ccAo : '\ue087',
    ccAa : '\ue088',
    ccAe : '\ue089',
    ccAs : '\ue08A',
    ccAt1: '\ue08B',
    ccAt : '\ue08C',
    ccAs1: '\ue08D',
    ceA  : '\ue08F',
    ccPi : '\ue090',
    ccPn : '\ue091',
    ccPh : '\ue092',
    ccPo : '\ue093',
    ccPa : '\ue094',
    ccPe : '\ue095',
    ccPs : '\ue096',
    ccPt1: '\ue097',
    ccPt : '\ue098',
    ccPs1: '\ue099',
    ceP  : '\ue09B',
    ccFi : '\ue09C',
    ccFn : '\ue09D',
    ccFh : '\ue09E',
    ccFo : '\ue09F',
    ccFa : '\ue0A0',
    ccFe : '\ue0A1',
    ccFs : '\ue0A2',
    ccFt1: '\ue0A3',
    ccFt : '\ue0A4',
    ccFs1: '\ue0A5',
    ceF  : '\ue0A7',
    ccIi : '\ue0A8',
    ccIn : '\ue0A9',
    ccIh : '\ue0AA',
    ccIo : '\ue0AB',
    ccIa : '\ue0AC',
    ccIe : '\ue0AD',
    ccIs : '\ue0AE',
    ccIt1: '\ue0AF',
    ccIt : '\ue0B0',
    ccIs1: '\ue0B1',
    ceI  : '\ue0B3',
    ccNi : '\ue0B4',
    ccNn : '\ue0B5',
    ccNh : '\ue0B6',
    ccNo : '\ue0B7',
    ccNa : '\ue0B8',
    ccNe : '\ue0B9',
    ccNs : '\ue0BA',
    ccNt1: '\ue0BB',
    ccNt : '\ue0BC',
    ccNs1: '\ue0BD',
    ceN  : '\ue0BF',
    
    cgi  : '\ue0C0',
    cgn  : '\ue0C1',
    cgh  : '\ue0C2',
    cgo  : '\ue0C3',
    cga  : '\ue0C4',
    cge  : '\ue0C5',
    cgs  : '\ue0C6',
    cgt1 : '\ue0C7',
    cgt  : '\ue0C8',
    cgz1 : '\ue0C9', // special case
    cgz  : '\ue0CA', // special case
    cgs1 : '\ue0CB', // special case
    cgj  : '\ue0CC', // identical to ... but different for kerning purposes
    cgp  : '\ue0CD', // identical to ... but different for kerning purposes
    cgf  : '\ue0CE', // identical to ... but different for kerning purposes
    cgg  : '\ue0CF', // identical to ... but different for kerning purposes
    cgy  : '\ue0D0', // identical to ... but different for kerning purposes
    cgy1 : '\ue0D1', // identical to ... but different for kerning purposes
    cggermandbls: '\ue0D2', // identical to ... but different for kerning purposes

    csi  : '\ue11d',
    csn  : '\ue11e',
    csh  : '\ue11f',
    cso  : '\ue120',
    csa  : '\ue121',
    cse  : '\ue122',
    css  : '\ue123',
    cst1 : '\ue124',
    cst  : '\ue125',
    csz1 : '\ue126', // special case
    csz  : '\ue127', // special case
    css1 : '\ue128', // special case
    csj  : '\ue129', // identical to ... but different for kerning purposes
    csp  : '\ue12a', // identical to ... but different for kerning purposes
    csf  : '\ue12b', // identical to ... but different for kerning purposes
    csg  : '\ue12c', // identical to ... but different for kerning purposes
    csy  : '\ue12d', // identical to ... but different for kerning purposes
    csy1 : '\ue12e', // identical to ... but different for kerning purposes
    csgermandbls : '\ue12f', // identical to ... but different for kerning purposes
    cpo  : '\ue130',
    cpa  : '\ue131',
    cpt1 : '\ue132',
    cpg  : '\ue133',
    
    
    cet1 : '\ue0d3',

    cfß  : '\ue0d4',
    cfs  : '\ue0d5', // invisible exit stroke for s
    cfp  : '\ue0d6', // invisible exit stroke for p
    
    ceß  : '\ue0d7',
    ceG1 : '\ue0d8',
    ceQ  : '\ue0d9',
    ceE  : '\ue0da',
    ceC  : '\ue0db',
    ceD  : '\ue0dc',
    cej  : '\ue0dd',
    ced  : '\ue0de',
    ceh  : '\ue0df',
    cef  : '\ue0e0', // replaces ceq for kerning purposes (due to the overhang of f)
    ceM  : '\ue0e1', // replaces cen for symmetry purposes
    ceC1 : '\ue0e2', // replaces cee for kerning purposes
    ceH  : '\ue0e3', // replaces cen for kerning purposes (due to the overhang of l)
    
    ccf1i : '\ue134',
    ccf1n : '\ue135',
    ccf1h : '\ue136',
    ccf1o : '\ue137',
    ccf1a : '\ue138',
    ccf1e : '\ue139',
    ccf1s : '\ue13A',
    ccf1t1: '\ue13B',
    ccf1t : '\ue13C',
    ccf1s1: '\ue13D',
    ccf1j : '\ue13E', // special case
    cef1  : '\ue13F',
    cef2  : '\ue140',
    ccf4i : '\ue141',
    ccf4n : '\ue142',
    ccf4h : '\ue143',
    ccf4o : '\ue144',
    ccf4a : '\ue145',
    ccf4e : '\ue146',
    ccf4s : '\ue147',
    ccf4t1: '\ue148',
    ccf4t : '\ue149',
    ccf4s1: '\ue14A',
    cef4  : '\ue14C',
    
    ccq1i : '\ue14D',
    ccq1n : '\ue14E',
    ccq1h : '\ue14F',
    ccq1o : '\ue150',
    ccq1a : '\ue151',
    ccq1e : '\ue152',
    ccq1s : '\ue153',
    ccq1t1: '\ue154',
    ccq1t : '\ue155',
    ccq1s1: '\ue156',
    ccq1j : '\ue157',
    ceq1  : '\ue158',

    ccq2i : '\ue159',
    ccq2n : '\ue15A',
    ccq2h : '\ue15B',
    ccq2o : '\ue15C',
    ccq2a : '\ue15D',
    ccq2e : '\ue15E',
    ccq2s : '\ue15F',
    ccq2t1: '\ue160',
    ccq2t : '\ue161',
    ccq2s1: '\ue162',
    ccq2j : '\ue163',
    ceq2  : '\ue164',
    ceq3  : '\ue165',

    ccr2i : '\ue18d',
    ccr2n : '\ue18E',
    ccr2h : '\ue18F',
    ccr2o : '\ue190',
    ccr2a : '\ue191',
    ccr2e : '\ue192',
    ccr2s : '\ue193',
    ccr2t1: '\ue194',
    ccr2t : '\ue195',
    ccr2s1: '\ue196',
    cer2  : '\ue198',    
    cfr2  : '\ue199',    
  }
  var letters = {
    space : '\u0020',
    exclam : '\u0021',
    quotedbl : '\u0022',
    quotesingle : '\u0027',
    parenleft : '\u0028',
    parenright : '\u0029',
    asterisk : '\u002a',
    plus : '\u002b',
    comma : '\u002c',
    hyphen : '\u002d',
    period : '\u002e',
    glyph415 : '\u002f',
    colon : '\u003a',
    semicolon : '\u003b',
    question : '\u003f',
    A : '\u0041',
    B : '\u0042',
    C : '\u0043',
    D : '\u0044',
    E : '\u0045',
    F : '\u0046',
    G : '\u0047',
    H : '\u0048',
    I : '\u0049',
    J : '\u004a',
    K : '\u004b',
    L : '\u004c',
    M : '\u004d',
    N : '\u004e',
    O : '\u004f',
    P : '\u0050',
    Q : '\u0051',
    R : '\u0052',
    S : '\u0053',
    T : '\u0054',
    U : '\u0055',
    V : '\u0056',
    W : '\u0057',
    X : '\u0058',
    Y : '\u0059',
    Z : '\u005a',
    bracketleft : '\u005b',
    backslash : '\u005c',
    bracketright : '\u005d',
    underscore : '\u005f',
    a : '\u0061',
    b : '\u0062',
    c : '\u0063',
    d : '\u0064',
    e : '\u0065',
    f : '\u0066',
    g : '\u0067',
    h : '\u0068',
    i : '\u0069',
    j : '\u006a',
    k : '\u006b',
    l : '\u006c',
    m : '\u006d',
    n : '\u006e',
    o : '\u006f',
    p : '\u0070',
    q : '\u0071',
    r : '\u0072',
    s : '\u0073',
    t : '\u0074',
    u : '\u0075',
    v : '\u0076',
    w : '\u0077',
    x : '\u0078',
    y : '\u0079',
    z : '\u007a',
    braceleft : '\u007b',
    bar : '\u007c',
    braceright : '\u007d',
    exclamdown : '\u00a1',
    guillemotleft : '\u00ab',
    guillemotright : '\u00bb',
    questiondown : '\u00bf',
    Agrave : '\u00c0',
    Aacute : '\u00c1',
    Acircumflex : '\u00c2',
    Atilde : '\u00c3',
    Adieresis : '\u00c4',
    Aring : '\u00c5',
    AE : '\u00c6',
    Ccedilla : '\u00c7',
    Egrave : '\u00c8',
    Eacute : '\u00c9',
    Ecircumflex : '\u00ca',
    Edieresis : '\u00cb',
    Igrave : '\u00cc',
    Iacute : '\u00cd',
    Icircumflex : '\u00ce',
    Idieresis : '\u00cf',
    Ntilde : '\u00d1',
    Ograve : '\u00d2',
    Oacute : '\u00d3',
    Ocircumflex : '\u00d4',
    Otilde : '\u00d5',
    Odieresis : '\u00d6',
    Oslash : '\u00d8',
    Ugrave : '\u00d9',
    Uacute : '\u00da',
    Ucircumflex : '\u00db',
    Udieresis : '\u00dc',
    Yacute : '\u00dd',
    germandbls : '\u00df',
    agrave : '\u00e0',
    aacute : '\u00e1',
    acircumflex : '\u00e2',
    atilde : '\u00e3',
    adieresis : '\u00e4',
    aring : '\u00e5',
    ae : '\u00e6',
    ccedilla : '\u00e7',
    egrave : '\u00e8',
    eacute : '\u00e9',
    ecircumflex : '\u00ea',
    edieresis : '\u00eb',
    igrave : '\u00ec',
    iacute : '\u00ed',
    icircumflex : '\u00ee',
    idieresis : '\u00ef',
    ntilde : '\u00f1',
    ograve : '\u00f2',
    oacute : '\u00f3',
    ocircumflex : '\u00f4',
    otilde : '\u00f5',
    odieresis : '\u00f6',
    oslash : '\u00f8',
    ugrave : '\u00f9',
    uacute : '\u00fa',
    ucircumflex : '\u00fb',
    udieresis : '\u00fc',
    yacute : '\u00fd',
    ydieresis : '\u00ff',
    Amacron : '\u0100',
    amacron : '\u0101',
    Abreve : '\u0102',
    abreve : '\u0103',
    Emacron : '\u0112',
    emacron : '\u0113',
    Ebreve : '\u0114',
    ebreve : '\u0115',
    ecaron : '\u011b',
    itilde : '\u0129',
    Imacron : '\u012a',
    imacron : '\u012b',
    Ibreve : '\u012c',
    ibreve : '\u012d',
    dotlessi : '\u0131',
    IJ : '\u0132',
    ij : '\u0133',
    Omacron : '\u014c',
    omacron : '\u014d',
    Obreve : '\u014e',
    obreve : '\u014f',
    OE : '\u0152',
    oe : '\u0153',
    Scaron : '\u0160',
    scaron : '\u0161',
    Utilde : '\u0168',
    utilde : '\u0169',
    Umacron : '\u016a',
    umacron : '\u016b',
    Ubreve : '\u016c',
    ubreve : '\u016d',
    Uring : '\u016e',
    uring : '\u016f',
    Ycircumflex : '\u0176',
    ycircumflex : '\u0177',
    Ydieresis : '\u0178',
    Zcaron : '\u017d',
    zcaron : '\u017e',
    acaron : '\u01ce',
    icaron : '\u01d0',
    ocaron : '\u01d2',
    ucaron : '\u01d4',
    ymacron : '\u0233',
    dotlessj : '\u0237',
    gravecomb : '\u0300',
    acutecomb : '\u0301',
    uni0302 : '\u0302',
    tildecomb : '\u0303',
    uni0304 : '\u0304',
    uni0306 : '\u0306',
    uni0308 : '\u0308',
    uni030A : '\u030a',
    uni030C : '\u030c',
    uni0327 : '\u0327',
    etilde : '\u1ebd',
    ygrave : '\u1ef3',
    ytilde : '\u1ef9',
    uni2010 : '\u2010',
    uni2011 : '\u2011',
    endash : '\u2013',
    emdash : '\u2014',
    quoteleft : '\u2018',
    quoteright : '\u2019',
    quotesinglbase : '\u201a',
    quotedblleft : '\u201c',
    quotedblright : '\u201d',
    quotedblbase : '\u201e',
    guilsinglleft : '\u2039',
    guilsinglright : '\u203a',
    t1 : '\ue0e4',
    t1dotless : '\ue0e5',
    xdotless : '\ue0e6',
    A1 : '\ue0e7',
    M1 : '\ue0e8',
    N1 : '\ue0e9',
    A2 : '\ue0ea',
    M2 : '\ue0eb',
    N2 : '\ue0ec',
    r1 : '\ue0ed',
    z1 : '\ue0ee',
    z1caron : '\ue0ef',
    d1 : '\ue0f0',
    p1 : '\ue0f1',
    y1 : '\ue0f2',
    ij1 : '\ue0f3',
    w1 : '\ue0f4',
    y1macron : '\ue0f5',
    Y1 : '\ue0f6',
    IJ1 : '\ue0f7',
    W1 : '\ue0f8',
    Z1 : '\ue0f9',
    f1 : '\ue0fa',
    f2 : '\ue0fb',
    f3 : '\ue0fc',
    f4 : '\ue0fd',
    f5 : '\ue0fe',
    q1 : '\ue0ff',
    q2 : '\ue100',
    q3 : '\ue101',
    q4 : '\ue102',
    s1 : '\ue103',
    r2 : '\ue104',
    z2 : '\ue105',
    z3 : '\ue106',
    Z2 : '\ue107',
    Z3 : '\ue108',
    z2caron : '\ue109',
    z3caron : '\ue10a',
    Z2caron : '\ue10b',
    Z3caron : '\ue10c',
    s1caron : '\ue10d',
    p2 : '\ue10e',
    p3 : '\ue10f',
    p4 : '\ue110',
    p5 : '\ue111',
    p6 : '\ue112',
    p7 : '\ue113',
    C1 : '\ue114',
    C1cedilla : '\ue115',
    G1 : '\ue116',
    L1 : '\ue117',
    y1grave : '\ue118',
    y1acute : '\ue119',
    y1circumflex : '\ue11a',
    y1diaeresis : '\ue11b',
    y1tilde : '\ue11c',
    A2grave : '\ue167',
    A2acute : '\ue168',
    A2circumflex : '\ue169',
    A2dieresis : '\ue16a',
    A2tilde : '\ue16b',
    A2macron : '\ue16c',
    A2breve : '\ue16d',
    A2ring : '\ue16e',
    N2tilde : '\ue16f',
    Y1acute : '\ue170',
    Y1circumflex : '\ue171',
    Y1dieresis : '\ue172',
    Z1caron : '\ue173',
    loo : '\ue174',
    lee : '\ue175',
    laa : '\ue176',
    luu : '\ue177',
    oomacron : '\ue178',
    oobreve : '\ue179',
    eemacron : '\ue17a',
    eebreve : '\ue17b',
    aamacron : '\ue17c',
    aabreve : '\ue17d',
    uumacron : '\ue17e',
    uubreve : '\ue17f',
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
  
  var letterglyphs_lc = 'a-zà-åăāçè-ëĕēì-ïĭīıñò-öøŏōšŧù-üŭūẋýÿžœæß' + letters.t1 + letters.t1dotless + letters.xdotless + letters.jdotless + letters.r1 + letters.z1 + letters.z1caron + letters.d1 + letters.p1 + letters.p2 + letters.p3 + letters.p4 + letters.p5 + letters.p6 + letters.p7 + letters.ij + letters.y1 + letters.ij1 + letters.w1 + letters.f1 + letters.f2 + letters.f3 + letters.f4 + letters.f5 + letters.q1 + letters.q2 + letters.q3 + letters.q4 + letters.s1 + letters.r2 + letters.s1caron + letters.eebreve + letters.eemacron + letters.aabreve + letters.aamacron + letters.oobreve + letters.oomacron + letters.uubreve + letters.uumacron; // kleine letters + letters
  var letterglyphs_uc_connected = 'AÀ-ÅĂĀBDCÇEÈ-ËĔĒFGHIÌ-ÏĪĪJKLMNÑOÒ-ÖØŎŌPQRSŠTUÙ-ÜŬŪVWXYÝŸZŒÆ' + letters.A1 + letters.M1 + letters.N1 + letters.A2 + letters.M2 + letters.N2 + letters.IJ + letters.Y1 + letters.IJ1 + letters.W1 + letters.Z1 + letters.C1 + letters.C1cedilla + letters.G1 + letters.L1;
  var letterglyphs_uc_unconnected = ''; 
  var letterglyphs_uc = letterglyphs_uc_connected + letterglyphs_uc_unconnected;
  var letterglyphs = letterglyphs_lc + letterglyphs_uc;
  var connectorglyphs = Object.values(connectors).join(''); // connections + entry strokes + exit strokes + 'kerning connections' (containing whitespace)

  var numberglyphs = Object.values(numerals).join('');


  var glyphs = letterglyphs + connectorglyphs + numberglyphs;

  /* Given a string consisting of 'known' letters of the alfabet, add related glyphs (but do not add connector glyphs).
   * Input is a string and should not contain ranges.
   * Output may contain character ranges (for use in Regular Expressions).
   */
  function expand_known_letters(input) {
    if (input.indexOf('e') > -1) input += 'è-ëĕē';
    if (input.indexOf('i') > -1) input += 'ì-ïĭīı';
    if (input.indexOf('a') > -1) input += 'à-åăā';
    if (input.indexOf('o') > -1) input += 'ò-öøŏō';
    if (input.indexOf('u') > -1) input += 'ù-üŭū';
    if (input.indexOf('z') > -1) input += 'ž';

    return input;
  }
    
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
    
    return settings;
  };
     
  function convert(input) {
    var result = input;

    result = lettersConversion1(result);
    result = quotesConversion(result);
    
    result = entrystrokesConversion(result); // this substitution needs to know whether it's beginning of the string or not

    result = " " + result + " "; // add extra space

    result = exitstrokesConversion(result);
    result = exitstrokesConversion(result); // again, if you've got the same uppercaes letter twice, the second one will not be converted
    result = joinsConversion(result);
    result = joinsConversion(result);
    result = lettersConversion2(result);

    result = dotlessConversion(result);
    
    result = fixwhitespaceligaturesConversion(result);
    
    result = numeralsConversion(result);
    
    // ONLY trim off the space we added at the start
    if (result.substring(0,1) == " " || result.substring(0,1) == numerals['space.tab'] || result.substring(0,1) == numerals['space.tab.old']) result = result.substring(1);
    if (result.substring(result.length - 1) == " " || result.substring(result.length - 1) == numerals['space.tab'] || result.substring(result.length - 1) == numerals['space.tab.old']) result = result.substring(0,result.length - 1);
    return result;
  }

  function lettersConversion1(input) {
    // In this function, convert all letters that require different connecting strokes than the standard version of the letter.
    // The letters produced by this function need to be matched by the function inserting the connecting strokes
    if (settings.t_variant >= 1) {
      input = input.replace(/t/g, letters.t1);
    }

    if (settings.ij_ligature == 1) {
      input = input.replace(/ij/g, letters.ij);
      input = input.replace(/IJ/g, letters.IJ);
    }

    if (settings.uppercase_amn_variant == 1) {
      input = input.replaceAll('A', letters.A1);
      input = input.replaceAll('M', letters.M1);
      input = input.replaceAll('N', letters.N1);
    }
    if (settings.uppercase_amn_variant == 2) {
      input = input.replace(/A/g, letters.A2);
      input = input.replaceAll(letters.Agrave, letters.A2grave);
      input = input.replaceAll(letters.Aacute, letters.A2acute);
      input = input.replaceAll(letters.Acircumflex, letters.A2circumflex);
      input = input.replaceAll(letters.Atilde, letters.A2tilde);
      input = input.replaceAll(letters.Adieresis, letters.A2dieresis);
      input = input.replaceAll(letters.Aring, letters.A2ring);
      input = input.replace(/M/g, letters.M2);
      input = input.replace(/N/g, letters.N2);
      input = input.replaceAll(letters.Ntilde, letters.N2tilde);
    }
    if (settings.r_variant == 1) {
      input = input.replace(/r/g, letters.r2);
    }

    if (settings.rz_top_variant == 1) {
      input = input.replace(/r/g, letters.r1);
      input = input.replace(/z/g, letters.z1);
      input = input.replace(/ž/g, letters.z1caron);
    }

    if (settings.s_variant == 1) { 
      input = input.replaceAll('s', letters.s1);
      input = input.replaceAll(letters.scaron, letters.s1caron);
    }

    if (settings.f_connection_variant == 1) {
      if (settings.f_continuity_variant == 1) {
        input = input.replaceAll('f', letters.f4);
      } else {
        input = input.replaceAll('f', letters.f1);
      }
    }

    if (settings.q_connection_variant == 1 && settings.q_continuity_variant == 0) {
      if (settings.stick_variant == 1) {
        input = input.replaceAll('q', letters.q2);
      } else {
        input = input.replaceAll('q', letters.q1); // yes, this shorter stick is actually relevant for the connections
      }
    }
    
    if (settings.y_variant == 1) {
      input = input.replaceAll('y', letters.y1);
      input = input.replaceAll(letters.ij, letters.ij1);
    } // note that Y will be replaced in lettersConversion2
    
    if (settings.w_variant == 1) {
      input = input.replace(/w/g, letters.w1);
    }
    
    if (settings.p_curve_variant == 1) {
      input = input.replaceAll('p', letters.p2);
    }
    if (settings.p_open_variant == 1) {
      input = input.replaceAll('p', letters.p4);
      input = input.replaceAll(letters.p2, letters.p6);
    }
    
    // standard ligatures, do them always...
    if (true) {
      input = input.replaceAll(letters.abreve + letters.abreve, letters.aabreve);
      input = input.replaceAll(letters.ebreve + letters.ebreve, letters.eebreve);
      input = input.replaceAll(letters.obreve + letters.obreve, letters.oobreve);
      input = input.replaceAll(letters.ubreve + letters.ubreve, letters.uubreve);
      input = input.replaceAll(letters.amacron + letters.amacron, letters.aamacron);
      input = input.replaceAll(letters.emacron + letters.emacron, letters.eemacron);
      input = input.replaceAll(letters.omacron + letters.omacron, letters.oomacron);
      input = input.replaceAll(letters.umacron + letters.umacron, letters.uumacron);
      
    }

    return input;
  }
  function lettersConversion2(input) {
    // In this function, convert all letters that have no impact on the connecting strokes used.
    // This function will be called with connecting strokes already in place.
    if (settings.exitstrokes == 1) {
      input = input.replaceAll(connectors.ces, connectors.cfs);
      input = input.replaceAll(connectors.cep, connectors.cfp);
      input = input.replaceAll(connectors.ceß, connectors.cfß);
      input = input.replaceAll(connectors.cer2, connectors.cfr2);
    }

    if (settings.y_variant == 1) {
      input = input.replaceAll('Y', letters.Y1);
      input = input.replaceAll('IJ', letters.IJ1);
    }
    if (settings.w_variant == 1) {
      input = input.replaceAll('W', letters.W1);
    }
    if (settings.rz_top_variant == 1) {
      input = input.replaceAll('Z', letters.Z1);
    }
    if (settings.uppercase_cgl_variant == 1) {
      input = input.replaceAll('C', letters.C1);
      input = input.replaceAll('Ç', letters.C1cedilla);
      input = input.replaceAll('G' + connectors.ceg, letters.G1 + connectors.ceG1);
      input = input.replaceAll('G', letters.G1);
      input = input.replaceAll('L', letters.L1);
      input = input.replaceAll(connectors.ceC, connectors.ceC1); // for kerning with the question mark
    }

    
    if (settings.t_variant == 2) { 
      input = input.replaceAll(connectors.ccAt1, connectors.ccAi);
      input = input.replaceAll(connectors.ccBt1, connectors.ccBi);
      input = input.replaceAll(connectors.ccet1, connectors.ccei);
      input = input.replaceAll(connectors.ccFt1, connectors.ccFi);
      input = input.replaceAll(connectors.ccgt1, connectors.ccgi);
      input = input.replaceAll(connectors.ccIt1, connectors.ccIi);
      input = input.replaceAll(connectors.ccNt1, connectors.ccNi);
      input = input.replaceAll(connectors.ccnt1, connectors.ccni);
      input = input.replaceAll(connectors.ccOt1, connectors.ccOi);
      input = input.replaceAll(connectors.ccot1, connectors.ccoi);
      input = input.replaceAll(connectors.ccPt1, connectors.ccPi);
      input = input.replaceAll(connectors.ccpt1, connectors.ccpi);
      input = input.replaceAll(connectors.ccqt1, connectors.ccqi);
      input = input.replaceAll(connectors.ccst1, connectors.ccsi);
      input = input.replaceAll(connectors.cctt1, connectors.ccti);
      input = input.replaceAll(connectors.ccvt1, connectors.ccvi);
      input = input.replaceAll(connectors.cgt1, connectors.cgi);
      
    }

    if (settings.undercurves) { 
      input = input.replaceAll(connectors.ccAi, connectors.ccAt1);
      input = input.replaceAll(connectors.ccBi, connectors.ccBt1);
      input = input.replaceAll(connectors.ccei, connectors.ccet1);
      input = input.replaceAll(connectors.ccFi, connectors.ccFt1);
      input = input.replaceAll(connectors.ccgi, connectors.ccgt1);
      input = input.replaceAll(connectors.ccIi, connectors.ccIt1);
      input = input.replaceAll(connectors.ccNi, connectors.ccNt1);
      input = input.replaceAll(connectors.ccni, connectors.ccnt1);
      input = input.replaceAll(connectors.ccOi, connectors.ccOt1);
      input = input.replaceAll(connectors.ccoi, connectors.ccot1);
      input = input.replaceAll(connectors.ccPi, connectors.ccPt1);
      input = input.replaceAll(connectors.ccpi, connectors.ccpt1);
      input = input.replaceAll(connectors.ccqi, connectors.ccqt1);
      input = input.replaceAll(connectors.ccsi, connectors.ccst1);
      input = input.replaceAll(connectors.ccti, connectors.cctt1);
      input = input.replaceAll(connectors.ccvi, connectors.ccvt1);
      input = input.replaceAll(connectors.cgi, connectors.cgt1);
    }

    if (settings.f_continuity_variant == 1) {
      input = input.replaceAll('f'+connectors.ccqj, letters.f2+connectors.ccqi);
      input = input.replaceAll('f', letters.f2);
      input = input.replaceAll(connectors.cef, connectors.cef2);
    }


    if (settings.q_continuity_variant == 1) {
      input = input.replaceAll('q'+connectors.ceq, 'q'+connectors.ceq3); // NB ceq is also used after z
      input = input.replaceAll('q', letters.q3);

      input = input.replaceAll(connectors.ccqj, connectors.ccqi); // the special 'extra wide' connection is not needed if the q doesn't have a loop but just a stick
    }


    if (settings.stick_variant == 1) {
      input = input.replaceAll('d', letters.d1);
      input = input.replaceAll('p', letters.p1);
      input = input.replaceAll(letters.p2, letters.p3);
      input = input.replaceAll(letters.p4, letters.p5);
      input = input.replaceAll(letters.p6, letters.p7);
      input = input.replaceAll(letters.f2, letters.f3);
      input = input.replaceAll(letters.f4, letters.f5);
      input = input.replaceAll(letters.q3, letters.q4);
      
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


  function joinsConversion(input) {
    // This function needs to match the following letters:
    // - letters that can be user input (with a standard unicode mapping < \ue8000
    // - letters that require different connections than the standard letter, produced by lettersConversion1()
    var replacementPairs = [
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccna],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccne],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccnh],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccni],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccnn],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([sš])", connectors.ccns],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])(["+letters.s1+letters.s1caron+"])", connectors.ccns1],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccno],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])(["+letters.t1+"])", connectors.ccnt1],
      ["([à-åăāadhiì-ïĭīıklmnñruù-üŭūxẋHKMRUÙ-ÜŬŪX"+letters.t1+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.uubreve+letters.aamacron+letters.uumacron+"])([tŧ])", connectors.ccnt],

      ["([sš"+letters.s1+letters.s1caron+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccsa],
      ["([sš"+letters.s1+letters.s1caron+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccse],
      ["([sš"+letters.s1+letters.s1caron+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccsh],
      ["([sš"+letters.s1+letters.s1caron+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccsi],
      ["([sš"+letters.s1+letters.s1caron+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccsn],
      ["([sš"+letters.s1+letters.s1caron+"])([sš])", connectors.ccss],
      ["([sš"+letters.s1+letters.s1caron+"])(["+letters.s1+letters.s1caron+"])", connectors.ccss1],
      ["([sš"+letters.s1+letters.s1caron+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccso],
      ["([sš"+letters.s1+letters.s1caron+"])(["+letters.t1+"])", connectors.ccst1],
      ["([sš"+letters.s1+letters.s1caron+"])([tŧ])", connectors.ccst],

      ["([pß"+letters.p2+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccpa],
      ["([pß"+letters.p2+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccpe],
      ["([pß"+letters.p2+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccph],
      ["([pß"+letters.p2+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccpi],
      ["([pß"+letters.p2+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccpn],
      ["([pß"+letters.p2+"])([sš])", connectors.ccps],
      ["([pß"+letters.p2+"])(["+letters.s1+letters.s1caron+"])", connectors.ccps1],
      ["([pß"+letters.p2+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccpo],
      ["([pß"+letters.p2+"])(["+letters.t1+"])", connectors.ccpt1],
      ["([pß"+letters.p2+"])([tŧ])", connectors.ccpt],
      
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccqa],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccqe],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccqh],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([iì-ïĭīıpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+"])", connectors.ccqi],
      ["([fq])([jȷ])", connectors.ccqj], // special connector for 'fj' and 'qj'
      ["([zžQZ"+letters.z1+letters.z1caron+"])([jȷ])", connectors.ccqi], // but no need or 'zj'
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccqn],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([sš])", connectors.ccqs],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])(["+letters.s1+letters.s1caron+"])", connectors.ccqs1],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccqo],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])(["+letters.t1+"])", connectors.ccqt1],
      ["([fqzžQZ"+letters.z1+letters.z1caron+"])([tŧ])", connectors.ccqt],

      ["(["+letters.f1+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccf1a],
      ["(["+letters.f1+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccf1e],
      ["(["+letters.f1+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccf1h],
      ["(["+letters.f1+"])([iì-ïĭīıpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+"])", connectors.ccf1i],
      ["(["+letters.f1+"])([jȷ])", connectors.ccf1j], // special connector for 'fj' and 'qj'
      ["(["+letters.f1+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccf1n],
      ["(["+letters.f1+"])([sš])", connectors.ccf1s],
      ["(["+letters.f1+"])(["+letters.s1+letters.s1caron+"])", connectors.ccf1s1],
      ["(["+letters.f1+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccf1o],
      ["(["+letters.f1+"])(["+letters.t1+"])", connectors.ccf1t1],
      ["(["+letters.f1+"])([tŧ])", connectors.ccf1t],

      ["(["+letters.f4+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccf4a],
      ["(["+letters.f4+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccf4e],
      ["(["+letters.f4+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccf4h],
      ["(["+letters.f4+"])([iì-ïĭīıpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+"])", connectors.ccf4i],
      ["(["+letters.f4+"])([jȷ])", connectors.ccf4i], // not special, just use 'ccf4i'
      ["(["+letters.f4+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccf4n],
      ["(["+letters.f4+"])([sš])", connectors.ccf4s],
      ["(["+letters.f4+"])(["+letters.s1+letters.s1caron+"])", connectors.ccf4s1],
      ["(["+letters.f4+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccf4o],
      ["(["+letters.f4+"])(["+letters.t1+"])", connectors.ccf4t1],
      ["(["+letters.f4+"])([tŧ])", connectors.ccf4t],

      ["(["+letters.q1+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccq1a],
      ["(["+letters.q1+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccq1e],
      ["(["+letters.q1+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccq1h],
      ["(["+letters.q1+"])([iì-ïĭīıpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+"])", connectors.ccq1i],
      ["(["+letters.q1+"])([jȷ])", connectors.ccq1j], // special connector for 'fj' and 'qj'
      ["(["+letters.q1+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccq1n],
      ["(["+letters.q1+"])([sš])", connectors.ccq1s],
      ["(["+letters.q1+"])(["+letters.s1+letters.s1caron+"])", connectors.ccq1s1],
      ["(["+letters.q1+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccq1o],
      ["(["+letters.q1+"])(["+letters.t1+"])", connectors.ccq1t1],
      ["(["+letters.q1+"])([tŧ])", connectors.ccq1t],

      ["(["+letters.q2+"])([aà-åăādgqæ"+letters.q2+letters.q2+"])", connectors.ccq2a],
      ["(["+letters.q2+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccq2e],
      ["(["+letters.q2+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccq2h],
      ["(["+letters.q2+"])([iì-ïĭīıpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+"])", connectors.ccq2i],
      ["(["+letters.q2+"])([jȷ])", connectors.ccq2i], // no special connector needed
      ["(["+letters.q2+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccq2n],
      ["(["+letters.q2+"])([sš])", connectors.ccq2s],
      ["(["+letters.q2+"])(["+letters.s1+letters.s1caron+"])", connectors.ccq2s1],
      ["(["+letters.q2+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccq2o],
      ["(["+letters.q2+"])(["+letters.t1+"])", connectors.ccq2t1],
      ["(["+letters.q2+"])([tŧ])", connectors.ccq2t],


      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccga],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccge],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccgh],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.IJ+letters.ij1+"])", connectors.ccgi],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccgn],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([sš])", connectors.ccgs],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])(["+letters.s1+letters.s1caron+"])", connectors.ccgs1],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccgo],
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])(["+letters.t1+"])", connectors.ccgt1], 
      ["([gjȷyýÿGJYÝŸ"+letters.ij+letters.ij1+letters.y1+letters.IJ+"])([tŧ])", connectors.ccgt],

      ["([bvw"+letters.w1+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccva],
      ["([bvw"+letters.w1+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccve],
      ["([bvw"+letters.w1+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccvh],
      ["([bvw"+letters.w1+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccvi],
      ["([bvw"+letters.w1+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccvn],
      ["([bvw"+letters.w1+"])([sš])", connectors.ccvs],
      ["([bvw"+letters.w1+"])(["+letters.s1+letters.s1caron+"])", connectors.ccvs1],
      ["([bvw"+letters.w1+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccvo],
      ["([bvw"+letters.w1+"])(["+letters.t1+"])", connectors.ccvt1], 
      ["([bvw"+letters.w1+"])([tŧ])", connectors.ccvt],

      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccoa],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccoe],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccoh],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccoi],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccon],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([sš])", connectors.ccos],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])(["+letters.s1+letters.s1caron+"])", connectors.ccos1],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccoo],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])(["+letters.t1+"])", connectors.ccot1], 
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])([tŧ])", connectors.ccot],


      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccea],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccee],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.cceh],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccei],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccen],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([sš])", connectors.cces],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])(["+letters.s1+letters.s1caron+"])", connectors.cces1],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.cceo],
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])(["+letters.t1+"])", connectors.ccet1], 
      ["([ceè-ëĕēçœæCÇEÈ-ËĔĒŒÆL"+letters.eebreve+letters.eemacron+"])([tŧ])", connectors.ccet],

      ["([tŧ])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccta],
      ["([tŧ])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccte],
      ["([tŧ])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccth],
      ["([tŧ])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccti],
      ["([tŧ])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.cctn],
      ["([tŧ])([sš])", connectors.ccts],
      ["([tŧ])(["+letters.s1+letters.s1caron+"])", connectors.ccts1],
      ["([tŧ])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccto],
      ["([tŧ])(["+letters.t1+"])", connectors.cctt1],
      ["([tŧ])([tŧ])", connectors.cctt],

      ["(["+letters.r2+"])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccr2a],
      ["(["+letters.r2+"])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccr2e],
      ["(["+letters.r2+"])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccr2h],
      ["(["+letters.r2+"])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccr2i],
      ["(["+letters.r2+"])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccr2n],
      ["(["+letters.r2+"])([sš])", connectors.ccr2s],
      ["(["+letters.r2+"])(["+letters.s1+letters.s1caron+"])", connectors.ccr2s1],
      ["(["+letters.r2+"])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccr2o],
      ["(["+letters.r2+"])(["+letters.t1+"])", connectors.ccr2t1],
      ["(["+letters.r2+"])([tŧ])", connectors.ccr2t],


      ["([AÀ-ÅĂĀ])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccAa],
      ["([AÀ-ÅĂĀ])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccAe],
      ["([AÀ-ÅĂĀ])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccAh],
      ["([AÀ-ÅĂĀ])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccAi],
      ["([AÀ-ÅĂĀ])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccAn],
      ["([AÀ-ÅĂĀ])([sš])", connectors.ccAs],
      ["([AÀ-ÅĂĀ])(["+letters.s1+letters.s1caron+"])", connectors.ccAs1],
      ["([AÀ-ÅĂĀ])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccAo],
      ["([AÀ-ÅĂĀ])(["+letters.t1+"])", connectors.ccAt1],
      ["([AÀ-ÅĂĀ])([tŧ])", connectors.ccAt],

      ["([BSŠ])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccBa],
      ["([BSŠ])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccBe],
      ["([BSŠ])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccBh],
      ["([BSŠ])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccBi],
      ["([BSŠ])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccBn],
      ["([BSŠ])([sš])", connectors.ccBs],
      ["([BSŠ])(["+letters.s1+letters.s1caron+"])", connectors.ccBs1],
      ["([BSŠ])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccBo],
      ["([BSŠ])(["+letters.t1+"])", connectors.ccBt1],
      ["([BSŠ])([tŧ])", connectors.ccBt],

      ["([DOÒ-ÖØŎŌVW])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccOa],
      ["([DOÒ-ÖØŎŌVW])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccOe],
      ["([DOÒ-ÖØŎŌVW])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccOh],
      ["([DOÒ-ÖØŎŌVW])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccOi],
      ["([DOÒ-ÖØŎŌVW])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccOn],
      ["([DOÒ-ÖØŎŌVW])([sš])", connectors.ccOs],
      ["([DOÒ-ÖØŎŌVW])(["+letters.s1+letters.s1caron+"])", connectors.ccOs1],
      ["([DOÒ-ÖØŎŌVW])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccOo],
      ["([DOÒ-ÖØŎŌVW])(["+letters.t1+"])", connectors.ccOt1],
      ["([DOÒ-ÖØŎŌVW])([tŧ])", connectors.ccOt],

      ["([P])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccPa],
      ["([P])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccPe],
      ["([P])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccPh],
      ["([P])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccPi],
      ["([P])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccPn],
      ["([P])([sš])", connectors.ccPs],
      ["([P])(["+letters.s1+letters.s1caron+"])", connectors.ccPs1],
      ["([P])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccPo],
      ["([P])(["+letters.t1+"])", connectors.ccPt1],
      ["([P])([tŧ])", connectors.ccPt],

      ["([FT])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccFa],
      ["([FT])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccFe],
      ["([FT])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccFh],
      ["([FT])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccFi],
      ["([FT])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccFn],
      ["([FT])([sš])", connectors.ccFs],
      ["([FT])(["+letters.s1+letters.s1caron+"])", connectors.ccFs1],
      ["([FT])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccFo],
      ["([FT])(["+letters.t1+"])", connectors.ccFt1],
      ["([FT])([tŧ])", connectors.ccFt],

      ["([IÌ-ÏĪĪ])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccIa],
      ["([IÌ-ÏĪĪ])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccIe],
      ["([IÌ-ÏĪĪ])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccIh],
      ["([IÌ-ÏĪĪ])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccIi],
      ["([IÌ-ÏĪĪ])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccIn],
      ["([IÌ-ÏĪĪ])([sš])", connectors.ccIs],
      ["([IÌ-ÏĪĪ])(["+letters.s1+letters.s1caron+"])", connectors.ccIs1],
      ["([IÌ-ÏĪĪ])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccIo],
      ["([IÌ-ÏĪĪ])(["+letters.t1+"])", connectors.ccIt1],
      ["([IÌ-ÏĪĪ])([tŧ])", connectors.ccIt],

      ["([NÑ])([aà-åăādgqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.ccNa],
      ["([NÑ])([eè-ëĕē"+letters.eebreve+letters.eemacron+"])", connectors.ccNe],
      ["([NÑ])([bfhkl"+letters.f1+letters.f4+"])", connectors.ccNh],
      ["([NÑ])([iì-ïĭīıjȷpuù-üŭūwß"+letters.r1+letters.z1+letters.z1caron+letters.y1+letters.ij1+letters.p4+letters.uubreve+letters.uumacron+"])", connectors.ccNi],
      ["([NÑ])([mnñrvxẋyýÿzž"+letters.ij+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.ccNn],
      ["([NÑ])([sš])", connectors.ccNs],
      ["([NÑ])(["+letters.s1+letters.s1caron+"])", connectors.ccNs1],
      ["([NÑ])([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.ccNo],
      ["([NÑ])(["+letters.t1+"])", connectors.ccNt1],
      ["([NÑ])([tŧ])", connectors.ccNt]

      // 
    ];

    for (i = 0; i < replacementPairs.length; i++) {
      var zoek = new RegExp(replacementPairs[i][0], "gu");
      var vervang = "$1" + replacementPairs[i][1] + "$2";
      input = input.replace(zoek, vervang);
    }
    
    return input;
  }

  function entrystrokesConversion(input) {
    /* Deze functie voegt de entrystrokes toe (aan het begin van het woord) */

    // LF door de connectorglyphs toe te voegen aan de regexp, wordt het mogelijk deze functie herhaald aan te roepen.
    // Herhaald aanroepen is nodig om ook tekens te converteren die als rechterbuur 'gecaptured' zijn in 
    //   de regex bij een eerdere omzetting; dit probleem speelt bij reeksen hoofdletters.
    // NB in ES2018 kan dit met (non-capturing) lookahead assertions, maar dat wordt niet door alle browsers ondersteund :(
    var left  = "[^" + letterglyphs_lc + letterglyphs_uc_connected + connectorglyphs + "]|^"; // 'non-word' teken links van de letter waar we een aanhaal aan willen toevoegen
    
    // entrystrokes
    var replacementPairs = [
      ["("+left+")([aà-åăādqæ"+letters.q1+letters.q2+letters.aabreve+letters.aamacron+"])", connectors.cga, connectors.csa, connectors.csa],
      ["("+left+")([g])", connectors.cgg, connectors.csg, connectors.csg],
      ["("+left+")([eè-ëĕē"+letters.eebreve+letters.eemacron+"])",connectors.cge, connectors.cse, connectors.cse],
      ["("+left+")([bhkl])", connectors.cgh, connectors.csh, connectors.csh],
      ["("+left+")([f"+letters.f1+letters.f4+"])", connectors.cgf, connectors.csf, connectors.csf],
      ["("+left+")([iì-ïĭīıuù-üŭūw"+letters.r1+letters.uubreve+letters.uumacron+"])", connectors.cgi, connectors.csi, connectors.csi], 
      ["("+left+")([ß])", connectors.cggermandbls, connectors.csgermandbls, connectors.csgermandbls], 
      ["("+left+")(["+letters.y1+letters.ij1+"])", connectors.cgy1, connectors.csy1, connectors.csy1], 
      ["("+left+")([jȷ])", connectors.cgj, connectors.csj, connectors.csj], 
      ["("+left+")([p"+letters.p4+"])", connectors.cgp, connectors.csp, connectors.csp], 
      ["("+left+")([mnñrvxẋ"+letters.w1+letters.p2+letters.p6+letters.r2+"])", connectors.cgn, connectors.csn, connectors.csn],
      ["("+left+")([yýÿ"+letters.ij+"])", connectors.cgy, connectors.csy, connectors.csy],
      ["("+left+")([zž])", connectors.cgz, connectors.csz, connectors.csz], // special case, parallel with internal stroke of 'z'
      ["("+left+")(["+letters.z1+letters.z1caron+"])", connectors.cgz1, connectors.csz1, connectors.csz1], // special case, parallel with internal stroke of 'z'
      ["("+left+")([sš])",connectors.cgs, connectors.css, connectors.css],
      ["("+left+")(["+letters.s1+letters.s1caron+"])",connectors.cgs1, connectors.css1, connectors.css1],
      ["("+left+")([cçoò-öøŏōœ"+letters.oobreve+letters.oomacron+"])", connectors.cgo, connectors.cso, connectors.cso],
      ["("+left+")(["+letters.t1+"])", connectors.cgt1, connectors.cst1, connectors.cst1],
      ["("+left+")([tŧ])", connectors.cgt, connectors.cst, connectors.cst]
    ];

    for (var i = 0; i < replacementPairs.length; i++) {
      var zoek = new RegExp(replacementPairs[i][0], "gu");
      var vervang = "$1" + replacementPairs[i][parseInt(settings.entrystrokes) + 1] + "$2";
      input = input.replace(zoek, vervang);
    }
    
   
    return input;
  }

  function exitstrokesConversion(input) {
    /* Deze functie voegt de exitstrokes toe (aan het eind van het woord). */

    // LF door de connectorglyphs toe te voegen aan de regexp, wordt het mogelijk deze functie herhaald aan te roepen.
    // Herhaald aanroepen is nodig om ook tekens te converteren die als rechterbuur 'gecaptured' zijn in 
    //   de regex bij een eerdere omzetting; dit probleem speelt bij reeksen hoofdletters.
    // NB in ES2018 kan dit met (non-capturing) lookahead assertions, maar dat wordt niet door alle browsers ondersteund :(
    var right = "[^" + letterglyphs_lc + connectorglyphs + "]"; // 'non-word' teken rechts van de letter waar we aan afhaal aan willen toevoegen. Let op dat we ook exitstrokes toevoegen binnen een reeks van hoofdletters 
    
    // exitstrokes
    var replacementPairs = [
      ["([à-åăāaımnñruù-üŭūxẋ"+letters.r1+letters.p4+letters.p6+letters.aabreve+letters.aamacron+letters.uubreve+letters.uumacron+"])("+right+")", connectors.cen], // except M, X, H and l, h, k, d, i, t1. Note that dotless i stays with the main class.
      ["([M])("+right+")", connectors.ceM],
      ["([lH])("+right+")", connectors.ceH],
      ["([hk])("+right+")", connectors.ceh],
      ["([diì-ïĭīKRUÙ-ÜŬŪX"+letters.A1+letters.M1+letters.N1+letters.A2+letters.N2+letters.M2+"])("+right+")", connectors.ced],
      ["(["+letters.t1+"])("+right+")", connectors.cet1],
      ["([qzž"+letters.z1+letters.z1caron+"])("+right+")", connectors.ceq], // except f, Q, Z
      ["([f])("+right+")", connectors.cef],
      ["(["+letters.f1+"])("+right+")", connectors.cef1],
      ["(["+letters.f4+"])("+right+")", connectors.cef4],
      ["(["+letters.q1+"])("+right+")", connectors.ceq1],
      ["(["+letters.q2+"])("+right+")", connectors.ceq2],
      ["([QZ])("+right+")", connectors.ceQ],
      ["([p"+letters.p2+"])("+right+")",  connectors.cep],
      ["([ß])("+right+")",  connectors.ceß],
      ["([sš"+letters.s1+letters.s1caron+"])("+right+")",  connectors.ces],
      ["([gȷyýÿG"+letters.y1+"])("+right+")", connectors.ceg], // anything without stuff above the midline
      ["([jJYÝŸ"+letters.ij+letters.ij1+letters.IJ+"])("+right+")", connectors.cej], // anything with dots or stuff above the midline
      ["([bvw"+letters.w1+"])("+right+")", connectors.cev],
      ["([oò-öøŏō"+letters.oobreve+letters.oomacron+"])("+right+")", connectors.ceo],
      ["([ceè-ëĕēçœæ"+letters.eebreve+letters.eemacron+"])("+right+")", connectors.cee], // except E, C, L
      ["([CÇL])("+right+")", connectors.ceC], // for kerning
      ["([EÈ-ËĔĒŒÆ])("+right+")", connectors.ceE], // for kerning
      ["([tŧ])("+right+")", connectors.cet],
      ["(["+letters.r2+"])("+right+")", connectors.cer2],
      ["([AÀ-ÅĂĀ])("+right+")", connectors.ceA],
      ["([BSŠ])("+right+")", connectors.ceB],
      ["([OÒ-ÖØŎŌVW])("+right+")", connectors.ceO],
      ["([D])("+right+")", connectors.ceD],
      ["([P])("+right+")", connectors.ceP],
      ["([FT])("+right+")", connectors.ceF],
      ["([IÌ-ÏĪĪ])("+right+")", connectors.ceI],
      ["([NÑ])("+right+")", connectors.ceN]
    ];
    for (var i = 0; i < replacementPairs.length; i++) {
      var zoek = new RegExp(replacementPairs[i][0], "gu");
      var vervang = "$1" + replacementPairs[i][1] + "$2";
      input = input.replace(zoek, vervang);
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
      input = input.replaceAll('i', letters.dotlessi);
      input = input.replaceAll('j', letters.dotlessj);
    }
    if (settings.nodots >= 2) {
      input = input.replaceAll(letters.t1, letters.t1dotless);
      input = input.replaceAll('x', letters.xdotless);
    }
    return input;
  }

  function fixwhitespaceligaturesConversion(input) {
    var glyph, parts, glyph1, glyph2;
    
    if (settings.initial_ligatures) {
      for (const name in fix_whitespace_ligatures) {
        glyph = fix_whitespace_ligatures[name];
        parts = name.split('_');
        if (parts[1]) {
          input = input.replace(new RegExp(connectors[parts[0]] + letters[parts[1]], 'gu'), glyph);
        }
      }
    } else {
      // if we don't want initial_ligatures, it's probably because of wordfade, so assume we want partial strokes
      // for a/c/d/g/o/q/t1 if not using entry strokes 
      input = input.replaceAll(connectors.cso, connectors.cpo);
      input = input.replaceAll(connectors.csa, connectors.cpa);
      input = input.replaceAll(connectors.cst1, connectors.cpt1);
      input = input.replaceAll(connectors.csg, connectors.cpg);
      
    }

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
    
    // convert low apostrophe to higher one. TODO: this should not apply to print-like capital letters.
    input = input.replace(/([A-Zbflhk])'/g, '$1’');
    
    return input;
  }

  // If any part of the word is invisible, no dots (i and j) or crossbars (t and x)
  // should be present anywhere in the word.
  function remove_dots(visible_input, invisible_input) {
    if (invisible_input) {
      visible_input = visible_input.replaceAll('i', letters.dotlessi);
      visible_input = visible_input.replaceAll('j', letters.dotlessj);
      visible_input = visible_input.replaceAll(letters.t1, letters.t1dotless);
      visible_input = visible_input.replaceAll('x', letters.xdotless);
      
    }
    return visible_input;
  }    
  
  init(the_settings, the_element);

  return {
    convert: convert,
    init: init,
    letterglyphs: letterglyphs,
    letterglyphs_lc: letterglyphs_lc,
    letterglyphs_uc: letterglyphs_uc,
    connectorglyphs: connectorglyphs,
    connectors: connectors,
    letters: letters,
    numberglyphs: numberglyphs,
    glyphs: glyphs,
    settings: settings,
    remove_dots: remove_dots,
  }
});

var cogncur_converter = get_cogncur_converter();
