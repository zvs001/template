var equalTextHeight = function(
	title, //target 1
	t_max, //max rows of texts
	desc, //target 2
	d_max //default rows of text
){
	var t_h = title.height(),
		t_lh = parseInt($(title).css('line-height'), 10),
		
		d_lh = parseInt($(desc).css('line-height'), 10),
		d_h = d_max * d_lh;
	var free = t_max * t_lh - t_h;

	if(d_lh !== 0){
		while(free > d_lh){
			d_h += d_lh;
			free -= d_lh;
		}
		desc.css("height", d_h);
		desc.css("line-height", d_lh + "px");//set not float
	}
};