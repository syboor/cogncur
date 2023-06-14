/* © 2023 Liesbeth Flobbe.
 */

var get_cogncur_converter = (function (the_settings, the_element) {
  var settings = {
    /* aanhalen_variant:
        0 = aanhalen vanaf de grondlijn
        1 = geen aanhalen bij c/a/d/g/o/q, de rest vanaf de grondlijn
        2 = korte aanhalen, geen aanhalen bij i/u/w
     */
    entry_strokes: 0,
    
    /* exit_strokes:
        0 = many exit strokes
        1 = no exit strokes for s en p
     */
    exit_strokes: 0,
    
    /* aanhalen_overlap:
      0 = weinig overlap tussen aanhalen en letters
      1 = meer overlap tussen aanhaal en letters bij t, o, a/c/d/g/q. De aanhaal gaat door tot het keerpunt.
     */
    aanhalen_overlap: 0,
    
    /* t_variant:
        0 = doorverbonden t
        1 = moderne t, gebogen verbindingen
        2 = moderne t, rechte verbindingen
     */
    t_variant: 0,
    
    /* fq_connection_variant:
        0 = both f and q connect from the baseline
        1 = f connects from the midline; q connects from the bottom of the stick (no loop)
     */
    fq_connection_variant: 0,
    
    /* fq_continuity_variant:
        0 = f has a pencil lift (no loop)
        1 = q has a pencil lift (??? how to combine with fq_connection_variant?)
     */
    fq_continuity_variant: 0,

    
    /* undercursves:
       0 = normal, straight connections
       1 = 'undercurves' towards i, u, j (and depending on other settings, also p, w, t, r, z
     */
    undercurves: 0,
    
    /* rz_top_variant:
        0 = wavy tops
        1 = pointy tops
     */
    rz_top_variant: 0,
    
    /* dp_variant:
        0 = sticks of d / p same length as loops
        1 = sticks shorter than loops
     */
    dp_variant: 0,

    /* uppercase_amn_variant:
        0 = German variants 
        1 = Dutch/American variants: proportionally enlarged lowercase cursive
        2 = Dutch/American variants: not-proportionally enlarged lowercase cursive
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
     smartquotes: 0
     
     
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


    csi  : '\ue060', // todo
    csn  : '\ue061', // todo
    csh  : '\ue062', // todo
    cso  : '\ue063', // todo
    csa  : '\ue064', // todo
    cse  : '\ue065', // todo
    css  : '\ue066', // todo
    cst1 : '\ue067', // todo
    cst  : '\ue068', // todo
    csz1 : '',
    csz  : '',
    
    cfs  : '\ue0d5', // invisible exit stroke for s
    cfp  : '\ue0d6', // invisible exit stroke for p
    
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
    cef4  : '\ue14C',
    
    
  }
  var variants = {
    t1 : '\ue0e4',
    t1dotless: '\ue0e5',
    xdotless: '\ue0e6',
    idotless: '\u0131', // ı ; standard unicode mapping, so can be valid user input
    jdotless: '\u0237',  // ȷ ; standard unicode mapping, so can be valid user input
    IJ: '\u0132',
    ij: '\u0133',
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
    ij1: '\ue0f3',
    w1 : '\ue0f4',
    Y1 : '\ue0f6',
    IJ1: '\ue0f7',
    W1 : '\ue0f8',
    Z1 : '\ue0f9',
    f1 : '\ue0fa',
    f2 : '\ue0fb',
    f3 : '\ue0fc',
    f4 : '\ue0fd',
    f5 : '\ue0fe',
    
    C1 : '\ue114',
    C1cedilla : '\ue115',
    G1 : '\ue116',
    L1 : '\ue117'
  }
  
  var letterglyphs_lc = 'a-zà-åçè-ëì-ïıñò-öøšŧù-üẋýÿžœæß' + variants.t1 + variants.t1dotless + variants.xdotless + variants.jdotless + variants.r1 + variants.z1 + variants.z1caron + variants.d1 + variants.p1 + variants.ij + variants.y1 + variants.ij1 + variants.w1 + variants.f1 + variants.f2 + variants.f3 + variants.f4 + variants.f5; // kleine letters + variants
  var letterglyphs_uc_connected = 'AÀ-ÅBDCÇEÈ-ËFGHIÌ-ÏJKLMNÑOÒ-ÖØPQRSŠTUÙ-ÜVWXYÝŸZŒÆ' + variants.A1 + variants.M1 + variants.N1 + variants.A2 + variants.M2 + variants.N2 + variants.IJ + variants.Y1 + variants.IJ1 + variants.W1 + variants.Z1 + variants.C1 + variants.C1cedilla + variants.G1 + variants.L1;
  var letterglyphs_uc_unconnected = ''; 
  var letterglyphs_uc = letterglyphs_uc_connected + letterglyphs_uc_unconnected;
  var letterglyphs = letterglyphs_lc + letterglyphs_uc;
  var connectorglyphs = Object.values(connectors).join(''); // connections + entry strokes + exit strokes + 'kerning connections' (containing whitespace)

  var numberglyphs = '0-9';  // tabelcijfers

  var glyphs = letterglyphs + connectorglyphs + numberglyphs;

  /* Given a string consisting of 'known' letters of the alfabet, add related glyphs (but do not add connector glyphs).
   * Input is a string and should not contain ranges.
   * Output may contain character ranges (for use in Regular Expressions).
   */
  function expand_known_letters(input) {
    if (input.indexOf('e') > -1) input += 'è-ë';
    if (input.indexOf('i') > -1) input += 'ì-ïı';
    if (input.indexOf('a') > -1) input += 'à-å';
    if (input.indexOf('o') > -1) input += 'ò-öø';
    if (input.indexOf('u') > -1) input += 'ù-ü';
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
    
    return settings;
  };
     
  function convert(input) {
    var result = input;

    result = hoofdletterIConversion(result);
    result = variantsConversion1(result);
    result = quotesConversion(result);
    
    result = aanhalenConversion(result); // this substitution needs to know whether it's beginning of the string or not

    result = " " + result + " "; // add extra space

    result = afhalenConversion(result);
    result = letterparenConversion(result);
    result = letterparenConversion(result);
    // result = beginnetjesConversion(result);
    result = variantsConversion2(result);

    result = dotlessConversion(result);
    
    // ONLY trim off the space we added at the start
    if (result.substring(0,1) == " ") result = result.substring(1);
    if (result.substring(result.length - 1) == " ") result = result.substring(0,result.length - 1);
    return result;
  }
  
  function hoofdletterIConversion(input) {
    if (settings.hoofdletter_i_variant == 1) {
      input = input.replace(/I/g, "Ј");
    }
    return input;
  }

  function variantsConversion1(input) {
    // In this function, convert all variants that require different connecting strokes than the standard version of the letter.
    // The variants produced by this function need to be matched by the function inserting the connecting strokes
    if (settings.t_variant >= 1) {
      input = input.replace(/t/g, variants.t1);
    }

    if (settings.ij_ligature == 1) {
      input = input.replace(/ij/g, variants.ij);
      input = input.replace(/IJ/g, variants.IJ);
    }

    // TODO: accented A???
    if (settings.uppercase_amn_variant == 1) {
      input = input.replace(/A/g, variants.A1);
      input = input.replace(/M/g, variants.M1);
      input = input.replace(/N/g, variants.N1);
    }
    if (settings.uppercase_amn_variant == 2) {
      input = input.replace(/A/g, variants.A2);
      input = input.replace(/M/g, variants.M2);
      input = input.replace(/N/g, variants.N2);
    }

    if (settings.rz_top_variant == 1) {
      input = input.replace(/r/g, variants.r1);
      input = input.replace(/z/g, variants.z1);
      input = input.replace(/ž/g, variants.z1caron);
    }

    if (settings.fq_connection_variant == 1) {
      if (settings.fq_continuity_variant == 1) {
        input = input.replaceAll('f', variants.f4);
      } else {
        input = input.replaceAll('f', variants.f1);
      }
    }

    if (settings.y_variant == 1) {
      input = input.replaceAll('y', variants.y1);
      input = input.replaceAll(variants.ij, variants.ij1);
    } // note that Y will be replaced in variantsConversion2
    
    if (settings.w_variant == 1) {
      input = input.replace(/w/g, variants.w1);
    }

    return input;
  }
  function variantsConversion2(input) {
    // In this function, convert all variants that have no impact on the connecting strokes used.
    // This function will be called with connecting strokes already in place.
    if (settings.exit_strokes == 1) {
      input = input.replaceAll(connectors.ces, connectors.cfs);
      input = input.replaceAll(connectors.cep, connectors.cfp);
    }

    if (settings.y_variant == 1) {
      input = input.replaceAll('Y', variants.Y1);
    }
    if (settings.w_variant == 1) {
      input = input.replaceAll('W', variants.W1);
    }
    if (settings.rz_top_variant == 1) {
      input = input.replaceAll('Z', variants.Z1);
    }
    if (settings.uppercase_cgl_variant == 1) {
      input = input.replaceAll('C', variants.C1);
      input = input.replaceAll('Ç', variants.C1cedilla);
      input = input.replaceAll('G' + connectors.ceg, variants.G1 + connectors.ceG1);
      input = input.replaceAll('G', variants.G1);
      input = input.replaceAll('L', variants.L1);
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

    if (settings.fq_continuity_variant == 1) {
      input = input.replaceAll('f', variants.f2);

      input = input.replaceAll(connectors.cef, connectors.cef2);
      input = input.replaceAll(connectors.ccqj, connectors.ccqi); // the special 'extra wide' connection is not needed if the f doesn't have a loop but just a stick
    }

    if (settings.dp_variant == 1) {
      input = input.replaceAll('d', variants.d1);
      input = input.replaceAll('p', variants.p1);
      input = input.replaceAll(variants.f4, variants.f5);
      input = input.replaceAll(variants.f2, variants.f3);
    }
    


    return input;
  }


  function letterparenConversion(input) {
    // This function needs to match the following variants:
    // - variants that can be user input (with a standard unicode mapping < \ue8000
    // - variants that require different connections than the standard letter, produced by variantsConversion1()
    var zoekVervangParen = [
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([aà-ådgqæ])", connectors.ccna],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([eè-ë])", connectors.ccne],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccnh],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+variants.y1+variants.ij1+"])", connectors.ccni],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccnn],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([sš])", connectors.ccns],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([cçoò-öøœ])", connectors.ccno],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])(["+variants.t1+"])", connectors.ccnt1],
      ["([à-åadhiì-ïıklmnñruù-üxẋHKMRUÙ-ÜX"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+variants.r1+"])([tŧ])", connectors.ccnt],

      ["([sš])([aà-ådgqæ])", connectors.ccsa],
      ["([sš])([eè-ë])", connectors.ccse],
      ["([sš])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccsh],
      ["([sš])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccsi],
      ["([sš])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccsn],
      ["([sš])([sš])", connectors.ccss],
      ["([sš])([cçoò-öøœ])", connectors.ccso],
      ["([sš])(["+variants.t1+"])", connectors.ccst1],
      ["([sš])([tŧ])", connectors.ccst],

      ["([pß])([aà-ådgqæ])", connectors.ccpa],
      ["([pß])([eè-ë])", connectors.ccpe],
      ["([pß])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccph],
      ["([pß])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccpi],
      ["([pß])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccpn],
      ["([pß])([sš])", connectors.ccps],
      ["([pß])([cçoò-öøœ])", connectors.ccpo],
      ["([pß])(["+variants.t1+"])", connectors.ccpt1],
      ["([pß])([tŧ])", connectors.ccpt],
      
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([aà-ådgqæ])", connectors.ccqa],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([eè-ë])", connectors.ccqe],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccqh],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([iì-ïıpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccqi],
      ["([fq])([jȷ])", connectors.ccqj], // special connector for 'fj' and 'qj'
      ["([zžQZ"+variants.z1+variants.z1caron+"])([jȷ])", connectors.ccqi], // but no need or 'zj'
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccqn],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([sš])", connectors.ccqs],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([cçoò-öøœ])", connectors.ccqo],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])(["+variants.t1+"])", connectors.ccqt1],
      ["([fqzžQZ"+variants.z1+variants.z1caron+"])([tŧ])", connectors.ccqt],

      ["(["+variants.f1+"])([aà-ådgqæ])", connectors.ccf1a],
      ["(["+variants.f1+"])([eè-ë])", connectors.ccf1e],
      ["(["+variants.f1+"])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccf1h],
      ["(["+variants.f1+"])([iì-ïıpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccf1i],
      ["(["+variants.f1+"])([jȷ])", connectors.ccf1j], // special connector for 'fj' and 'qj'
      ["(["+variants.f1+"])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccf1n],
      ["(["+variants.f1+"])([sš])", connectors.ccf1s],
      ["(["+variants.f1+"])([cçoò-öøœ])", connectors.ccf1o],
      ["(["+variants.f1+"])(["+variants.t1+"])", connectors.ccf1t1],
      ["(["+variants.f1+"])([tŧ])", connectors.ccf1t],

      ["(["+variants.f4+"])([aà-ådgqæ])", connectors.ccf4a],
      ["(["+variants.f4+"])([eè-ë])", connectors.ccf4e],
      ["(["+variants.f4+"])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccf4h],
      ["(["+variants.f4+"])([iì-ïıpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccf4i],
      ["(["+variants.f4+"])([jȷ])", connectors.ccf4i], // not special, just use 'ccf4i'
      ["(["+variants.f4+"])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccf4n],
      ["(["+variants.f4+"])([sš])", connectors.ccf4s],
      ["(["+variants.f4+"])([cçoò-öøœ])", connectors.ccf4o],
      ["(["+variants.f4+"])(["+variants.t1+"])", connectors.ccf4t1],
      ["(["+variants.f4+"])([tŧ])", connectors.ccf4t],

      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([aà-ådgqæ])", connectors.ccga],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([eè-ë])", connectors.ccge],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccgh],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.IJ+variants.ij1+"])", connectors.ccgi],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccgn],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([sš])", connectors.ccgs],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([cçoò-öøœ])", connectors.ccgo],
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])(["+variants.t1+"])", connectors.ccgt1], 
      ["([gjȷyýÿGJYÝŸ"+variants.ij+variants.ij1+variants.y1+variants.IJ+"])([tŧ])", connectors.ccgt],

      ["([bvw"+variants.w1+"])([aà-ådgqæ])", connectors.ccva],
      ["([bvw"+variants.w1+"])([eè-ë])", connectors.ccve],
      ["([bvw"+variants.w1+"])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccvh],
      ["([bvw"+variants.w1+"])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccvi],
      ["([bvw"+variants.w1+"])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccvn],
      ["([bvw"+variants.w1+"])([sš])", connectors.ccvs],
      ["([bvw"+variants.w1+"])([cçoò-öøœ])", connectors.ccvo],
      ["([bvw"+variants.w1+"])(["+variants.t1+"])", connectors.ccvt1], 
      ["([bvw"+variants.w1+"])([tŧ])", connectors.ccvt],

      ["([oò-öø])([aà-ådgqæ])", connectors.ccoa],
      ["([oò-öø])([eè-ë])", connectors.ccoe],
      ["([oò-öø])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccoh],
      ["([oò-öø])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccoi],
      ["([oò-öø])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccon],
      ["([oò-öø])([sš])", connectors.ccos],
      ["([oò-öø])([cçoò-öøœ])", connectors.ccoo],
      ["([oò-öø])(["+variants.t1+"])", connectors.ccot1], 
      ["([oò-öø])([tŧ])", connectors.ccot],


      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([aà-ådgqæ])", connectors.ccea],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([eè-ë])", connectors.ccee],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([bfhkl"+variants.f1+variants.f4+"])", connectors.cceh],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccei],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccen],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([sš])", connectors.cces],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([cçoò-öøœ])", connectors.cceo],
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])(["+variants.t1+"])", connectors.ccet1], 
      ["([ceè-ëçœæCÇEÈ-ËŒÆL])([tŧ])", connectors.ccet],

      ["([tŧ])([aà-ådgqæ])", connectors.ccta],
      ["([tŧ])([eè-ë])", connectors.ccte],
      ["([tŧ])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccth],
      ["([tŧ])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccti],
      ["([tŧ])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.cctn],
      ["([tŧ])([sš])", connectors.ccts],
      ["([tŧ])([cçoò-öøœ])", connectors.ccto],
      ["([tŧ])(["+variants.t1+"])", connectors.cctt1],
      ["([tŧ])([tŧ])", connectors.cctt],

      ["([A])([aà-ådgqæ])", connectors.ccAa],
      ["([A])([eè-ë])", connectors.ccAe],
      ["([A])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccAh],
      ["([A])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccAi],
      ["([A])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccAn],
      ["([A])([sš])", connectors.ccAs],
      ["([A])([cçoò-öøœ])", connectors.ccAo],
      ["([A])(["+variants.t1+"])", connectors.ccAt1],
      ["([A])([tŧ])", connectors.ccAt],

      ["([BSŠ])([aà-ådgqæ])", connectors.ccBa],
      ["([BSŠ])([eè-ë])", connectors.ccBe],
      ["([BSŠ])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccBh],
      ["([BSŠ])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccBi],
      ["([BSŠ])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccBn],
      ["([BSŠ])([sš])", connectors.ccBs],
      ["([BSŠ])([cçoò-öøœ])", connectors.ccBo],
      ["([BSŠ])(["+variants.t1+"])", connectors.ccBt1],
      ["([BSŠ])([tŧ])", connectors.ccBt],

      ["([DOÒ-ÖØVW])([aà-ådgqæ])", connectors.ccOa],
      ["([DOÒ-ÖØVW])([eè-ë])", connectors.ccOe],
      ["([DOÒ-ÖØVW])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccOh],
      ["([DOÒ-ÖØVW])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccOi],
      ["([DOÒ-ÖØVW])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccOn],
      ["([DOÒ-ÖØVW])([sš])", connectors.ccOs],
      ["([DOÒ-ÖØVW])([cçoò-öøœ])", connectors.ccOo],
      ["([DOÒ-ÖØVW])(["+variants.t1+"])", connectors.ccOt1],
      ["([DOÒ-ÖØVW])([tŧ])", connectors.ccOt],

      ["([P])([aà-ådgqæ])", connectors.ccPa],
      ["([P])([eè-ë])", connectors.ccPe],
      ["([P])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccPh],
      ["([P])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccPi],
      ["([P])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccPn],
      ["([P])([sš])", connectors.ccPs],
      ["([P])([cçoò-öøœ])", connectors.ccPo],
      ["([P])(["+variants.t1+"])", connectors.ccPt1],
      ["([P])([tŧ])", connectors.ccPt],

      ["([FT])([aà-ådgqæ])", connectors.ccFa],
      ["([FT])([eè-ë])", connectors.ccFe],
      ["([FT])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccFh],
      ["([FT])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccFi],
      ["([FT])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccFn],
      ["([FT])([sš])", connectors.ccFs],
      ["([FT])([cçoò-öøœ])", connectors.ccFo],
      ["([FT])(["+variants.t1+"])", connectors.ccFt1],
      ["([FT])([tŧ])", connectors.ccFt],

      ["([IÌ-Ï])([aà-ådgqæ])", connectors.ccIa],
      ["([IÌ-Ï])([eè-ë])", connectors.ccIe],
      ["([IÌ-Ï])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccIh],
      ["([IÌ-Ï])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccIi],
      ["([IÌ-Ï])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccIn],
      ["([IÌ-Ï])([sš])", connectors.ccIs],
      ["([IÌ-Ï])([cçoò-öøœ])", connectors.ccIo],
      ["([IÌ-Ï])(["+variants.t1+"])", connectors.ccIt1],
      ["([IÌ-Ï])([tŧ])", connectors.ccIt],

      ["([NÑ])([aà-ådgqæ])", connectors.ccNa],
      ["([NÑ])([eè-ë])", connectors.ccNe],
      ["([NÑ])([bfhkl"+variants.f1+variants.f4+"])", connectors.ccNh],
      ["([NÑ])([iì-ïıjȷpuù-üwß"+variants.r1+variants.z1+variants.z1caron+variants.y1+variants.ij1+"])", connectors.ccNi],
      ["([NÑ])([mnñrvxẋyýÿzž"+variants.ij+variants.w1+"])", connectors.ccNn],
      ["([NÑ])([sš])", connectors.ccNs],
      ["([NÑ])([cçoò-öøœ])", connectors.ccNo],
      ["([NÑ])(["+variants.t1+"])", connectors.ccNt1],
      ["([NÑ])([tŧ])", connectors.ccNt]

      // 
    ];

    for (i = 0; i < zoekVervangParen.length; i++) {
      var zoek = new RegExp(zoekVervangParen[i][0], "gu");
      var vervang = "$1" + zoekVervangParen[i][1] + "$2";
      input = input.replace(zoek, vervang);
    }
    
    return input;
  }

  function aanhalenConversion(input) {
    /* Deze functie voegt de aanhalen toe (aan het begin van het woord) */

    // LF door de connectorglyphs toe te voegen aan de regexp, wordt het mogelijk deze functie herhaald aan te roepen.
    // Herhaald aanroepen is nodig om ook tekens te converteren die als rechterbuur 'gecaptured' zijn in 
    //   de regex bij een eerdere omzetting; dit probleem speelt bij reeksen hoofdletters.
    // NB in ES2018 kan dit met (non-capturing) lookahead assertions, maar dat wordt niet door alle browsers ondersteund :(
    var left  = "[^" + letterglyphs_lc + letterglyphs_uc_connected + connectorglyphs + "]|^"; // 'non-word' teken links van de letter waar we een aanhaal aan willen toevoegen
    
    // aanhalen
    var zoekVervangParen = [
      ["("+left+")([aà-ådgqæ])", connectors.cga, connectors.csa, connectors.csa],
      ["("+left+")([eè-ë])",connectors.cge, connectors.cge, connectors.cse],
      ["("+left+")([bfhkl"+variants.f1+variants.f4+"])", connectors.cgh, connectors.cgh, connectors.csh],
      ["("+left+")([iì-ïıjȷpuù-üwß"+variants.r1+variants.y1+variants.ij1+"])", connectors.cgi, connectors.cgi, connectors.csi], 
      ["("+left+")([mnñrvxẋyýÿ"+variants.ij+variants.w1+"])", connectors.cgn, connectors.cgn, connectors.csn],
      ["("+left+")([zž])", connectors.cgz, connectors.cgz, connectors.csz], // special case, parallel with internal stroke of 'z'
      ["("+left+")(["+variants.z1+variants.z1caron+"])", connectors.cgz1, connectors.cgz1, connectors.csz1], // special case, parallel with internal stroke of 'z'
      ["("+left+")([sš])",connectors.cgs, connectors.cgs, connectors.css],
      ["("+left+")([cçoò-öøœ])", connectors.cgo, connectors.cso, connectors.cso],
      ["("+left+")(["+variants.t1+"])", connectors.cgt1, connectors.cst1, connectors.cst1],
      ["("+left+")([tŧ])", connectors.cgt, connectors.cgt, connectors.cst],
    ];
    for (var i = 0; i < zoekVervangParen.length; i++) {
      var zoek = new RegExp(zoekVervangParen[i][0], "gu");
      var vervang = "$1" + zoekVervangParen[i][settings.entry_strokes + 1] + "$2";
      input = input.replace(zoek, vervang);
    }
    
    /*
    if (settings.aanhalen_overlap == 1) {
      input = input.replaceAll('Ϧ', 'Њ'); // a/d/g/q 
      input = input.replaceAll('Ϭc', 'Ћc'); // c
      input = input.replaceAll('Ϭo', 'Ќo'); // o
      input = input.replaceAll('ϯt', 'Ѝt'); // t
    }
    */

    
   
    return input;
  }

  function afhalenConversion(input) {
    /* Deze functie voegt de afhalen toe (aan het eind van het woord). */

    // LF door de connectorglyphs toe te voegen aan de regexp, wordt het mogelijk deze functie herhaald aan te roepen.
    // Herhaald aanroepen is nodig om ook tekens te converteren die als rechterbuur 'gecaptured' zijn in 
    //   de regex bij een eerdere omzetting; dit probleem speelt bij reeksen hoofdletters.
    // NB in ES2018 kan dit met (non-capturing) lookahead assertions, maar dat wordt niet door alle browsers ondersteund :(
    var right = "[^" + letterglyphs_lc + connectorglyphs + "]"; // 'non-word' teken rechts van de letter waar we aan afhaal aan willen toevoegen. Let op dat we ook afhalen toevoegen binnen een reeks van hoofdletters 
    
    // afhalen
    var zoekVervangParen = [
      ["([à-åaımnñruù-üxẋ"+variants.r1+"])("+right+")", connectors.cen], // except M, X, H and l, h, k, d, i, t1. Note that dotless i stays with the main class.
      ["([M])("+right+")", connectors.ceM],
      ["([lH])("+right+")", connectors.ceH],
      ["([hkX])("+right+")", connectors.ceh],
      ["([diì-ïKRUÙ-Ü"+variants.t1+variants.A1+variants.M1+variants.N1+variants.A2+variants.N2+variants.M2+"])("+right+")", connectors.ced],
      ["([qzž"+variants.z1+variants.z1caron+"])("+right+")", connectors.ceq], // except f, Q, Z
      ["([f])("+right+")", connectors.cef],
      ["(["+variants.f1+"])("+right+")", connectors.cef1],
      ["(["+variants.f4+"])("+right+")", connectors.cef4],
      ["([QZ])("+right+")", connectors.ceQ],
      ["([pß])("+right+")",  connectors.cep],
      ["([sš])("+right+")",  connectors.ces],
      ["([gȷyýÿG"+variants.y1+"])("+right+")", connectors.ceg], // anything without stuff above the midline
      ["([jJYÝŸ"+variants.ij+variants.ij1+variants.IJ+"])("+right+")", connectors.cej], // anything with dots or stuff above the midline
      ["([bvw"+variants.w1+"])("+right+")", connectors.cev],
      ["([oò-öø])("+right+")", connectors.ceo],
      ["([ceè-ëçœæ])("+right+")", connectors.cee], // except E, C, L
      ["([CÇL])("+right+")", connectors.ceC], // for kerning
      ["([EÈ-ËŒÆ])("+right+")", connectors.ceE], // for kerning
      ["([tŧ])("+right+")", connectors.cet],
      ["([A])("+right+")", connectors.ceA],
      ["([BSŠ])("+right+")", connectors.ceB],
      ["([DOÒ-ÖØVW])("+right+")", connectors.ceO],
      ["([P])("+right+")", connectors.ceP],
      ["([FT])("+right+")", connectors.ceF],
      ["([IÌ-Ï])("+right+")", connectors.ceI],
      ["([NÑ])("+right+")", connectors.ceN]
    ];
    for (var i = 0; i < zoekVervangParen.length; i++) {
      var zoek = new RegExp(zoekVervangParen[i][0], "gu");
      var vervang = "$1" + zoekVervangParen[i][1] + "$2";
      input = input.replace(zoek, vervang);
    }
    
    return input;
  }

  function dotlessConversion(input) {
    // i => dotlessi, j => dotless j, t => custom glyph t without crossbar
    if (settings.nodots >= 1) {
      input = input.replaceAll('i', 'ı');
      input = input.replaceAll('j', 'ȷ');
    }
    if (settings.nodots >= 2) {
      input = input.replaceAll('t', 'ŧ');
      input = input.replaceAll('x', 'ẋ');
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
      // ': if not after an s ("parents' wishes") and before a space or at the end of the string, it's a closing quote
      input = input.replace(/([^s])'(\s|$)/g, '$1' + singleclose + '$2');
      // ': after an s and before a space, but also after an opening quote on the same line, it's a closing quote
      // (please, for the love of god, use double quotes if you're going to have an apostrophe inside a quote, OK?!?)
      var zoek = new RegExp(singleopen + '([^\n\r\'' + singleclose + ']+)' + "s'" + '(\\s|$)', 'g');
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
      visible_input = visible_input.replaceAll('i', variants.idotless);
      visible_input = visible_input.replaceAll('j', variants.jdotless);
      visible_input = visible_input.replaceAll(variants.t1, variants.t1dotless);
      visible_input = visible_input.replaceAll('x', variants.xdotless);
      
      // 'tt' ligature needs to be reverted to two (barless) t's
      visible_input = visible_input.replaceAll('ϐ', 'ŧΚŧ');
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
    variants: variants,
    numberglyphs: numberglyphs,
    glyphs: glyphs,
    settings: settings,
    remove_dots: remove_dots,
  }
});

var cogncur_converter = get_cogncur_converter();
