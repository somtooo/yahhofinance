module.exports = function(input) {
    var parts = input.trim().split(' ');
    var date = parts[0].split('-');
	var time = (parts[1] ? parts[1] : '00:00:00').split(':');

	// NOTE:: Month: 0 = January - 11 = December.
	var d = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
	return d.getTime() / 1000;
}