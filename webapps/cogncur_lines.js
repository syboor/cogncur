/* Liesbeth Flobbe
 * Requires jQuerys and cogncur_converter.js.
 *
 * This is all the stuff needed to add lines, outlines, etc.
 * 
 */

/* Classes handled by this script:
   .line:  adds line elements and converts text
   .rawline:  adds line elements but does not convert glyphs
   
   .letter: converts text
   
   .repeat_outline_copy: every child line encountered will be repeated twice. The first version will be "outline", 
     the second line will be be 'invisible-except-first'.
   .repeat_outline_copy_copy: same, but with two copies
   .repeat_copy: every child line encountered will be repeated twice. The first version will be normal (black), 
     the second line will be be 'invisible-except-first'.
   .repeat_copy_copy: same, but with two copies
   
   .startpunten, .startpunten-zwart: Can be used with the .repeat-*-copy classes to indicate that we want
     small starting points rather than strokes on the copy lines.

     
 */

/* < ES6 shenanigans */
if (typeof String.prototype.repeat == 'undefined') {
  String.prototype.repeat = function( num ) {
    var result = '';
    for (var i = 0; i < num; i++) {
      result = result + this;
    }
    return result;
  }
}
 
var get_cogncur_lines = (function () {
  var auto = true; /* Automatically convert $(document) */

  var default_settings = cogncur_converter.init(); // In case the invoking HTML did an init on the default/global cogncur object
      
  function escapeHtml(text) {
      return text.replace(/[\"&'<>]/g, function (a) { /* '/' character deliberately omitted since it may occur in math text */
          return {
              '"': '&quot;', '&': '&amp;', "'": '&#39;',
              '<': '&lt;',  '>': '&gt;'
          }[a];
      });
  }      
  
  function replace_text_nodes(element, replace_function) {
    $(element).contents()    // like children(), accept that children() never returns direct textNode-children. 
      .each(function () {          
        if (this.nodeType === 3) {
          this.nodeValue = replace_function(this.nodeValue);
        } else {
          replace_text_nodes(this, replace_function);
        }
      });
  }

  function replace_text_nodes_with_html(element, replace_function) {
    $(element).contents()    // like children(), accept that children() never returns direct textNode-children. 
      .each(function () {   
        if (this.nodeType === 3) {
          $(this).replaceWith(replace_function(escapeHtml(this.nodeValue)));
        } else {
          replace_text_nodes_with_html(this, replace_function);
        }
      });
  }
  
  function repeat_lines(element, repeats, add_to_source_classes, add_to_copy_classes, add_to_copy_atts, line_selector) {
    repeats = repeats || 1;
    add_to_source_classes = add_to_source_classes || '';
    add_to_copy_classes = add_to_copy_classes || '';
    add_to_copy_atts = add_to_copy_atts || {};
    line_selector = line_selector || '.line, .rawline';
	
	
    $(element).find(line_selector).each(function () {
      var copy;
      var child = this;
      var insert_after = child;
      $(child).removeClass(add_to_source_classes);
      for (var i = 0; i < repeats; i++) {
        copy = $(child).clone().insertAfter(insert_after);
        
        if (add_to_copy_classes) copy.addClass(add_to_copy_classes);
        if (add_to_copy_atts) $(copy).attr(add_to_copy_atts); 
        insert_after = copy;
      }
      if (add_to_source_classes) $(child).addClass(add_to_source_classes);
    });      
  }
  
  function repeat_cols(element, repeatspec, row_selector, col_selector, separator) {
    repeatspec = repeatspec || [
      { n : 1,
        classes : 'cursive',
        attr : {}
      },
      { n : 1,
        classes : 'cursive outline',
        attr : {}
      },
      { n : 1,
        classes : 'cursive traceable',
        attr : {}
      },
      { n : 1,
        classes : 'cursive traceable startpunten-font',
        attr : {}
      },
      { n : 1,
        classes : 'cursive invisible',
        attr : {}
      }
    ];
    if (typeof(row_selector) == 'undefined') row_selector = 'tr';
    if (typeof(col_selector) == 'undefined') col_selector = 'td';
    if (typeof(separator) == 'undefined') separator || false;
    
    var rows;
    if (row_selector) {
      rows = $(element).find(row_selector); 
    } else {
      rows = $(element);
    }
    
    $(rows).each(function () {
      var row = this;
      var source = $(row).find(col_selector).remove();
      for (var i = 0; i < repeatspec.length; i++) {
        for (var j = 0; j < repeatspec[i].n; j++) {
          copy = $(source).clone().appendTo(row);
          if (typeof repeatspec[i].classes != 'undefined') copy.addClass(repeatspec[i].classes.split(/[ ]+/));
          if (typeof repeatspec[i].attr != 'undefined') copy.attr(repeatspec[i].attr);
          if (separator) $(separator).appendTo(row);
        }
      }
    });
  }
  
  /* Repeat lines in two styles */
  function repeat_lines_twice(element, repeats1, repeats2, add_to_source_classes, add_to_copy_classes1, add_to_copy_atts1, add_to_copy_classes2, add_to_copy_atts2) {
    repeats1 = repeats1 || 1;
    repeats2 = repeats2 || 1;
    add_to_source_classes = add_to_source_classes || '';
    add_to_copy_classes1 = add_to_copy_classes1 || '';
    add_to_copy_atts1 = add_to_copy_atts1 || {};
    add_to_copy_classes2 = add_to_copy_classes2 || '';
    add_to_copy_atts2  = add_to_copy_atts2 || {};
	
	
    $(element).find('.line, .rawline').each(function () {
      var copy;
      var child = this;
      var insert_after = child;
      $(child).removeClass(add_to_source_classes);
      for (var i = 0; i < repeats1; i++) {
        copy = $(child).clone().insertAfter(insert_after);
        if (add_to_copy_classes1) copy.addClass(add_to_copy_classes1);
        if (add_to_copy_atts1) $(copy).attr(add_to_copy_atts1); 
        insert_after = copy;
      }
      for (var i = 0; i < repeats2; i++) {
        copy = $(child).clone().insertAfter(insert_after);
        if (add_to_copy_classes2) copy.addClass(add_to_copy_classes2);
        if (add_to_copy_atts2) $(copy).attr(add_to_copy_atts2); 
        insert_after = copy;
      }

      if (add_to_source_classes) $(child).addClass(add_to_source_classes);
    });      
  }  

  // Trim en pad het getal.
  // Deze acties doen we op de kale tekst, voordat deze wordt omgezet in <td>'s
  function repeatnumbers_prepare(element) {
    var lines = $(element).text().split("\n");
    var nspaces = $(element).data('nspaces') || 1;
    var output = '';

    lines.forEach(function (value, index) {
      if (!value.trim()) return;
      var number = value.trim().split(/[ ]+/).shift().trim(); // number now contains the first number on the line, the rest is discarded
      output = (output ? output + "\n" : '') + (number + ' '.repeat(nspaces));
      
    });
    $(element).text(output);
    
  }
  
  /* Neem een wordfade_spectext element, waarbij de specificaties als getallen in de tekst stan.
   * Zet dit om naar een normaal wordfade element met specificaties via data-attributen.
   */
  function wordfade_spectext_prepare(line_element, settings_element, repeat1_classes) {
    /* A line of text consistst of a word, followed by a number of repetitions:
     *   ee            # the word is ee, every step is repeated 1 times
     *   ee 2          # the word is ee, every step is repeated 2 times
     *   ee 1,0,1,2,2  # the word is ee, the first step is repeated 1, the second step is skipped, the 3rd step is repeated 1, the 4th and 5th step are repeated twice
     *   ee 1,2        # the word is ee, the first step is repeated once, the second step twice, the 3rd step once, the 4th step twice, etc.
     *
     *
     * step 1 = whole word
     * step 2 = whole word minus last letter (that is minus 2 glyphs!!!)
     * step 3 = whole word minus 3 glyphs
     * step 4 = whole word minus 4 glyphs
     * last step (equal to number of glyphs) = startpunt
     *
     * Note that 'whole word minus 1 glyph' does not exist as a step (but is possible via data-invisible-from=N)
     *      
     */
    var nspaces = $(settings_element).data('nspaces') || 3;
    $(line_element).attr('data-nspaces', nspaces);
    var input = $(line_element).text();

    var repetition_specs = input.trim().split(/[ ]+/);
    var word_input = repetition_specs.shift().trim();  // word_input now contains the word, repetitions_specs contains a list of numbers
    var nglyphs;  // number of glyphs in element word
    nglyphs = 2 * word_input.replace('ij', 'y').length + 1;
    var repeat;
    var from;
    
    if (typeof repeat1_classes !== 'undefined') {
      $(line_element).attr('data-repeat1-n', 1); // Set number of repeats
      $(line_element).attr('data-repeat1-classes', repeat1_classes);
    } else {
      $(line_element).attr('data-repeat1-n', 0); // Set number of repeats
    }
    
    for (var step = 1; step <= nglyphs; step++) {
      repeat = (repetition_specs.length ? parseInt(repetition_specs[(step - 1) % repetition_specs.length]) : 1);
      if (isNaN(parseInt(repeat))) repeat = 1;
      
      $(line_element).attr('data-repeat' + (step+1) + '-n', repeat); // Set number of repeats
      
      if (step == 1) { // whole word
        ; // do nothing special
      } else if (step == nglyphs) { // starting point
        $(line_element).attr('data-repeat' + (step+1) + '-classes', 'startpunten-font');
      } else { // 
        $(line_element)
          .attr('data-repeat' + (step+1) + '-invisible-from', nglyphs - step)
          .attr('data-repeat' + (step+1) + '-classes', 'invisible-from')
      }
    }
    
    $(line_element).addClass('repeatwords').attr('data-nrepeats', nglyphs + 1);

    return;
  }
  
  /* Zet elk teken in de tekst in een eigen 'hokje'. Bedoeld voor cijfers, niet voor tekst!!!
   * los = hokjes los van elkaar, dwz witruimte krijgt geen hokje, en de regels zijn los van elkaar.
   *       getallen van meerdere cijfers krijgen wel hokjes aan elkaar
   * raw = geen omzetting van de inhoud van de hokjes via cogncur
   */
  function get_replace_hokjes(cogncur_converter, los, raw) {
    function replace_hokjes(value) {
      var lines = value.split("\n");
      var line_result; 
      var result = '';
      var first_line_done = false;
      var row, col, cols_generated, next, leading_zeros_done, digit;
      var max_line_length = 0;
      var td_class;
      var prev_td_class;

      // strip completely empty lines (no spaces) at beginning and end
      while (lines[0] == '') lines.shift(); // strip leading empty line
      while (lines[lines.length - 1] == '') lines.pop(); // strip leading empty line

      // determine longest line length
      for (row = 0; row < lines.length; row++) {
        max_line_length = Math.max(max_line_length, lines[row].replace(',', '').replace('.', '').length);
      }

      for (row = 0; row < lines.length; row++) {
        //lines[row] = lines[row].replace(/\s+$/g, ''); // rtrim
        line_result = '';
        prev_td_class = 'skip';

        //leading_zeros_done = false;
        col = 0; // This is where we are in our input string
        cols_generated = 0; // This is the number of columns generated. Sometimes an input character doesn't generate a column.
        while (cols_generated < max_line_length) {
          td_class = '';
          digit = lines[row][col];
          if (!digit) digit = ' '; // pad to longest line length
          next = lines[row][col+1];

          col++;
          if (digit == '.' || digit == ',' || digit == ':' || digit == ';') continue;

          //if (digit == '0' && next && next.match(/[0-9]/) && leading_zeros_done == false) digit = ' ';
          //if (digit.match(/[1-9]/)) leading_zeros_done = true;
          //if (!digit.match(/[0-9]/)) leading_zeros_done = false;
          digit = digit.replace(/\*/g, '\u00D7'); // multiplication sign
          //digit = digit.replace(/\//g, '\u00F7'); // division (anglosaxon)

          if (!raw) digit = cogncur_converter.convert(digit);
          
          if (next == '.' || next == ',' || next == ':' || next == ';') {
            digit = digit + '<span class="tussen_de_hokjes">' + (raw ? next : cogncur_converter.convert(next)) + '</span>';
          }
          
          if (los && digit == ' ') td_class='skip';
          if (digit == ' ' || digit == '_') digit = '&nbsp;';
          if (prev_td_class != 'skip' && td_class != 'skip') td_class='next';

          line_result = line_result + "<td class='"+td_class+"'><div class='hokjes-cell'><div class='hokjes-rompzone'></div><div class='hokjes-content'>" + digit + "</div></div></td>";
          
          prev_td_class = td_class;
          cols_generated++;
        }
        result = result + "<tr>" + line_result + "</tr>\n";
      }
      return "<table class='hokjes-table'>" + result + "</table>";
    }
    
    return replace_hokjes;
  }
      
  function repeatlines(element, line_selector, settings_element) {
    var settings_element = settings_element || element;
    var line_selector = line_selector || '.line';
    
    var repeats = $(settings_element).data('nlines') || 1;
    var i;
    var j;
    var line_classes;
    var container = element;
    
    $(element).find(line_selector).each(function () {
      var copy;
      var child = this;
      var insert_after = child;
      var line_classes = '';
      var line_data = {};
      var key;
      var value;
      
      for (var i = 2; i <= repeats; i++) {
        if (i > 1) {
          copy = $(child).clone().insertAfter(insert_after);
        } else {
          copy = child; 
        }

        // Find applicable classes for this line
        for (j = i; j >= 1; j--) {
          line_classes = $(settings_element).data('line'+j+'-classes');
          if (line_classes) break;
        }          
        if (line_classes) copy.addClass(line_classes.trim().split(/\s+/));
        
        // Find applicable data attributes for this line
        for (key in default_settings) {
          key = key.replace(/_/g, '-');
          for (j = i; j >= 1; j--) {
            value = $(settings_element).data('line'+j+'-attr-cogncur-'+key);
            if (typeof value != 'undefined') {
              $(copy).attr('data-cogncur-'+key, value);
              break;
            }
          }
        }
        // Find other data attributes to be copied
        $.each(['overlay-classes'], function (dummy, key) {
          for (j = i; j >= 1; j--) {
            value = $(settings_element).data('line'+j+'-attr-'+key);
            if (typeof value != 'undefined') {
              $(copy).attr('data-'+key, value);
              break;
            }
          }
        });
        
        insert_after = copy;
      }
      $(copy).addClass('lastrepeat');
      $(child).addClass('firstrepeat');
      
      line_classes = $(settings_element).data('line1-classes');
      if (line_classes) $(this).addClass(line_classes.trim().split(/\s+/));

      // Find other data attributes to be copied to the first line
      var that = this;
      $.each(['overlay-classes'], function (dummy, key) {
        value = $(settings_element).data('line1-attr-'+key);
        if (typeof value != 'undefined') {
          $(that).attr('data-'+key, value);
        }
      });

        
      
    });   
  }    

  /* for every word in the input, make it invisible from position <from>
   * 
   * if compensate_for_missing_connector == true, then:
   * - position 1 is after the first connecting glyph, or after the letter 1if there is no connecting glyph
   *   if available, a zero-width 'starting' glyph (representing part of letter 1) may be inserted
   * - position 2 is after letter 1
   * - position 3 is after the connector between letter 1 and 2
   * - position 4 is after letter 2
   * - position 5 is after the connector between letter 2 and 3
   * etc.
   *
   * if compensate_for_missing_connector == false, then position 1 is literally after
   * the glyph 1, regardless of whether that is a connector glyph or letter, etc.
   * 
   */
  function replace_words_invisible_from(input, from, compensate_for_missing_connector) {
    if (input == '\u00A0') return input; // if the entire input is a &nbsp;, return it intact (default behaviour for this function would remove it...)
      
    var input_words = input.split(' '); // Will produce empty 'words' when we have multiple spaces
    var output_words = [];
    var from = from || 1;
    var compensate_for_missing_connector = compensate_for_missing_connector || false;
    input_words.forEach(function (input_word) {
      var input_losseletters = input_word.split('\u200A'); // A word can be split into separate groups of leters
      var output_losseletters = [];
      input_losseletters.forEach(function (input_losseletter) {
       
        var starts_with_connector = input_losseletter.match('^[' + cogncur_converter.connectorglyphs + ']') ? true : false;
        var output_losseletter = '';
        var word_from = from;
        if (!starts_with_connector && compensate_for_missing_connector && from > 1) word_from--;


        if (input_losseletter.trim()) {
          var visible_input = input_losseletter.slice(0,word_from);
          var invisible_input = input_losseletter.slice(word_from);
          visible_input = cogncur_converter.remove_dots(visible_input, invisible_input);
          output_losseletter = visible_input + '<span class="invisible">' + invisible_input + '</span>';
        }
        output_losseletters.push(output_losseletter);
      });

      output_words.push(output_losseletters.join('\u200A'));
    });
    return output_words.join(' ');

  }
  
      
  

  function do_everything(rootnode) {
    $(rootnode).find('.repeatlines').each(function () {
      repeatlines($(this), '.line', $(this));
    });
    
    $(rootnode).find('.line.empty').text(' ');
    $(rootnode).find('.line, .rawline').append('<div class="baselines"></div>'); 
    $(rootnode).find('.line, .rawline').append('<div class="outerlines"></div>'); 
    
    $(rootnode).find('.page').wrap("<div class='page_container'></div>" );
    // whitespace between elements under .page will break some side-by-side layouts, so remove them
    $(".page")
      .contents()
      .each(function () {
        if (this.nodeType == 3 && this.nodeValue.trim() == '') {
          $(this).remove(); 
        }
      });
    
    $(rootnode).find('.page_container').each(function (index, element) {
      if (index % 2) {
        $(element).addClass('page_container_even');
      } else {
        $(element).addClass('page_container_odd');
      }
    });
    
    $(rootnode).find('.line.masqued-upper, .masqued-upper .line').append('<div class="masque-upper"></div>'); 
    $(rootnode).find('.line.masqued-lower, .masqued-lower .line').append('<div class="masque-lower"></div>'); 
    $(rootnode).find('.line.masqued-body, .masqued-body .line').append('<div class="masque-body"></div>'); 

    $(rootnode).find('.repeatnumbers').each(function() {
      repeatnumbers_prepare(this);
    });
    
    $(rootnode).find('.wordfade_spectext .line, .wordfade_spectext.line').each(function() {
      wordfade_spectext_prepare(this, $(this).closest('.wordfade_spectext'));
      $(this).addClass('traceable');
    });
    $(rootnode).find('.repeat_wordfade_spectext .line, .repeat_wordfade_spectext.line').each(function() {
      wordfade_spectext_prepare(this, $(this).closest('.repeat_wordfade_spectext'), 'black');
      $(this).addClass('traceable');
    });
    $(rootnode).find('.outline_wordfade_spectext .line, .outline_wordfade_spectext.line').each(function() {
      wordfade_spectext_prepare(this, $(this).closest('.outline_wordfade_spectext'), 'outline');
      $(this).addClass('traceable');
    });

    $(rootnode).find('.inodot').append('<div class="masqued-dot"></div>'); 

    
    $(rootnode).find('.repeat_outline_copy').each(function () {
      // iff there is a startpunten_variant setting, it should only apply to the copies, not to the original
      var atts = {};
      var copy_classes = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) copy_classes += " startpunten-font";
      repeat_lines(this, 1, 'outline', copy_classes, {}); 
    });
    $(rootnode).find('.repeat_outline_copy_copy').each(function () {
      var atts = {};
      var copy_classes = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten-zwart')) copy_classes = 'invisible-except-first';

      if ($(this).hasClass('startpunten_once')) {
        repeat_lines_twice(this, 1, 1, 'outline', copy_classes,  {}, copy_classes + " startpunten-font", {});
      } else {
        if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) copy_classes += " startpunten-font";
        repeat_lines(this, 2, 'outline', copy_classes, {});
      }

    });
    $(rootnode).find('.repeat_traceable_copy').each(function () {
      // iff there is a startpunten_variant setting, it should only apply to the copies, not to the original
      var atts = {};
      var copy_classes = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten-zwart')) copy_classes = 'invisible-except-first';
      if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) atts = {'data-cogncur-startpunten-variant': 1};
      repeat_lines(this, 1, 'traceable', copy_classes, atts); 
    });
    $(rootnode).find('.repeat_traceable_copy_copy').each(function () {
      var atts = {};
      var copy_classes = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten-zwart')) copy_classes = 'invisible-except-first';
      if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) atts = {'data-cogncur-startpunten-variant': 1};
      if ($(this).hasClass('startpunten_once')) {
        repeat_lines_twice(this, 1, 1, 'traceable', copy_classes,  {}, copy_classes, atts);
      } else {
        repeat_lines(this, 2, 'traceable', copy_classes, atts);
      }
    });    
    $(rootnode).find('.repeat_black_traceable_copy_copy').each(function () {
      var atts = {};
      var copy_classes1 = 'traceable';
      var copy_classes2 = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten-zwart')) copy_classes2 = 'invisible-except-first';
      if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) atts = {'data-cogncur-startpunten-variant': 1};
      // startpunten_once is not supported
      repeat_lines_twice(this, 1, 2, '', copy_classes1, {}, copy_classes2, atts);
    });    


    $(rootnode).find('.repeat_copy').each(function () {
      var atts = {};
      var copy_classes = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten-zwart')) copy_classes = 'invisible-except-first';
      if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) atts = {'data-cogncur-startpunten-variant': 1};
      repeat_lines(this, 1, '', copy_classes, atts);
    });
    $(rootnode).find('.repeat_copy_copy').each(function () {
      var atts = {};
      var copy_classes = 'traceable invisible-except-first';
      if ($(this).hasClass('startpunten-zwart')) copy_classes = 'invisible-except-first';
      if ($(this).hasClass('startpunten') || $(this).hasClass('startpunten-zwart') || $(this).hasClass('startpunten_once')) atts = {'data-cogncur-startpunten-variant': 1};
      if ($(this).hasClass('startpunten_once')) {
        repeat_lines_twice(this, 1, 1, '', copy_classes,  {}, copy_classes, atts);
      } else {
        repeat_lines(this, 2, '', copy_classes, atts);
      }
    });
    
    
    $(rootnode).find('.repeat_outline_finish').each(function () {
      repeat_lines(this, 1, 'outline', 'traceable invisible_except_known');
    });
    $(rootnode).find('.repeat_outline_finish_finish').each(function () {
      repeat_lines(this, 2, 'outline', 'traceable invisible_except_known');
    });
    $(rootnode).find('.repeat_traceable_finish').each(function () {
      repeat_lines(this, 1, 'traceable', 'traceable invisible_except_known');
    });
    $(rootnode).find('.repeat_traceable_finish_finish').each(function () {
      repeat_lines(this, 2, 'traceable', 'traceable invisible_except_known');
    });
    $(rootnode).find('.repeat_finish').each(function () {
      repeat_lines(this, 1, '', 'traceable invisible_except_known');
    });
    $(rootnode).find('.repeat_finish_finish').each(function () {
      repeat_lines(this, 2, '', 'traceable invisible_except_known');
    });
    $(rootnode).find('.repeat_empty').each(function () {
      repeat_lines(this, 1, '', 'invisible');
    });
    $(rootnode).find('.repeat_empty_empty').each(function () {
      repeat_lines(this, 2, '', 'invisible');
    });
    $(rootnode).find('.repeat_outline_empty').each(function () {
      repeat_lines(this, 1, 'outline', 'invisible');
    });
    $(rootnode).find('.repeat_outline_empty_empty').each(function () {
      repeat_lines(this, 2, 'outline', 'invisible');
    });
    $(rootnode).find('.repeat_traceable_empty').each(function () {
      repeat_lines(this, 1, 'traceable', 'invisible');
    });
    $(rootnode).find('.repeat_traceable_empty_empty').each(function () {
      repeat_lines(this, 2, 'traceable', 'invisible');
    });

    // Convert .hokjes into table and substitute content
    $(rootnode).find('.hokjes').each(function () {
      var cogncur_converter = get_cogncur_converter(default_settings, this);
      var los = false;
      if ($(this).closest('.hokjes-los').length) los = true;
      var replace_hokjes = get_replace_hokjes(cogncur_converter, los, false);
      replace_text_nodes_with_html(this, replace_hokjes);
    });

    // Convert .hokjes-raw into table without substituting content
    $(rootnode).find('.hokjes-raw').each(function () {
      var cogncur_converter = get_cogncur_converter(default_settings, this);
      var los = false;
      if ($(this).closest('.hokjes-los').length) los = true;
      var replace_hokjes = get_replace_hokjes(cogncur_converter, los, true);
      replace_text_nodes_with_html(this, replace_hokjes);
    });
    
    $(rootnode).find('.repeatlines.hokjes-table, .repeatlines .hokjes-table').each(function () {
      repeatlines($(this), 'tr', $(this).closest('.repeatlines'));
    });    
    
    // NB .repeatnumbers should always be combined with .hokjes
    $(rootnode).find('.repeatnumbers').each(function() {
      var nrepeats = $(this).data('nrepeats');
      var repeatspec = [];
      var nspaces = $(this).data('nspaces') || 1;

      for (var nrepeat=1; nrepeat <= nrepeats; nrepeat++) {
        if ($(this).data('repeat'+nrepeat+'-n')) {
          repeatspec.push({
            n : $(this).data('repeat'+nrepeat+'-n') || 1,
            classes : $(this).data('repeat'+nrepeat+'-classes') || ''
          });
        }
      }
      repeat_cols($(this).find('.hokjes-table'), repeatspec);
      
      // Bij repeatnumber_prepare hebben we lege hokjes ('spaties') toegevoegd. 
      // We willen echter geen lege hokjes aan het eind van de regel. 
      // Dus we verwijderen wat we te veel hebben toegevoegd.
      for (var i = 0; i < nspaces; i++) {
        $(this).find('td:last-child').remove();
      }
    });    
    $(rootnode).find('.empty .hokjes-content').text('\u00a0'); // nbsp
    
    $(rootnode).find('.repeatwords').each(function() {
      var line_selector;
      var lines;
      if ($(this).hasClass('line')) {
        line_selector = false;
        lines = $(this);
      } else {
        line_selector = '.line';
        lines = $(this).find('.line');
      }
      
      // Wrap every first word, discard the rest
      $(lines).each(function () {
        replace_text_nodes_with_html(this, function (input) {
          var words = input.trim().split(/[ ]+/);
          var word = words.shift();
          return '<span class="word">' + word + '</span>';
        });
      });
      var nrepeats = $(this).data('nrepeats');
      var repeatspec = [];
      var nspaces = $(this).data('nspaces') || 1;
      var attr;

      for (var nrepeat=1; nrepeat <= nrepeats; nrepeat++) {
        if ($(this).data('repeat'+nrepeat+'-n')) {
          attr = {};
          if ($(this).data('repeat'+nrepeat+'-invisible-from')) {
            attr['data-invisible-from'] = $(this).data('repeat'+nrepeat+'-invisible-from');
          }

          repeatspec.push({
            'n' : $(this).data('repeat'+nrepeat+'-n') || 1,
            'classes' : $(this).data('repeat'+nrepeat+'-classes') || '',
            'attr' : attr
          });
        }
      }
      repeat_cols(this, repeatspec, line_selector, '.word', '<span class="space">'+ ' '.repeat(nspaces) + '</span>');
    });
    
    
    // Overlay two copies of the text (normal + startpunten) onto each other, for complete lines.
    $(rootnode).find('.line.startpunt-overlay-zwart, .startpunt-overlay-zwart .line, .line.startpunt-overlay-rood, .startpunt-overlay-rood .line, .line.startpunt-overlay-groen, .startpunt-overlay-groen .line').each(function () {
      var content = $(this).text();
      
      var overlay = $('<div class="line-overlay"></div>').text(content).addClass('startpunten-font');
      var data = $(this).data();

      if ($(this).closest('.startpunt-overlay-groen').length) {
        $(overlay).addClass('green');
      } else if ($(this).closest('.startpunt-overlay-rood').length) {
        $(overlay).addClass('red');
      } else {
        $(overlay).addClass('black');
      }
      
      $(this).find('.baselines').remove();
      $(this).find('.outerlines').remove();
      $(this).addClass('line-original').removeClass('line').wrap('<div class="line line-container"></div>');
      
      var wrapper = $(this).parent(); // the wrapper
      $(wrapper).append(overlay);
      $(wrapper).removeClass('line').addClass('rawline'); // prevent conversion at the .line level, allowing us to convert the .line-original and .line-overlay separately and with different settings each 
      
      // copy classes to the wrapper
      var that = this;
      var copy_to_wrapper_classes = ['norompline', 'noouterlines', 'nolines', 'blacklines', 'blueredlines', 'noromphoogtelijn', 'romphoogtelijn'];
      $(copy_to_wrapper_classes).each(function (index, value) {
        if ($(that).hasClass(value)) $(wrapper).addClass(value);
      });



      // Copy all data-attributes to overlay
      $.each($(this)[0].attributes, function () {
        if (this.name.substr(0,4) == 'data') {
          $(overlay).attr(this.name, this.value);
        }
      });
        
      $(wrapper).append('<div class="baselines"></div>').append('<div class="outerlines"></div>'); 
    });   
    
    $(rootnode).find('.arrows-overlay').addClass('add-overlay').attr('data-overlay-classes', 'arrows-font');
    $(rootnode).find('.arrows-overlay-rood').addClass('add-overlay').attr('data-overlay-classes', 'arrows-font red');
    $(rootnode).find('.arrows-overlay-groen').addClass('add-overlay').attr('data-overlay-classes', 'arrows-font green');
    
    $(rootnode).find('.morearrows-overlay').addClass('add-overlay').attr('data-overlay-classes', 'morearrows-font');
    $(rootnode).find('.morearrows-overlay-rood').addClass('add-overlay').attr('data-overlay-classes', 'morearrows-font red');
    $(rootnode).find('.morearrows-overlay-groen').addClass('add-overlay').attr('data-overlay-classes', 'morearrows-font green');
    


    // Overlay two copies of the text (normal + custom) onto each other, for complete lines.
    $(rootnode).find('.line.add-overlay, .add-overlay .line').each(function () {
      var content = $(this).text();
      
      var classsource = $(this).closest('.add-overlay');
     
      var overlay = $('<div class="line-overlay"></div>').text(content).addClass($(classsource).data('overlay-classes'));

      var data = $(this).data();
    
      $(this).find('.baselines').remove();
      $(this).find('.outerlines').remove();
      $(this).addClass('line-original').removeClass('line').wrap('<div class="line line-container"></div>');
      
      var wrapper = $(this).parent(); // the wrapper
      $(wrapper).append(overlay);
      $(wrapper).removeClass('line').addClass('rawline'); // prevent conversion at the .line level, allowing us to convert the .line-original and .line-overlay separately and with different settings each 
      
      // copy classes to the wrapper
      var that = this;
      var copy_to_wrapper_classes = ['norompline', 'noouterlines', 'nolines', 'greylines', 'noromphoogtelijn'];
      $(copy_to_wrapper_classes).each(function (index, value) {
        if ($(that).hasClass(value)) $(wrapper).addClass(value);
      });

      // Copy all data-attributes to overlay
      $.each($(this)[0].attributes, function () {
        if (this.name.substr(0,4) == 'data') {
          $(overlay).attr(this.name, this.value);
        }
      });
        
      $(wrapper).append('<div class="baselines"></div>').append('<div class="outerlines"></div>'); 
    });   

    // Overlay two copies of the text (normal + startpunten) onto each other, for complete lines.
    $(rootnode).find('.hokjes-cell.startpunt-overlay-zwart, .startpunt-overlay-zwart .hokjes-cell, .hokjes-cell.startpunt-overlay-rood, .startpunt-overlay-rood .hokjes-cell, .hokjes-cell.startpunt-overlay-groen, .startpunt-overlay-groen .hokjes-cell').each(function () {
      var content = $(this).find('.hokjes-content').text();
      var overlay = $('<div class="hokjes-content hokjes-overlay"></div>').text(content).addClass('startpunten-font');
      var data = $(this).data();

      if ($(this).closest('.startpunt-overlay-groen').length) {
        $(overlay).addClass('green');
      } else if ($(this).closest('.startpunt-overlay-rood').length) {
        $(overlay).addClass('red');
      } else {
        $(overlay).addClass('black');
      }
      
      if ($(this).closest('.startpunt-per-woord').length) {
        if (console) console.log('ERROR: .startpunt-per-woord not supported for hokjes');
      }
      
      
      $(this).append(overlay);

    });      
    
    $(rootnode).find('.word.startpunt-overlay-zwart, .word.startpunt-overlay-rood, .word-startpunt-overlay-groen').each(function() {
      var content = $(this).text();
      
      var overlay = $('<span class="word-overlay"></div>').text(content).addClass('startpunten-font');
      
      if ($(this).closest('.startpunt-overlay-groen').length) {
        $(overlay).addClass('green');
      } else if ($(this).closest('.startpunt-overlay-rood').length) {
        $(overlay).addClass('red');
      } else {
        $(overlay).addClass('black');
      }
      
      if ($(this).hasClass('startpunt-per-woord')) {
        $(this).removeClass('startpunt-per-woord');
        $(overlay).addClass('startpunt-per-woord');
      } else if ($(this).closest('.startpunt-per-woord').length) {
        if (console) console.log('ERROR: .startpunt-per-woord must be set on same element as .startpunt-overlay');
      }

      $(this).addClass('word-original').wrap('<span class="word word-container"></span>');

      var wrapper = $(this).parent(); // the wrapper
      $(wrapper).prepend(overlay);
      
    });
    
    
    // we use the same class here (and because the class 'startpunten' is already in use)
    $(rootnode).find('.startpunten-font').each(function() {
      // No, this is not needed. The font has empty space for all letters glyphs.
      // $(this).addClass('invisible-except-first');
    });
    
    // Somehow, if we use startpunten-font in a td.hokjes-content, the sizing gets messed up?!? 
    // But if we wrap it a level deeper, it works fine...
    $(rootnode).find('.hokjes-content.startpunten-font').each(function() {
      var text = $(this).text();
      var nested = $('<div></div>').addClass('startpunten-font').text(text);
      $(this).text('').removeClass('startpunten-font').append(nested);
    });
    
    // Same, but with startpunten-font higher in the DOM
    $(rootnode).find('.startpunten-font .hokjes-content').each(function() {
      var text = $(this).text();
      var nested = $('<div></div>').addClass('startpunten-font').text(text);
      $(this).text('').append(nested);
      $(this).closest('.startpunten-font').removeClass('startpunten-font');
    });


    
    // spatie tussen letters.
    // NB deze functies worden uitgevoerd voorafgaand aan conversie. 'ij' is dus ook nog twee letters.
    $(rootnode).find('.letterspace').each(function () {
      replace_text_nodes(this, function(input) {
        var re = new RegExp(/(\w)(?=\w)/, "g");

        var result = input.replace(re, function(match, first_letter, offset){ 
          var second_letter = input.substr(offset+1,1); // this is the lookahead expression, which unfortunately can not be captured
          var tweeklanken = [
            'ij'
          ];
          if (tweeklanken.indexOf(first_letter + second_letter) > -1) {
            return first_letter;
          } else {
            return first_letter + '\u200A';
          }
        });
        return result;
      });
    });  
    $(rootnode).find('.letterspace-between-phonemes').each(function () {
      replace_text_nodes(this, function(input) {
        var re = new RegExp(/(\w)(?=\w)/, "g");

        var result = input.replace(re, function(match, first_letter, offset){ 
          var second_letter = input.substr(offset+1,1); // this is the lookahead expression, which unfortunately can not be captured
          var tweeklanken = [
            'aa', 'ee', 'oo', 'uu', 'ie', 'ei', 'oe', 'eu', 'ui', 'ou', 'au', 'ai', 'oi', 'ng', 'nk', 'ch', 'sc', 'ij'
          ];
          if (tweeklanken.indexOf(first_letter + second_letter) > -1) {
            return first_letter;
          } else {
            return first_letter + '\u200A';
          }
        });
        return result;
      });
    });  
    

    $(rootnode).find('.line, .cursive, .letter, .line-overlay, .line-original').each(function () {
      var cogncur_converter = get_cogncur_converter(default_settings, this);
      replace_text_nodes(this, cogncur_converter.convert);
    });
    
    /* Wrap a <span class="invisible"></span> tag around every word, but exclude the first glyph.
       This literally means the first glyph, regardless 
     */
    $(rootnode).find('.invisible-except-first').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return replace_words_invisible_from(input, 1, false);
      });
    });

    /* Wrap a <span class="invisible"></span> tag around every word, but exclude the first glyph.
     * Where the first letter is always regarded as the second glyph (so first glyph = connector)
     */
    $(rootnode).find('.invisible-except-one').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return replace_words_invisible_from(input, 1, true);
      });
    });

    $(rootnode).find('.invisible-from-2').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return replace_words_invisible_from(input, 2, true);
      });
    });

    $(rootnode).find('.invisible-from-3').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return replace_words_invisible_from(input, 3, true);
      });
    });
    
    /* Wrap a <span class="invisible"></span> tag around every word, but exclude the glyph up to 
     * position data-invisible-from.
     * position 2 always refers to letter 1, regardless whether it was preceded by a connector glyph or not.
     */
    $(rootnode).find('.invisible-from').each(function () {
      var from = $(this).data('invisible-from');
      
      replace_text_nodes_with_html(this, function(input) {
        return replace_words_invisible_from(input, from, true);
      });
    });    
    
    function mark_letters(input, start_tag, end_tag) {
      if (typeof(start_tag) == 'undefined') start_tag = "<span class='red'>";
      if (typeof(end_tag) == 'undefined') end_tag = "</span>";
      
      var replace;

      replace = input.replace(new RegExp('['+cogncur_converter.letterglyphs+']', 'g'), function (match) {
        return start_tag + match + end_tag;
      });
      return replace;
    }
    
    function mark_first(input, start_tag, end_tag) {
      if (typeof(start_tag) == 'undefined') start_tag = "<span class='red'>";
      if (typeof(end_tag) == 'undefined') end_tag = "</span>";
      
      var replace;

      replace = input.replace(new RegExp('^.', 'g'), function (match) {
        return start_tag + match + end_tag;
      });
      return replace;
    }
    
    function mark_connections(input, between_phonemes_only, start_tag, end_tag) {
      if (typeof(start_tag) == 'undefined') start_tag = "<span class='invisible'>";
      if (typeof(end_tag) == 'undefined') end_tag = "</span>";
      if (typeof(between_phonemes_only) == 'undefined') between_phonemes_only = false;
      
      var re_str2 = 
        '\(\[' + cogncur_converter.letterglyphs + '\]\+\?\)' +                  // A letterglyph (should remain visible)
        '\(\[' + cogncur_converter.connectorglyphs + '\]\+\?\)' +               // A connector glyph (should remain visible)
        '\(\?\=\[' + cogncur_converter.letterglyphs + '\]\)';                 // Lookahead match with another letter glyph. This is not captured, so that the NEXT match is still able to capture this as the first group.
      var re = new RegExp(re_str2, "g");
      
      var replace;

      replace = input.replace(re, function (match, first_glyph, connecting_glyph, offset) {
        var second_glyph = input.substr(offset+2,1); // this is the lookahead expression, which unfortunately can not be captured
        // 'oi' and 'ai' have been added to enable 'aai' en 'ooi' to work. 'sc' has been added for 'sch'
        // 'uw' has been omitted to stop 'auw' en 'ouw' from clustering. This means in 'ieuw', the 'ieu' will be connected, the 'w' not.
        var tweeklanken = [
          'aa', 'ee', 'oo', 'uu', 'ie', 'ei', 'oe', 'eu', 'ui', 'ou', 'au', 'ai', 'oi', 'ng', 'nk', 'ch', 'sc',
          'ÑÑ', 'eÑ', 'Ñi', 'oÑ', 'aÑ', 
        ];
        if (between_phonemes_only && tweeklanken.indexOf(first_glyph + second_glyph) > -1) {
          return first_glyph + connecting_glyph;
        } else {
          return first_glyph + start_tag + connecting_glyph + end_tag;
        }
      });
      return replace;
      
    }

    
    /* Make all connector glyphs invisible, keep the letters visible */
    $(rootnode).find('.invisible_connections, .invisible-connections').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, false);
      });
    });  
    

    /* Make connector glyphs invisible but not within phonemes, keep the letters normal */
    $(rootnode).find('.invisible_connections_between_phonemes, .invisible-connections-between-phonemes').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, true);
      });
    });  

    
    /* Make all connector glyphs outline, keep the letters visible */
    $(rootnode).find('.outline_connections, .outline-connections').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, false, '<span class="outline">', '</span>');
      });
    });

    /* Make all connector glyphs outline, keep the letters visible */
    $(rootnode).find('.red-connections').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, false, '<span class="red">', '</span>');
      });
    });

    $(rootnode).find('.red-letters').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_letters(input, '<span class="red">', '</span>');
      });
    });

    $(rootnode).find('.red-first').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_first(input, '<span class="red">', '</span>');
      });
    });


    /* Make connector glyphs outline but not within phonemes, keep the letters normal */
    $(rootnode).find('.outline_connections_between_phonemes, .outline-connections-between-phonemes').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, true, '<span class="outline">', '</span>');
      });
    });
   
    /* Make all connector glyphs special (adapted to surrounding letters without actually connecting) */
    $(rootnode).find('.los_connections, .los-connections').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, false, '<span class="verbindingenlos-font">', '</span>');
      });
    });

    /* Make connector glyphs special but not within phonemes, keep the letters normal */
    $(rootnode).find('.los_connections_between_phonemes, .los-connections-between-phonemes').each(function () {
      replace_text_nodes_with_html(this, function(input) {
        return mark_connections(input, true, '<span class="verbindingenlos-font">', '</span>');
      });
    });


    
    $(rootnode).find('.switchclass .line, .switchclass.line').each(function () {
      var from = $(this).closest('[data-switch-from]').data('switch-from');
      var to = $(this).closest('[data-switch-to]').data('switch-to');
      var before_class = $(this).closest('[data-before-switch-class]').data('before-switch-class');
      var after_class = $(this).closest('[data-after-switch-class]').data('after-switch-class');
      replace_text_nodes_with_html(this, function(input) {
        var input_words = input.split(' '); // Will produce empty 'words' when we have multiple spaces
        var output_words = [];
        input_words.forEach(function (input_word) {
          var from_word = from;
          var to_word = to;
          // als het woord geen aanhaal is, pas de from/to variabelen aan, zodat '1' nog steeds het begin van de eerste letter betekent
          if (input_word.match('^[' + cogncur_converter.letterglyphs + ']')) {
            from_word = from_word - 1;
            if (to_word) to_word = to_word - 1;
          }
          var output_word = '';
          var before_switch;
          var after_switch;
          var switched_back = '';
          if (input_word) {
            if (to_word) {
              before_switch = input_word.substring(0, from_word);
              after_switch = input_word.substring(from_word, to_word);
              switched_back = input_word.substring(to_word);
              output_word = 
                '<span class="' + before_class + '">' + before_switch + '</span>' +
                '<span class="' + after_class + '">' + after_switch + '</span>' +
                '<span class="' + before_class + '">' + switched_back + '</span>';
            } else {
              before_switch = input_word.substring(0, from_word);
              after_switch = input_word.substring(from_word);
              output_word = 
                '<span class="' + before_class + '">' + before_switch + '</span>' +
                '<span class="' + after_class + '">' + after_switch + '</span>';
            }
          }
          output_words.push(output_word);
        });
        return output_words.join(' ');
      });
      /*
        from = 1: na aanhaal (bij begin woord indien geen aanhaal 
        from = 2: na eerste letter (VOOR de verbindingshaal)
        from = 3: voor tweede letter (NA de verbindingshaal)
        from = 4: na 2e letter (VOOR de verbindingshaal)
        from = 5: voor 3e letter (NA de verbindingshaal)
      */
    
    });
    
    // Adjacent lines. With 'nospacebetween', we don't draw bottom lines, except at the end of a line system (in css)
    // However, when lines switch between noouterlines / with outerlines, this doesn't work, we need to force a
    // bottomline (since css can't figure this out...)
    $(rootnode).find('.lines, .rawlines').each(function () {
      var prev;
      var current;
      $(this).find('.line, .rawline').each(function() {
        current = $(this);
        if (current.hasClass('noouterlines') || current.hasClass('nolines') || parseInt(current.css('marginTop'))) {
          if (prev && !prev.hasClass('noouterlines') && !prev.hasClass('nolines')) {
            prev.addClass('forcebottomline');
            current.addClass('forcetopline'); 
          }
        }
        
        prev = current;
      });
      if (current) current.addClass('lastline');
      
    });
    
    // Post-processing: do some stuff that we might have missed because we 
    // were reading the cogncur-settings at a 'higher' level. 
    // These conversions MUST work an already converted text
    $(rootnode).find('.line, .word').each(function() {
      if ($(this).data('cogncur-no-extra-s-bit') >= 1) {
        var value = $(this).data('cogncur-no-extra-s-bit');
        var cogncur_converter = get_cogncur_converter(default_settings);
        replace_text_nodes(this, function (input) {
          return cogncur_converter.remove_extra_s_bit(input, value); 
        });

      }
      
    });
  }
  
  return {
    do_it: do_everything,
    auto : auto
  }
});

var cogncur_lines = get_cogncur_lines();

jQuery(document).ready(function ($) {
  if (cogncur_lines.auto) {
    cogncur_lines.do_it(document);
  }
});

/* If you are dynamically generating new content, you can call the cogncur_converter_lines.do_it(element) function on it.
 * However, do_it() should never be called on the same content twice. 
 */