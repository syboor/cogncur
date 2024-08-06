<?php
  ob_start();
  
  $shapedefs = file_get_contents('cogncur_shapes.svg');

  $shapedefs = substr($shapedefs, strpos($shapedefs, '<defs'));
  $shapedefs = substr($shapedefs, 0, strpos($shapedefs, '</defs>') +7);
  
  $letter = @$_GET['l'] ?: 'a'; 
  $lines = @$_GET['lines'] == '0' ? '0' : (@$_GET['lines'] ?: 1); // default 1, but 0 is possible through parameter
  $skew = @$_GET['s'] ?: false;    // slant the letters 7.5 (skew = 1) or 15 (skew = 2) degrees clockwise
  $noentry = @$_GET['e'] ?: false; // no entry strokes from baseline
  $alt = @$_GET['alt'] ?: false; // alternative stroke order
  $thinness = @$_GET['th'] ?: 0;
  
  $width = intval(@$_GET['w']); // with in 1/1000 em units
  $center = @$_GET['c'] ?: 0;
  
  $output = @$_GET['o'] ?: 'svg';
  if ($output == 'debug') {
    error_reporting(E_ALL);
  } else {
    error_reporting(0);
  }
  
  $xml = simplexml_load_string($shapedefs,  "SimpleXMLElement", LIBXML_NOCDATA);
  
  $elements_by_id = array();
  $xml_elements_with_id = $xml->xpath('//*[@id]');
  foreach ($xml_elements_with_id as $element) {
    $elements_by_id[(string) $element['id']]['xml'] = $element->asXml();
    foreach ($element->attributes() as $key => $value) {
      if ($key != 'id') $elements_by_id[(string) $element['id']][$key] = (string) $value;
    }
  }
  unset($elements_by_id['shapedefs']);
  
  if ($noentry && $elements_by_id['letter-'.$letter.'-noentry']) $letter = $letter.'-noentry';
 
  $nstrokes = @$elements_by_id['letter-'.$letter]['data-nstrokes'];
  if (is_null($nstrokes)) exit('letter not supported: ' . htmlspecialchars($letter)); // NB nstrokes == 0 is allowed, it generated empty lines

  echo 'letter found: ' . $letter . '<br/>';

  // Find the strokes (don't output the entire letter since it includes unnecessary outlines)
  // Remove strokes with class="overlap"
  $xml_element = $xml->xpath('//*[@id="letter-'.$letter.'"]/*[@class="strokes"]');
  foreach ($xml_element[0]->path as $stroke_element) {
    if ($stroke_element['class'] == 'overlap') {
      $dom = dom_import_simplexml($stroke_element);
      $dom->parentNode->removeChild($dom);
    }
  }
  $letter_xml = $xml_element[0]->asXml();
  echo '<pre>' . htmlspecialchars(print_r($letter_xml,1)) . '</pre>';

  
  // framewidth and frameoffset are in em-units
  // Goal: set the $svgheight, $svgwidth, $frameoffset (used for strips) and $margin_left
  $svgheight = 2080; // fixed
  $margin_left = 0; // default if $center is false
  $letterwidth = $elements_by_id['letter-'.$letter]['data-width'] ?: 2000;
  if ($width) {

    $svgwidth = $width;
    if ($center) {
      $margin_left = ($svgwidth - $letterwidth) / 2;
    }
  } else {
    $svgwidth = $letterwidth + 30;
    
  }
  if ($skew) {
    // If the letter is skewed, add some entry width so the entry stroke doesn't run out of frame
    $svgwidth +=  ($skew * 40);
    
    // Letters with overhanging loops (like f and l), may need over more extra width when skewed   
    $extra_width_for_skew = @$elements_by_id['letter-'.$letter]['data-extra-width-for-skew'] ?: 0;
    $svgwidth += ($skew * $extra_width_for_skew);
  }
  
  
  //echo "svgwidth: $svgwidth, letterwidth: $letterwidth, margin_left: $margin_left <br/>";
  
  $svg = <<<END
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
     viewBox="-10 -20 {$svgwidth} {$svgheight}">
END;
    
  if ($lines) $svg .= add_lines($lines, $svgwidth, 300, $thinness);
  
  if (@$skew) {
    if ($skew == 2) {
      $svg .= '<g transform="translate(360 0) skewX(-15)">';
    } else {
      $svg .= '<g transform="translate(180 0) skewX(-7.5)">';
    }
  }  
  
  $svg .= '<g id="letter" transform="matrix(1 0 0 -1 ' . $margin_left . ' 1365)">';
  $svg .= $letter_xml;
  $svg .= '</g>';
  if (@$skew) $svg .= '</g>';
  
  $svg .= '</svg>';

  $debugoutput = ob_get_clean();

function add_lines($type, $svgwidth, $height, $thinness) {
  // Kleuren
  if ($type == 1 or $type == 2 or $type == 4 or $type == 5 or $type == 7 or $type == 8 or $type == 10 or $type == 11 or $type == 13 or $type == 14) {
    $outerk = $romplijnk = '#667AFF';
    if ($type == 1 or $type == 4 or $type == 7 or $type == 10 or $type == 13) { // red
      $baselinek = '#e01a6f';
    } else { // blue
      $baselinek = '#667AFF';
    }
  } else {
    $outerk = $baselinek = $romplijnk = '#000000';
  }

  // Lijndiktes. 14 is the minimum needed for the lines to come out clearly visible and consistent on the full page PDF with 3 cm tall strips.
  $baselinew = 28;
  $romplijnw = 28;
  $outerw = 28;
  $romplijndash = '80,80';
  
  // For really small resolutions, we can increase the lines even further. This is used for the small 'choose your liniature' images.
  if ($height <= 80 || $thinness < 0) {
    $baselinew = 40;
    $romplijnw = 40;
    $outerw = 40;
    $romplijndash = '80,80';
  }
  if ($thinness == 1) {
    $baselinew = 14;
    $romplijnw = 14;
    $outerw = 14;
    $romplijndash = '40,40';
  }
  if ($thinness == 2) {
    $baselinew = 8;
    $romplijnw = 8;
    $outerw = 8;
    $romplijndash = '24,24';
  }
  
  $width = $svgwidth + 20; // some margin
  $svg = '<g transform="matrix(1 0 0 -1 0 1365)">';

  // bottomline (descender)
  if ($type <= 3) {
    $svg .= '<path d="M-10,-683h'. $width .'" stroke-width="'. $outerw .'" stroke="'. $outerk .'" fill="none" shape-rendering="crispEdges"/>';
  }

  // headline (ascender)  
  if ($type <= 6 || $type == 10 || $type == 11 || $type == 12) {
    $svg .= '<path d="M-10,1365 h'. $width .'" stroke-width="'. $outerw .'" stroke="'. $outerk .'" fill="none" shape-rendering="crispEdges"/>';
  }

  // midline
  if ($type <= 9) {
    $svg .= '<path d="M-10,683 h' .$width .'" stroke-width="'. $romplijnw .'" stroke="'. $romplijnk .'" fill="none" stroke-dasharray="' . $romplijndash . '" shape-rendering="crispEdges"/>';
  }

  // baseline
  if ($type >= 1) {
    $svg .= '<path d="M-10,0 h'. $width .'" stroke-width="'. $baselinew .'" stroke="'. $baselinek .'" fill="none" shape-rendering="crispEdges"/>';
  }
    
  $svg .= '</g>';
  
  return $svg;
}



  
  
  
?>

<html>
<head>
  <style>
    svg {
      height: 80vh;
      width:100%;
    }
    svg {
      display: none; /* for startup */
    }
    svg .outline {
      display: none; /* forever */
    }
    .buttons {
      text-align: center;
      margin: 0 auto 0 auto;
      width: 400px;
      vertical-align: middle;
      margin-top: 20px;
    }
    @import url('https://fonts.googleapis.com/css2?family=Noto+Emoji:wght@300&display=swap');
    .emoji {
      font-family: 'Noto Emoji', sans-serif;
      /* font-size: 20px; */
    }
    form#settings {
      display: inline;
    }
  </style>
  <script src="/js/jquery-3.4.1.min.js"></script>
  <script>
  
    function init_letter(elem) {
      var first = true;
      var strokeclr = '#000';
      var tipclr = '#49cd00';
      var delay = .5;
      
      $(elem).find('.strokes path').each(function (index, dummy) {
        if ($(this).attr('id').substring(0,6) !== 'stroke') return;
        
        var len = Math.ceil(this.getTotalLength());
        var duration = (Math.ceil(len/60.0)) / 10.0 +.3;
        var dasharray_len = len + 1;
        var lift = $(this).data('lift');
        var dot = $(this).data('dot');
        if (lift || dot) delay += 1.5;

        $(this).attr('stroke', strokeclr);
        $(this).attr('stroke-width', 68);
        $(this).attr('fill', 'none');
        $(this).attr('stroke-linecap', 'round');
        $(this).attr('stroke-linejoin', 'round');
        
        if (dot) { // animate the color of the dot
          $(this).attr('stroke-opacity', '0'); // transparent
          $(this).attr('stroke', tipclr); 
          
          // change from transparent to opaque
          var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
          animate.setAttribute('attributeName', 'stroke-opacity');
          animate.setAttribute('values', '1');
          animate.setAttribute('dur', '0s');
          animate.setAttribute('begin', delay - 0.5);
          animate.setAttribute('fill', 'freeze'); // equivalent to css 'forwards'
          animate.setAttribute('id', 'tipanim'+index);
          $(animate).appendTo($(this));        

          // change from tip color to stroke color
          var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
          animate.setAttribute('attributeName', 'stroke');
          animate.setAttribute('values', strokeclr);
          animate.setAttribute('dur', '0s');
          animate.setAttribute('begin', delay);
          animate.setAttribute('fill', 'freeze'); // equivalent to css 'forwards'
          animate.setAttribute('id', 'anim'+index);
          $(animate).appendTo($(this));        
          

          
        } else { // animate the stroke using dashoffset

          var startoffset;
          if (first) {
            startoffset = dasharray_len - 1; // shows from the beginning
          } else {
            startoffset = dasharray_len + 1; // shows when the animation starts (after delay)
          }
          
          $(this).attr('stroke-dasharray', dasharray_len);
          $(this).attr('stroke-dashoffset', dasharray_len + 1);
          
          var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
          animate.setAttribute('attributeName', 'stroke-dashoffset');
          animate.setAttribute('values', startoffset + ';1');
          animate.setAttribute('dur', duration + 's');
          animate.setAttribute('calcMode', 'spline');
          animate.setAttribute('keySplines', '.22, 0, .78, 1');
          // Unfortunately, negative offsets not allowed, so we'll have to calculate
          animate.setAttribute('begin', delay);
          animate.setAttribute('fill', 'freeze'); // equivalent to css 'forwards'
          animate.setAttribute('id', 'anim'+index);
          $(animate).appendTo($(this));        

          // Clone the stroke to get the 'tip'
          var tip = $(this).clone().addClass('letterstroke-tip').removeClass('letterstroke').insertAfter(this);
          $(tip).attr('stroke', tipclr);
          $(tip).attr('stroke-dasharray', '0 ' + dasharray_len);
          if (first) $(tip).attr('stroke-dashoffset', dasharray_len - 1); // shows up from the start


          if (lift) {
            // add an extra animation to make the tip become visible sooner, before movement starts
            animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
            animate.setAttribute('attributeName', 'stroke-dashoffset');
            animate.setAttribute('values', dasharray_len - 1 + ';' + dasharray_len - 1);
            animate.setAttribute('dur', '.5s');
            animate.setAttribute('calcMode', 'linear');
            animate.setAttribute('begin', delay - .5);
            animate.setAttribute('fill', 'freeze'); // equivalent to css 'forwards'
            animate.setAttribute('id', 'tipprep'+index);
            $(animate).appendTo($(tip));        
          }
          
          // Ssandard tip animation
          animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
          animate.setAttribute('attributeName', 'stroke-dashoffset');
          animate.setAttribute('values', (lift ? dasharray_len - 1 : startoffset) + ';1');
          animate.setAttribute('dur', duration + 's');
          animate.setAttribute('calcMode', 'spline');
          animate.setAttribute('keySplines', '.22, 0, .78, 1');
          animate.setAttribute('begin', delay);
          animate.setAttribute('fill', 'freeze'); // equivalent to css 'forwards'
          animate.setAttribute('id', 'tipanim'+index);
          $(animate).appendTo($(tip));        

          
          delay = delay + duration - .1;

        }
        
        first = false;
        
      });
    }
    
    function restart() {
      $('svg')[0].setCurrentTime(0);
    }
    
    $(document).ready(function() {
      init_letter($('#letter'));
      $('svg').show();
 
      $('button#restart').click(restart);
      $('select#lines').change(function () {
        this.form.submit();
      });
      
      if (window.location == window.parent.location) {
        $('button#fullscreen').hide();
      } else {
        $('button#fullscreen').click(function() { 
          window.open(location.href, '_blank'); 
        
        });
      }
      
    });
  </script>
</head>


<body>
<?php if ($_GET['o'] == 'debug') echo $debugoutput; ?>
  <div class="buttons">
    <button id="restart"><span class="emoji">&#x21ba;</span> Re-play</button>
    <button id="fullscreen"><span class="emoji">&#x2197;</span> Full screen</button>   <br/><br/>
  </div>
<?php echo $svg ?>
</body>
</html>