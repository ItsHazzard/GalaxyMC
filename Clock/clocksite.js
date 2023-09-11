getOffsetFromOfficialTime();

function grab(id) {
    return document.getElementById(id);
}

function toggleEmbedCode() {
    embedDiv = grab('embedCode');
    if ( embedDiv.style.display == 'none' )
	embedDiv.style.display = 'block';
    else
	embedDiv.style.display = 'none';
}

function getOffsetFromOfficialTime() {
    $.getJSON('http://json-time.appspot.com/time.json?tz=UTC&callback=?',function(data){	

	var machineTime = new Date();
	var officialTime = new Date(data.datetime);
	var offset = (officialTime - machineTime)/1000;

	if ( Math.abs(offset) < 2 || Math.abs(offset) > (60*60*24) )
	    return; // don't bother setting official time in this case
	
	// a global variable checked by animaclocks which will be instantiated in the future
	_animaclock_official_offset = offset;
	
	// if there are any animaclocks around at this point, set their official time
	for ( i=0; i<_animaclock_list.length; i++ )
            _animaclock_list[i].setOfficial( offset );

    });
}


/*
jQuery(document).ready(function (){
    _animaclock_focus = 1;
    $(window).focus(function(){
	if ( _animaclock_focus ) return;
	_animaclock_focus = 1;
	for(var i=0;i<_animaclock_list.length;i++) {
	    _animaclock_list[i].updateInterval = _animaclock_list[i].updateIntervalOriginal; 
	}
    });
    $(window).blur(function(){
	if ( !_animaclock_focus ) return;
	_animaclock_focus = 0;
	for(var i=0;i<_animaclock_list.length;i++) {
	    _animaclock_list[i].updateInterval = 500;
	}
    });
});
*/
