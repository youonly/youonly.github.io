var inputIncrementTimer;
var restartClicked = false;
var tog = true;
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
//                                $( thisTimer ).find( "audio#"+tmpSound )[0].play();
 player = $( thisTimer ).find('#audio-sounds')[0];
                            // player.src = $('#hiddenname-'+tmpSound).val();
                            tog = true;
                            var lorem = player.src;
                            var ipsum = $('#audio-sounds source#hidden'+tmpSound).attr('src');
                            player.muted = false;
                            console.log("ps="+lorem+" ss="+ipsum);
                            if(lorem.indexOf(ipsum) != -1) {
                              player.play();console.log("played from cache");
                            } else {
                              player.src = $('#audio-sounds source#hidden'+tmpSound).attr('src');
                              player.play();console.log("played from new source");
                            }

                           player.onended = function() {
                             t = $("div.active").next().find(".sound")[0].name;
                             player.src = $('#audio-sounds source#hidden'+t).attr('src');
                             if(tog)
                             {
                               tog = false;
                               player.muted = true;
                               player.play();
                               player.pause();
                               console.log("toggled sound");
                             }
                             console.log("ended");
                           };

                           player.oncanplay = function() {
                             console.log("canplay");
                           };
                           player.oncanplaythrough = function() {
                             console.log("canplaythrough");
                           };
                           player.onloadeddata = function() {
                             console.log("loadeddata");
                           };
                           player.onloadstart = function() {
                             console.log("loadstart");
                           };
                           player.onplay = function() {
                             console.log("onplay");
                           };
                           player.onplaying = function() {
                             console.log("playing");
                           };
                           player.onprogress = function() {
                             console.log("progress");
                           };
                           player.onsuspend = function() {
                             console.log("suspend");
                           };
                           player.onwaiting = function() {
                             console.log("waiting");
                           };

                            }
                            threeBeep = false;
                        }
                        else
                        {
                            var tmpImg = $("div.active").find(".gif").val();
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
var klam = window.top.document.getElementById("soundcloud2");if(klam != null){
  $(document).ready(function() {
        //console.log("-------NOW----------");
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", klam.src);
        ifrm.style.width = "0%";
        ifrm.style.height = "0%";
        ifrm.setAttribute("id","soundcloud")
        document.body.appendChild(ifrm);
        var my_awesome_script = document.createElement('script');
        my_awesome_script.setAttribute('src','js/custom_player.js');
        document.body.appendChild(my_awesome_script);
        var link = document.createElement( "link" );
        link.href = "css/sc-controls.min.css";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName( "head" )[0].appendChild( link );});
      }
