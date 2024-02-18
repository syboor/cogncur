<?php

  /* ImageMagick notes: 
   * - don't use any <style> whatsoever
   * - stroke-dasharray values must be separated by comma's, not spaces
   * - stroke-dashoffset can not have negative values. instead of
        stroke-dasharray="4,4000" stroke-dashoffset="-37"
      do
        stroke-dasharray="4,4000" stroke-dashoffset="1967" 
      where 1967 = 2000 + 3 - 37
      
   */

  $shapedefs = file_get_contents('../../sources/cogncur_shapes.svg');

  $shapedefs = substr($shapedefs, strpos($shapedefs, '<defs'));
  $shapedefs = substr($shapedefs, 0, strpos($shapedefs, '</defs>') +7);
  
  $letter = @$_GET['l'] ?: 'a'; 
  $type = preg_replace('/[^a-z0-9_\-]/', '', strtolower(@$_GET['t'])) ?: 'arrows'; 
  $templatefile = 'template_' . $type . '.php';
  $lines = @$_GET['lines'] ?: 0;
  $skew = @$_GET['s'] ?: false;    // slant the letters 7.5 (skew = 1) or 15 (skew = 2) degrees clockwise
  $minimal = @$_GET['m'] ?: false; // no entry strokes from baseline
  $alt = @$_GET['alt'] ?: false; // alternative stroke order
  $thinness = @$_GET['th'] ?: 0;
  
  $height = intval(@$_GET['h']); // height in pixels requested. 
  $width = intval(@$_GET['w']); // width in pixels requested
  $margin = intval(@$_GET['mg']) ?: 0; // margin on left and right, in 1/1000 em units. 
  if ($width && !$height) $width = false;
  if (!$height) $height = 300;
  $requested_framewidth = intval(@$_GET['emw']); // in 1/2000 em-units. Only relevant for strips. Width per frame.
  
  $center = @$_GET['c'] ?: false; // letters should be centered rather than left-aligned or justified
  
  /* line styles:
   * 1,2 = grade2 lines (including descender line)
   * 3,4 = grade3 lines (baseline, midline, headline)
   * 5,6 = baseline + midline
   * 7,8 = baseline + headline
   * 9,10 = baseline
   */   
  
  // NB $requested_framewidth is width per frame in em-units requested
  /*
    If only $height is provided: 
    - SVG will ignore it
    - PNG will set the height of the png to this, and determine the width automatically
    If only $width is provided:
    - it will be completely ignored
    If only $request_framewidth is provided: 
    - for strips: frames will follow each other at this em-distance; they may overlap
    - for single letters: they will have this em-width; the letter will NOT be centered; lines will continue to the end of the picture
    - the width of the picture will change to accommodate all the frames, but if a frame is too small to accommodate the letter, the last letter will be cut off
    If both $height and $width are provided but not $requested_framewidth: 
    - SVG will use the requested aspect ratio
    - PNG will use the exact dimensions
    - for strips: they will be spaced out or overlap to fit in the requested aspect ratio
    - for single letters: will have this width; the letter will NOT be centered; lines will continue to the end of the picture
    If $height, $width and $request_framewidth are all provided:
    - $height and $width will determine the dimensions of the image
    - $requested_framewidth will determine the spacing between frames within a strip
    
    So what happens to the 'extra' width?
    By default:
    - single images are left aligned, so all the extra width is added to the right.
    - image strips are justified, so all the extra width is added in between the mages.
    If $center:
    - single images are centered, so the extra width is divided between left and right
    - for image strips, width will be distributed over left, right and space between images
    NB $center is ignored if a specific framewidth is requested
  */
  if (!file_exists($templatefile)) exit_404('Template not found');
    
  // Cache control headers
  //header('Cache-control: public, max-age=2592000'); // 30 days
    
  $output = @$_GET['o'] ?: 'png';
  if ($output == 'debug') {
    error_reporting(E_ALL);
  } else {
    error_reporting(0);
  }
  
  $k = @$_GET['k'] ?: 'stoplicht';
  $kleurschemas = [
    'stoplicht' => ['white', 'green', '#f28500', '#e50000', '#999999'],
    'stoplicht2' => ['white', 'green', '#e8d800', '#f28500', '#e50000'],
    'stoplicht3' => ['white', 'green', 'blue', 'purple', '#e50000'],
    'zwartwit' => ['white', 'black', 'black', 'black', 'black'],
    'witzwart' => ['black', 'white', 'white', 'white', 'white'],
    'grijswit' => ['white', '#cccccc', '#cccccc', '#cccccc', '#cccccc'],
    'zwartstoplicht' => ['black', '#00cf00', '#ff8800', '#ff0000', '#aaaaaa'],
    'zwartstoplicht2' => ['black', '#00cf00', '#e8d800', '#ff8800', '#ff0000'],
    'zwartstoplicht3' => ['black', '#00e238', '#0099ff', '#f300f3', '#ff0000'],
  ];
  $kleuren = @$kleurschemas[$k] ?: reset($kleurschemas);
  $kleuroutline = $kleuren[0];
  
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
  
  if ($minimal && $elements_by_id['letter-min'.$letter]) $letter = 'min'.$letter;
  if ($alt && $elements_by_id['letter-alt'.$letter]) $letter = 'alt'.$letter;
 
  $nstrokes = @$elements_by_id['letter-'.$letter]['data-nstrokes'];
  if (is_null($nstrokes)) exit('letter not supported: ' . htmlspecialchars($letter)); // NB nstrokes == 0 is allowed, it generated empty lines
  
  // framewidth and frameoffset are in em-units
  // Goal: set the $svgheight, $svgwidth, $frameoffset (used for strips) and $margin_left
  $svgheight = 2080; // fixed
  $margin_left = 0; // default if $center is false
  $frameoffset = []; $frameoffset[1] = 0;
  if ($requested_framewidth) {
    $framewidth = $requested_framewidth; // em width
    if (is_strip($type, $nstrokes)) {
      $frameoffset[1] = 0;
      $frameoffset[2] = $frameoffset[1] + $framewidth;
      $frameoffset[3] = $frameoffset[2] + $framewidth;
      $frameoffset[4] = $frameoffset[3] + $framewidth;
      $frameoffset[5] = $frameoffset[4] + $framewidth;
      $svgwidth = $frameoffset[$nstrokes + 1];
    } else {
      $svgwidth = $framewidth;
    }

    if ($width && $height) { // ??? strip. 
      $svgwidth = $width * $svgheight / $height;
    }
  } else {
    $emwidth = $elements_by_id['letter-'.$letter]['data-width'] ?: 1000;
    $emwidth1 = @$elements_by_id['letter-'.$letter]['data-width1'] ?: $emwidth;
    $emwidth2 = @$elements_by_id['letter-'.$letter]['data-width2'] ?: $emwidth;
    $emwidth3 = @$elements_by_id['letter-'.$letter]['data-width3'] ?: $emwidth;
    $emwidth4 = @$elements_by_id['letter-'.$letter]['data-width4'] ?: $emwidth;

    if ($width && $height) {
      $svgwidth = $width * $svgheight / $height;
      $available_svgwidth = $svgwidth;
      if ($margin) $available_svgwidth = $svgwidth - 2 * $margin;
      
      if (is_strip($type, $nstrokes)) {
        $emwidths = $emwidth1 + ($nstrokes >= 2 ? $emwidth2 : 0) + ($nstrokes >= 3 ? $emwidth3 : 0) + ($nstrokes >= 4 ? $emwidth4 : 0);
        $autowidth = $emwidths + ($nstrokes - 1) * 300 + $nstrokes * 30; // width if automatic
        if ($center && $available_svgwidth > $autowidth) {
          $extra = ($available_svgwidth - $autowidth) / ($nstrokes + 1);
          $frameoffset[1] = $extra + $margin;
          $frameoffset[2] = $frameoffset[1] + $emwidth1 + 330 + $extra;
          $frameoffset[3] = $frameoffset[2] + $emwidth2 + 330 + $extra;
          $frameoffset[4] = $frameoffset[3] + $emwidth3 + 330 + $extra;
        } else { // justify
          $extra = ($available_svgwidth - $autowidth) / ($nstrokes - 1);
          $frameoffset[1] = 0 + $margin;
          $frameoffset[2] = $frameoffset[1] + $emwidth1 + 330 + $extra;
          $frameoffset[3] = $frameoffset[2] + $emwidth2 + 330 + $extra;
          $frameoffset[4] = $frameoffset[3] + $emwidth3 + 330 + $extra;

        }
      } else {
        $framewidth = $emwidth + 30;
        if ($center) {
          $margin_left = $frameoffset[1] = ($svgwidth - $framewidth) / 2;
        } else {
          $margin_left = $frameoffset[1] = 0 + $margin;
        }
      }        
    } else {  /* total image width automatic */
      if (is_strip($type, $nstrokes)) {
        $frameoffset[1] = 0 + $margin;
        $frameoffset[2] = $frameoffset[1] + $emwidth1 + 330;
        $frameoffset[3] = $frameoffset[2] + $emwidth2 + 330;
        $frameoffset[4] = $frameoffset[3] + $emwidth3 + 330;
        $frameoffset[5] = $frameoffset[4] + $emwidth4 + 330;
        $svgwidth = $frameoffset[$nstrokes+1] - 300 + $margin;
      } else {
        $svgwidth = $emwidth + 30 + 2 * $margin;
        $margin_left = $frameoffset[1] = $margin;

      }
      
    }
  }

  // Get the paths and masks needed for our letter
  $outlinepaths = $paths = $overlaps = $covered_arrow_lengths = array();
  for ($i = 1; $i <= $nstrokes; $i++) {
    $outlinepaths[$i] = $elements_by_id['outline-'.$letter.$i]['d'];
    $paths[$i] = $elements_by_id['stroke-'.$letter.$i]['d'];
    $covered_arrow_lengths[$i] = @$elements_by_id['stroke-'.$letter.$i]['data-covered-arrow-length'];
    $overlaps[$i] = @$elements_by_id['overlap-'.$letter.$i]['d'];
  }
  
  
  $debugoutput = ob_get_clean();
  
  if ($type == 'kleurschema') {
    // hardcoded dimensions
    $svg = inc($templatefile, get_defined_vars());  
    $svgwidth = 105; 
    $svgheight = 30;    
  } else {
  
    $svg = <<<END
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
     viewBox="-10 -20 {$svgwidth} {$svgheight}">
END;
    
    if ($lines) $svg .= add_lines($lines, $svgwidth, $height, $thinness);
    
    if (@$skew) {
      if ($skew == 2) {
        $svg .= '<g transform="translate(360 0) skewX(-15)">';
      } else {
        $svg .= '<g transform="translate(180 0) skewX(-7.5)">';
      }
    }
    $svg .= inc($templatefile, get_defined_vars());
   
    if (@$skew) $svg .= '</g>';
     $svg .= '</svg>';
  }
 
  if ($output == 'svg') {
    header( 'Content-type: image/svg+xml' ); 
    echo $svg;
  } elseif ($output == 'debug') {
    header("Content-Type: text/html");
    echo $debugoutput;
    echo '<pre>' . htmlspecialchars($svg,ENT_QUOTES) . '</pre>';
    echo "<br/><br/><hr/>";
    echo $svg;
  } else {
    
    // Unfortunately, Imagemagick does not understand the stylesheet
    header('Content-Type: image/png');
    $img = new Imagick();
    $img->newPseudoImage(round($svgwidth * $height / $svgheight), $height, "canvas:none");
    $img->setBackgroundColor(new ImagickPixel('transparent'));  
    $img->readImageBlob($svg);
    $img->setImageFormat('png');
    
    // Now create a new image with EXACTLY the requested height ($img may be off-by-one due to rounding and respecting the svg's aspect ratio).
    $img2 = new Imagick();
    $img2->newPseudoImage(($width ? $width : $img->width), $height, "canvas:none");
    $img2->setBackgroundColor(new ImagickPixel('transparent'));  
    $img2->setImageFormat('png');
    $img2->compositeImage($img, Imagick::COMPOSITE_DEFAULT, 0, 0);

    $imgblob = $img2->getImageBlob();
    echo $imgblob;
    
  }
  exit();

  
function exit_404($message) {
  header("HTTP/1.0 404 Not Found");
  echo htmlspecialchars($message) . '<br/>';
  exit();
}

function inc($file, $vars = []) {
  $file_aoeuxaeuy = $file;
  unset($vars['file_aoeuxaeuy']);
  unset($vars['vars']);
  extract($vars);
  ob_start();
  include($file_aoeuxaeuy);
  return ob_get_clean();
}
function is_strip($type, $nstrokes) {
  return strpos($type, 'strip') && !strpos($type, 'frame') && ($nstrokes > 1);   
}
    
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

  
  