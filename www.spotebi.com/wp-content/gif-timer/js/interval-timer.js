var inputIncrementTimer;
var restartClicked = false;
var sx = true;
var tog = true;
var newDispCreated = false;
var toggledDiv = false;
var prevGif = "";
$( document ).ready(function( ){
        function IsAttrSupported(strTagName, strAttrName) {
            var blnVal = false;
            var elemInput = document.createElement(strTagName);
            if (strAttrName in elemInput) {
                blnVal = true;
            }
            delete elemInput;
            return blnVal;
        }

        $( document ).on( "click", "input#create-timer",
            function( event )
            {
                var exercises = "";
                var durations = "";
                var gifs = "";
                var sounds = "";
                $( "div.timer-input-box.timer-exercise" ).each(
                    function( )
                    {
                        exercises += encodeURIComponent( $( this ).find( "input#exercise-name" ).val( ) ) + ",";
                        gifs += encodeURIComponent( $( this ).find( "input#timer-image" ).val( ) ) + ",";
                        sounds += encodeURIComponent( $( this ).find( "input#timer-sound" ).val( ) ) + ",";
                        durations += $( this ).find( "div.timer-number input#timer-duration" ).val( ) + ",";
                    }
                );
                gifs = gifs.substring(0, gifs.length - 1);
                sounds = sounds.substring(0, sounds.length - 1);
                exercises = exercises.substring(0, exercises.length - 1);
                durations = durations.substring(0, durations.length - 1);
                var intervals =   $( "div.timer-input-box#timer-warmup div.timer-number input#timer-duration" ).val( ) + ","
                                + $( "div.timer-input-box#timer-cooldown div.timer-number input#timer-duration" ).val( ) + ","
                                + $( "div.timer-input-box#interval-rest div.timer-number input#timer-duration" ).val( ) + ","
                                + $( "div.timer-input-box#set-rest div.timer-number input#timer-duration" ).val( );

                var intervalNames =   encodeURIComponent( $( "div.timer-input-box#timer-warmup input#exercise-name" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#timer-cooldown input#exercise-name" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#interval-rest input#exercise-name" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#set-rest input#exercise-name" ).val( ) );

                var intervalImages =   encodeURIComponent( $( "div.timer-input-box#timer-warmup input#timer-image" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#timer-cooldown input#timer-image" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#interval-rest input#timer-image" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#set-rest input#timer-image" ).val( ) );

                var intervalSounds =   encodeURIComponent( $( "div.timer-input-box#timer-warmup input#timer-sound" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#timer-cooldown input#timer-sound" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#interval-rest input#timer-sound" ).val( ) ) + ","
                                    + encodeURIComponent( $( "div.timer-input-box#set-rest input#timer-sound" ).val( ) );

                /*var initSong =   encodeURIComponent( $( "div.timer-input-box#timer-playlist input#timer-song-no" ).val( ) ) ;
                var playlist =   encodeURIComponent( $( "div.timer-input-box#timer-playlist input#timer-playlist" ).val( ) ) ;*/
                var sets = $( "div.timer-input-box#timer-title div.timer-number input#timer-sets" ).val( );
                var initImg = encodeURIComponent( $( "div.timer-input-box#timer-warmup input#timer-image-initial" ).val() );
                var args = "exercises=" + exercises + "&durations=" + durations + "&intervals=" + intervals + "&intervalNames=" + intervalNames + "&intervalImages=" + intervalImages + "&intervalSounds=" + intervalSounds + "&sets=" + sets + "&gifs=" + gifs + "&sounds=" + sounds + "&initImg=" + initImg;
                /* + "&playlist=" + playlist + "&initSong=" + initSong;*/
                copyToClipboard("<iframe style=\"width: 1px; min-width: 100%;\" src = \"http://www.spotebi.com/wp-content/themes/Pretty Chic/gif-timer/make-timer.php?"+args+"\" height=\"700\" frameborder=\"0\" scrolling=\"no\"></iframe>");
            }
        );

        $( document ).on( "mousedown", "div.timer-input-box div.box-body div.timer-number div.timer-number-increment div.up",
            function( event )
            {
                var thisElem = this;
                var currNum = parseInt( $( this ).parent( ).parent( ).find( "input" ).val( ) );
                $( this ).parent( ).parent( ).find( "input" ).val( ++currNum );

                inputIncrementTimer = setInterval(
                    function( )
                    {
                        var currNum = parseInt( $( thisElem ).parent( ).parent( ).find( "input" ).val( ) );
                        $( thisElem ).parent( ).parent( ).find( "input" ).val( ++currNum );
                    }
                ,200);

                $( window ).bind(
                    "mouseup",
                    function( )
                    {
                        clearInterval( inputIncrementTimer );
                        $( window ).unbind("mouseup");
                    }
                );

                event.preventDefault( );
                event.stopPropagation( );
                return false;
            }
        );

        $( document ).on( "mousedown", "div.timer-input-box div.box-body div.timer-number div.timer-number-increment div.down",
            function( event )
            {
                var thisElem = this;
                var currNum = parseInt( $( this ).parent( ).parent( ).find( "input" ).val( ) );
                if( currNum > 1 )
                {
                    $( this ).parent( ).parent( ).find( "input" ).val( --currNum );
                }

                inputIncrementTimer = setInterval(
                    function( )
                    {
                        var currNum = parseInt( $( thisElem ).parent( ).parent( ).find( "input" ).val( ) );
                        if( currNum > 1 )
                        {
                            $( thisElem ).parent( ).parent( ).find( "input" ).val( --currNum );
                        }
                    }
                ,200);

                $( window ).bind(
                    "mouseup",
                    function( )
                    {
                        clearInterval( inputIncrementTimer );
                        $( window ).unbind("mouseup");
                    }
                );
                event.preventDefault( );
                event.stopPropagation( );
                return false;
            }
        );

        $( document ).on( "click", "input#add-exercise",
            function( )
            {
                var hiddenElem = $( "div.hidden" );
                var hiddenHtml = $( "div.hidden" ).html( );
                var exCount = $( "div.timer-input-box.timer-exercise" ).length;
                $( "div.hidden" ).attr( "class","timer-input-box timer-exercise" ).find( ".box-title" ).html("Exercise "+(++exCount)+"<span class=\"remove\">x</span>").parent( ).find( "div.box-body" ).find( "input#exercise-name" ).val("Exercise "+(exCount));
                $( hiddenElem ).after( "<div class=\"hidden\">" + hiddenHtml + "</div>" );
            }
        );

        $( document ).on( "click", "div.timer-input-box div.box-title span.remove",
            function( )
            {
                $( this ).parent( ).parent( ).remove();
            }
        );

        $( document ).on( "blur", "div.timer-input-box div.box-body input#exercise-name",
            function( )
            {
                $( this ).parent( ).parent( ).find( "div.box-title" ).html( $( this ).val( )+"<span class=\"remove\">x</span>" );
            }
        );

        $( "div.interval-timer" ).each(function(){

                if ( $( window ).width( ) <= 600 )
                {
                    var newWidth = 200 - ( ( 600 - $( window ).width( ) ) / 4 );
                    $( this ).find( "div.timer-countdown" ).css(
                        {
                            "font-size" : newWidth+"px"
                        }
                    );
                }
                else
                {
                    $( this ).find( "div.timer-countdown" ).css(
                        {
                            "font-size" : "200px"
                        }
                    );
                }
                var totalTimer, intervalTimer, startTime, functionalElapsed;
                var threeBeep = false;
                var thisTimer = this;
                var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS');
                $( this ).find(".timer-menu .timer-next").bind(
                    "mousedown",
                    function( event )
                    {
                        var activeDuration = parseInt($( thisTimer ).find( "div.timer-menu div.timer-list div.timer-list-item.active input.duration" ).val( ));
                        var activeElapsed = parseInt($( thisTimer ).find("div.timer-countdown input.elapsed" ).val( ));

                        if (ua.iOS) {
                            preventIosSleep = setInterval(function(){
                                window.top.location.href = '/';
                                console.log('refreshing');
                                setTimeout(function(){
                                    try {
                                            window.top.stop();
                                        } catch (exception) {
                                            document.execCommand('Stop');
                                        }

                                }, 0);
                            }, 10000);

                        } else {
                            sleep.prevent();

                        }
                        if( activeDuration - activeElapsed == 0 )
                        {
                            $( thisTimer ).find( "div.timer-menu div.timer-restart" ).trigger( "mousedown" );
                            event.preventDefault( );
                            event.stopPropagation( );
                            return false;
                        }

                        if ( $( thisTimer ).find("input.active").val( ) == 0 )
                        {
                             startTime = new Date();
                             functionalDifference = 0;
                             intervalTimer = setInterval(
                             function( )
                             {
                                    var now = new Date();
                                    var totalDifference = Math.round( ( now - startTime ) / 1000);

                                    difference = totalDifference - functionalDifference;
                                    functionalDifference = difference + functionalDifference;

                                    var activeDuration = parseInt($( thisTimer ).find( "div.timer-menu div.timer-list div.timer-list-item.active input.duration" ).val( ));
                                    var activeElapsed = parseInt($( thisTimer ).find("div.timer-countdown input.elapsed").val( ));

                                    $( thisTimer ).find("div.timer-countdown").html(ms(activeDuration-( activeElapsed + 1))+"<input type=\"hidden\" class=\"elapsed\" value=\""+(activeElapsed+difference)+"\" />");

                                    var totalElapsed = parseInt($( thisTimer ).find("div.timer-totals div.timer-elapsed input.elapsed").val( )) + difference;
                                    $( thisTimer ).find("div.timer-totals div.timer-elapsed div.timer-total-value").html( ms( totalElapsed ) );
                                    $( thisTimer ).find("div.timer-totals div.timer-elapsed input.elapsed").val( totalElapsed );

                                    var totalRemaining = parseInt($( thisTimer ).find("div.timer-totals div.timer-remaining input.elapsed").val( )) - difference;
                                    $( thisTimer ).find("div.timer-totals div.timer-remaining div.timer-total-value").html( ms( totalRemaining ) );
                                    $( thisTimer ).find("div.timer-totals div.timer-remaining input.elapsed").val( totalRemaining );

                                    if( ( activeDuration - ( activeElapsed+1 ) ) <= 0 )
                                    {
                                        var allIntervals = $( thisTimer ).find( "div.timer-menu div.timer-list-item" );
                                        var totalIntervals = allIntervals.length;
                                        var thisInterval = allIntervals.index( $( thisTimer ).find( "div.timer-menu div.timer-list-item.active" ) ) + 1;
                                        if( thisInterval == totalIntervals )
                                        {

                                            if(IsAttrSupported("audio", "autoplay")){
                                                 player = $( thisTimer ).find('#audio-sounds')[0];
                                                // player.src = $('#hiddenname-'+tmpSound).val();
                                                player.src = $('#audio-sounds source#three-beep').attr('src');
                                                player.play();
                                                if (ua.iOS) {
                                                    clearInterval(preventIosSleep);
                                                } else {
                                                   // noSleepVideo.pause();
                                                   sleep.allow();
                                                }
                                                // $( thisTimer ).find( "audio#three-beep" )[0].play();
                                              }
                                              $(".curr-gif2").css("display", "none");
                                              $(".curr-gif").css("display", "block");
                                            $(".curr-gif").attr("src", "");
                                            var initImg = $(".initImg").val();
                                            $(".curr-gif").attr("src", "resources/jpg/"+initImg);
                                            clearInterval( intervalTimer );
                                            $( thisTimer ).find( "input.active" ).val("0");
                                            $( thisTimer ).find( ".timer-menu .timer-next" ).html( "&#x25Ba;" );
                                        }
                                        else
                                        {
                                            threeBeep = true;
                                            $( thisTimer ).find("div.timer-menu div.timer-list div.timer-list-item.active").next( ).trigger("mousedown");
                                        }
                                    }

                             },1000
                            );
                            $( thisTimer ).find("input.active").val("1");
                            $( this ).html("&#10074&#10074;");
                        }
                        else
                        {
                            clearInterval(intervalTimer);
                            $( this ).html("&#x25Ba;");
                            $( thisTimer ).find("input.active").val("0");
                        }
                        var tmpImg = $("div.active").find(".gif").val();
                        $(".curr-gif2").css("display", "none");
                        $(".curr-gif").css("display", "block");
                       $(".curr-gif").css("background", "none");
                        if(!(typeof tmpImg === "undefined")){
                            $(".curr-gif").css({"background":"url(resources/gifs/"+tmpImg+") no-repeat", "background-size":"cover"});
                        }else{
                            var initImg = $(".initImg").val();
                            $(".curr-gif").css("background", "resources/jpg/"+initImg);
                        }
                        var tmpSound = "beep-hidden";
                        if(!(typeof $("div.active").find(".sound")[0] === "undefined") && $( thisTimer ).find("input.active").val() == "1"){
                            tmpSound = $("div.active").find(".sound")[0].name;
                        }

                        if(IsAttrSupported("audio", "autoplay")){

                           player = $( thisTimer ).find('#audio-sounds')[0];
                            // player.src = $('#hiddenname-'+tmpSound).val();
                            player.src = $('#audio-sounds source#hidden'+tmpSound).attr('src');
                           player.play();

//                            $( thisTimer ).find( "audio#"+tmpSound )[0].play();
//                            $( thisTimer ).find( "audio #"+tmpSound )[0].play();
                        }
                        event.preventDefault( );
                        event.stopPropagation( );
                        return false;
                    }
                );
                $( this ).find( "div.timer-menu div.timer-list-item" ).bind(
                    "mousedown",
                    function( event )
                    {
                        var allIntervals = $( thisTimer ).find( "div.timer-menu div.timer-list-item" );
                        var totalIntervals = allIntervals.length;
                        var thisInterval = allIntervals.index( this ) + 1;
                        var thisDuration = $( allIntervals[ thisInterval - 1 ] ).find( "input.duration" ).val( );
                        var totalDuration = 0;

                        for( var i = thisInterval - 1; i < totalIntervals; i++ )
                        {
                            totalDuration += parseInt( $( allIntervals[i] ).find( "input.duration" ).val( ) );
                        }

                        $( thisTimer ).find( "div.timer-totals div.timer-remaining div.timer-total-value" ).html( ms( totalDuration ) );
                        $( thisTimer ).find( "div.timer-totals div.timer-remaining input.elapsed" ).val( totalDuration );
                        $( thisTimer ).find( "div.timer-totals div.timer-intervals div.timer-total-value" ).html( thisInterval+"&nbsp;/&nbsp;"+totalIntervals );
                        $( thisTimer ).find( "div.timer-countdown" ).html( ms( thisDuration ) + "<input type=\"hidden\" class=\"elapsed\" value=\"0\" />");


                        if( !( $( this ).hasClass( "active" ) ) && ( thisInterval != totalIntervals ) )
                        {
                            var previousInterval = allIntervals[thisInterval - 2];
                            var nextInterval = allIntervals[thisInterval];
                            $( nextInterval ).attr( "class", "timer-list-item" );
                            $( allIntervals[ thisInterval - 1 ] ).attr("class","timer-list-item active");
                            $( previousInterval ).attr("class","timer-list-item").animate(
                                {
                                    "width" : "0"
                                },
                                500,
                                function( )
                                {
                                    $( this ).hide( );
                                }
                            );
                        }
                        else if ( thisInterval == totalIntervals )
                        {
                            $( allIntervals[thisInterval - 2] ).attr( "class", "timer-list-item" );
                            $( this ).attr( "class", "timer-list-item active" );
                        }
                        if( threeBeep )
                        {

                            console.log($( allIntervals[ thisInterval - 1 ] ));
                            var tmpImg = $("div.active").find(".gif").val();
                            var nextGif = $("div.active").next().find(".gif").val();

                            if(newDispCreated == false){
                              $( ".curr-gif" ).after( "<div class='curr-gif2'></div>" );
                              newDispCreated = true;

                            $(".curr-gif").css("background", "none");
                            if(!(typeof tmpImg === "undefined")){
                                $(".curr-gif").css({"background":"url(resources/gifs/"+tmpImg+") no-repeat", "background-size":"cover"});
                              }else{
                                var initImg = $(".initImg").val();
                                $(".curr-gif").css("background", "resources/jpg/"+initImg);
                              }

                              var lmn = document.getElementsByClassName("curr-gif")[0];
                              var nml = document.getElementsByClassName("curr-gif2")[0];
                              console.log(lmn);
                              nml.setAttribute("style", "animation: none 0s ease 0s 1 normal none running; background-blend-mode: normal; border: 0px none rgb(15, 15, 15); border-radius: 0px; border-collapse: separate; bottom: auto; box-shadow: none; box-sizing: border-box; break-after: auto; break-before: auto; break-inside: auto; caption-side: top; clear: none; clip: auto; color: rgb(15, 15, 15); cursor: default; direction: ltr; display: block; empty-cells: show; float: none; font-family: HelveticaNeue-Light, Arial, Helvetica, Geneva, sans-serif; font-kerning: auto; font-size: 0px; font-stretch: normal; font-style: normal; font-variant: normal; font-weight: normal; height: 300px; image-rendering: auto; isolation: auto; left: auto; letter-spacing: normal; line-height: normal; list-style: disc outside none; margin: 0px 90px 20px; max-height: none; max-width: none; min-height: 0px; min-width: 0px; mix-blend-mode: normal; motion: none 0px auto 0deg; object-fit: fill; object-position: 50% 50%; opacity: 1; orphans: 2; outline: rgb(15, 15, 15) none 0px; outline-offset: 0px; overflow-wrap: normal; overflow: visible; padding: 0px; pointer-events: auto; position: static; resize: none; right: auto; speak: normal; table-layout: auto; tab-size: 8; text-align: center; text-align-last: auto; text-decoration: none; text-indent: 0px; text-rendering: auto; text-shadow: none; text-size-adjust: auto; text-overflow: clip; text-transform: none; top: auto; touch-action: auto; transition: all 0s ease 0s; unicode-bidi: normal; vertical-align: baseline; visibility: visible; white-space: nowrap; widows: 2; width: 400px; will-change: auto; word-break: normal; word-spacing: 0px; word-wrap: normal; z-index: auto; zoom: 1; -webkit-appearance: none; backface-visibility: visible; -webkit-background-clip: border-box; -webkit-background-origin: padding-box; border-spacing: 0px; -webkit-border-image: none; -webkit-box-align: stretch; -webkit-box-decoration-break: slice; -webkit-box-direction: normal; -webkit-box-flex: 0; -webkit-box-flex-group: 1; -webkit-box-lines: single; -webkit-box-ordinal-group: 1; -webkit-box-orient: horizontal; -webkit-box-pack: start; -webkit-clip-path: none; columns: auto auto; column-gap: normal; column-rule: 0px none rgb(15, 15, 15); column-span: none; align-items: stretch; align-self: stretch; flex: 0 1 auto; flex-flow: row nowrap; -webkit-font-smoothing: auto; -webkit-highlight: none; -webkit-hyphenate-character: auto; -webkit-line-break: auto; -webkit-locale: auto; -webkit-margin-collapse: collapse collapse; -webkit-mask-box-image-outset: 0px; -webkit-mask-box-image-repeat: stretch; -webkit-mask-box-image-slice: 0 fill; -webkit-mask-box-image-source: none; -webkit-mask-box-image-width: auto; -webkit-mask: none 0% 0% / auto repeat border-box border-box; -webkit-mask-composite: source-over; order: 0; perspective: none; perspective-origin: 200px 150px; -webkit-print-color-adjust: economy; -webkit-rtl-ordering: logical; shape-outside: none; shape-image-threshold: 0; shape-margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0.180392); -webkit-text-combine: none; -webkit-text-decorations-in-effect: none; -webkit-text-emphasis: none rgb(15, 15, 15); -webkit-text-emphasis-position: over; -webkit-text-fill-color: rgb(15, 15, 15); -webkit-text-orientation: vertical-right; -webkit-text-security: none; -webkit-text-stroke: 0px rgb(15, 15, 15); transform: none; transform-origin: 200px 150px 0px; transform-style: flat; -webkit-user-drag: auto; -webkit-user-modify: read-only; -webkit-user-select: text; -webkit-writing-mode: horizontal-tb; -webkit-app-region: no-drag; buffered-rendering: auto; clip-path: none; clip-rule: nonzero; mask: none; filter: none; flood-color: rgb(0, 0, 0); flood-opacity: 1; lighting-color: rgb(255, 255, 255); stop-color: rgb(0, 0, 0); stop-opacity: 1; color-interpolation: sRGB; color-interpolation-filters: linearRGB; color-rendering: auto; fill: rgb(0, 0, 0); fill-opacity: 1; fill-rule: nonzero; marker: none; mask-type: luminance; shape-rendering: auto; stroke: none; stroke-dasharray: none; stroke-dashoffset: 0px; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 1px; alignment-baseline: auto; baseline-shift: 0px; dominant-baseline: auto; text-anchor: start; writing-mode: horizontal-tb; vector-effect: none; paint-order: fill; d: none; cx: 0px; cy: 0px; x: 0px; y: 0px; r: 0px; rx: auto; ry: auto;");
                            }
                            console.log(toggledDiv);
                            if(toggledDiv && !(typeof tmpImg === "undefined")){
                              $(".curr-gif").css("background", "none");
                              $(".curr-gif").css("display", "none");
                              $(".curr-gif2").css("display", "block");
                                if(!(typeof nextGif === "undefined")){
                                  $(".curr-gif").css({"background":"url(resources/gifs/"+nextGif+") no-repeat", "background-size":"cover"});
                                  console.log("<---IMG CACHED--->");
                                  console.log("i am here 1");
                                }else{
                                  var initImg = $(".initImg").val();
                                  $(".curr-gif").css("background", "resources/jpg/"+initImg);
                                  console.log("i am here 2");
                                }
                                if(prevGif != tmpImg) {
                                  if(!(typeof tmpImg === "undefined")){
                                      $(".curr-gif2").css({"background":"url(resources/gifs/"+tmpImg+") no-repeat", "background-size":"cover"});
                                    }else{
                                      var initImg = $(".initImg").val();
                                      $(".curr-gif2").css("background", "resources/jpg/"+initImg);
                                    }
                                }

                                toggledDiv = false;
                            }else{
                              $(".curr-gif2").css("background", "none");
                              $(".curr-gif2").css("display", "none");
                              $(".curr-gif").css("display", "block");
                              if(!(typeof nextGif === "undefined")){
                                  $(".curr-gif2").css({"background":"url(resources/gifs/"+nextGif+") no-repeat", "background-size":"cover"});
                                  console.log("<---IMG CACHED--->");
                                  console.log("i am here 5");
                                }else{
                                  var initImg = $(".initImg").val();
                                  $(".curr-gif2").css("background", "resources/jpg/"+initImg);
                                  console.log("i am here 6");
                                }

                                if(prevGif != tmpImg) {
                                  if(!(typeof tmpImg === "undefined")){
                                      $(".curr-gif").css({"background":"url(resources/gifs/"+tmpImg+") no-repeat", "background-size":"cover"});
                                    }else{
                                      var initImg = $(".initImg").val();
                                      $(".curr-gif").css("background", "resources/jpg/"+initImg);
                                    }
                                }

                            toggledDiv = true;
                          }

                              prevGif = nextGif;

                            var tmpSound = "beep-hidden";
                            if(!(typeof $("div.active").find(".sound")[0] === "undefined") && $( thisTimer ).find("input.active").val() == "1"){
                                tmpSound = $("div.active").find(".sound")[0].name;
                            }

                            if(IsAttrSupported("audio", "autoplay")){
//                                $( thisTimer ).find( "audio#"+tmpSound )[0].play();
 player = $( thisTimer ).find('#audio-sounds')[0];
                            // player.src = $('#hiddenname-'+tmpSound).val();
                            tog = true;
                            sx = false;
                            var lorem = player.src;
                            var ipsum = $('#audio-sounds source#hidden'+tmpSound).attr('src');
                            //player.muted = false;
                            console.log("ps="+lorem+" ss="+ipsum);
                            if(lorem.indexOf(ipsum) != -1) {
                              sx = false;
                              player.play();console.log("played from cache");
                              //togExtra();
                            } else {
                              sx = true;
                            player.src = $('#audio-sounds source#hidden'+tmpSound).attr('src');
                            player.play();console.log("played from new source");
                            }
                            player.onended = function() {
                                                        if(true){
                                                          t = $("div.active").next().find(".sound")[0].name;
                                                          player.src = $('#audio-sounds source#hidden'+t).attr('src');
                                                          if(tog)
                                                          {
                                                            tog = false;
                                                            //player.muted = true;
                           player.play();
                           player.pause();
                                console.log("toggled sound");
                            }
                            console.log("ended");
                            }
                           };
                            threeBeep = false;
                        }
                         }
                        else
                        {
                            var tmpImg = $("div.active").find(".gif").val();
                            $(".curr-gif2").css("display", "none");
                            $(".curr-gif").css("display", "block");
                            $(".curr-gif").css("background", "none");
                            if(!(typeof tmpImg === "undefined") && !restartClicked){
                                $(".curr-gif").css({"background":"url(resources/gifs/"+tmpImg+") no-repeat", "background-size":"cover"});
                            }else{
                                var initImg = $(".initImg").val();
                                $(".curr-gif").css({"background":"url(resources/jpg/"+initImg+") no-repeat", "background-size":"cover"});
                            }
                            var tmpSound = "beep-hidden";
                            if(!(typeof $("div.active").find(".sound")[0] === "undefined")  && !restartClicked){
                                tmpSound = $("div.active").find(".sound")[0].name;
                            }
                            if(IsAttrSupported("audio", "autoplay")){
                               player = $( thisTimer ).find('#audio-sounds')[0];
                            // player.src = $('#hiddenname-'+tmpSound).val();
                            player.src = $('#audio-sounds source#hidden'+tmpSound).attr('src');
                           player.play();
                                   // $( thisTimer ).find( "audio#"+tmpSound )[0].play( );
                            }
                            restartClicked = false;
                        }
                        event.preventDefault( );
                        event.stopPropagation( );
                        return false;
                    }
                );
                $( this ).find( "div.timer-menu div.timer-restart" ).bind(
                    "mousedown",
                    function( event )
                    {
                        restartClicked = true;
                        $( thisTimer ).find( "div.timer-menu div.timer-list-item" ).each(
                            function( )
                            {
                                $( this ).show( ).attr( "class","timer-list-item" ).animate(
                                    {
                                        "width" : "50%"
                                    },
                                    500
                                );
                            }
                        );

                        if( $( thisTimer ).find( "input.active" ).val( ) == "1" )
                        {
                            $( thisTimer ).find( "div.timer-menu div.timer-next" ).trigger( "mousedown" );
                        }
                        $( thisTimer ).find( "div.timer-totals div.timer-elapsed input.elapsed" ).val( "0" );
                        $( thisTimer ).find( "div.timer-totals div.timer-elapsed div.timer-total-value" ).html( ms( 0 ) );
                        $( $( thisTimer ).find( "div.timer-menu div.timer-list-item" )[0] ).attr( "class","timer-list-item active" ).trigger( "mousedown");

                        event.preventDefault( );
                        event.stopPropagation( );
                        return false;
                    }
                );
            }
        );

       /* $( window ).resize(
            function( )
            {
                $( "div.interval-timer" ).each(
                    function( )
                    {
                        if ( $( window ).width( ) <= 600 )
                        {
                            var newWidth = 200 - ( ( 600 - $( window ).width( ) ) / 4 );
                            $( this ).find( "div.timer-countdown" ).css(
                                {
                                    "font-size" : newWidth+"px"
                                }
                            );
                        }
                        else
                        {
                            $( this ).find( "div.timer-countdown" ).css(
                                {
                                    "font-size" : "200px"
                                }
                            );
                        }
                    }
                );
            }
        );  */
});

function ms( seconds )
{
    var minutes = Math.floor( seconds / 60 );
    var leftover = (seconds - (minutes * 60) );
    if(minutes<10)
    {
        minutes = "0"+minutes;
    }
    if(leftover<10)
    {
        leftover = "0"+leftover;
    }
    return minutes+":"+leftover;
}
function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C / Cmd+C, Enter", text);
}
